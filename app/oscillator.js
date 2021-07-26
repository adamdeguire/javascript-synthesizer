const store = require('./store')

// create web audio api context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
store.audioCtx = audioCtx

// create Oscillator node
const newOscillator = () => {
  const osc = audioCtx.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(store.A4, audioCtx.currentTime) // value in hertz
  osc.connect(audioCtx.destination)
  osc.on = false
  store.oscillators.push(osc)
  osc.start()
  osc.disconnect(audioCtx.destination)
}

const setWaveform = () => {
  const osc = store.oscillators[0]
  osc.type = $('#waveform :selected').val()
}

const toggleOscillator = (osc) => {
  osc.on ? osc.disconnect(audioCtx.destination) : osc.connect(audioCtx.destination)
  osc.on = !osc.on
}

// const testOscillator = () => {

// }

module.exports = {
  newOscillator,
  setWaveform,
  toggleOscillator
}
