'use strict'

const convert = require('./convert')
const store = require('./store')

const sequencer = {

  steps: [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ]
}

let togglePlay = false
const playSequence = function () {
  let count = 0
  togglePlay = !togglePlay
  const sequenceId = setInterval(function () {
    const targetFreq = $(`#${1 + (count % sequencer.steps.length)}`).data('freq')
    store.oscillators[0].frequency.setValueAtTime(targetFreq, store.audioCtx.currentTime)
    count++
  }, convert.bpmToMsInterval($('#tempo').val()))

  if (!togglePlay) {
    console.log(togglePlay)
    console.log(sequenceId)
    clearInterval(sequenceId)
  }
}

module.exports = {
  sequencer,
  playSequence
}
