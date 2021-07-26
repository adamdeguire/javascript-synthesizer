'use strict'

const store = require('./store')
const chromatic = require('./chromatic')

const bpmToMsInterval = function (bpm) {
  return 60000 / bpm
}

const inputToNote = function () {
  const note = {
    letter: $('#letter :selected').text(),
    accidental: $('#accidental :selected').text(),
    octave: $('#octave :selected').text(),
    name: function () {
      return this.accidental ? this.letter + this.accidental : this.letter
    }
  }
  console.log(note)
  return note
}

const noteToFrequency = function (note) {
  note = sharpToFlat(note)
  const stepsFromA4 = (chromatic.scale.indexOf(note.name()) - chromatic.scale.indexOf('A')) + (12 * (note.octave - 4))
  const ratioToA4 = Math.pow(store.equalTemperament, stepsFromA4)
  const freq = store.A4 * ratioToA4
  return freq
}

const sharpToFlat = function (note) {
  const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  if (note.accidental === '#') {
    note.letter = notes[(notes.indexOf(note.letter) + 1) % notes.length]
    note.accidental = 'b'
  }
  return note
}

module.exports = {
  inputToNote,
  bpmToMsInterval,
  noteToFrequency,
  sharpToFlat
}
