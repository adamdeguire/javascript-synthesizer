const store = require('./store')
const convert = require('./convert')

// create Oscillator node
const newOscillator = () => {
  const note = convert.inputToNote()
  const freq = convert.noteToFrequency(note)

  const osc = store.context.createOscillator()

  osc.frequency.setValueAtTime(freq, store.context.currentTime)
  osc.type = 'sine'
  osc.on = false
  osc.start()

  store.oscillators.push(osc)
}

const setWaveform = () => {
  const osc = store.oscillators[0]
  osc.type = $('#waveform :selected').val()
}

const toggleOscillator = (osc) => {
  const note = convert.inputToNote()
  const freq = convert.noteToFrequency(note)
  store.oscillators[0].frequency.setValueAtTime(freq, store.context.currentTime)
  osc.on ? osc.disconnect(store.master) : osc.connect(store.master)
  osc.on = !osc.on
}

// const testOscillator = () => {

// }

module.exports = {
  newOscillator,
  setWaveform,
  toggleOscillator
}
