'use strict'

const store = require('./store')

function initializeEffects () {
  initFilter()
  initConvolver()
  initCompressor()
  initMasterGain()
}

// Master Gain
function initMasterGain () {
  const master = store.context.createGain()
  master.gain.value = 0.5
  master.connect(store.compressor)
  master.connect(store.convolver)
  master.connect(store.filter)
  store.master = master
}

function initCompressor () {
  const compressor = store.context.createDynamicsCompressor()
  compressor.connect(store.convolver)
  compressor.connect(store.context.destination)
  store.compressor = compressor
}

function initConvolver () {
  const convolver = store.context.createConvolver()
  const noiseBuffer = store.context.createBuffer(2, 0.5 * store.context.sampleRate, store.context.sampleRate)
  const left = noiseBuffer.getChannelData(0)
  const right = noiseBuffer.getChannelData(1)
  for (let i = 0; i < noiseBuffer.length; i++) {
    left[i] = Math.random() * 2 - 1
    right[i] = Math.random() * 2 - 1
  }
  convolver.buffer = noiseBuffer
  convolver.connect(store.filter)
  convolver.connect(store.context.destination)
  store.convolver = convolver
}

function initFilter () {
  const bufferSize = 4096
  const filter = store.context.createScriptProcessor(bufferSize, 1, 1)
  let in1, in2, in3, in4, out1, out2, out3, out4
  in1 = in2 = in3 = in4 = out1 = out2 = out3 = out4 = 0.0
  filter.cutoff = 0.065 // between 0.0 and 1.0
  filter.resonance = 3.99 // between 0.0 and 4.0
  filter.onaudioprocess = function (e) {
    const input = e.inputBuffer.getChannelData(0)
    const output = e.outputBuffer.getChannelData(0)
    const f = filter.cutoff * 1.16
    const fb = filter.resonance * (1.0 - 0.15 * f * f)
    for (let i = 0; i < bufferSize; i++) {
      input[i] -= out4 * fb
      input[i] *= 0.35013 * (f * f) * (f * f)
      out1 = input[i] + 0.3 * in1 + (1 - f) * out1 // Pole 1
      in1 = input[i]
      out2 = out1 + 0.3 * in2 + (1 - f) * out2 // Pole 2
      in2 = out1
      out3 = out2 + 0.3 * in3 + (1 - f) * out3 // Pole 3
      in3 = out2
      out4 = out3 + 0.3 * in4 + (1 - f) * out4 // Pole 4
      in4 = out3
      output[i] = out4
    }
  }
  filter.connect(store.context.destination)
  store.filter = filter
}

module.exports = {
  initializeEffects
}
