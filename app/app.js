'use strict'
const sequencer = require('./sequencer')
const oscillator = require('./oscillator')
const store = require('./store')
const convert = require('./convert')
const effects = require('./effects')

$(() => {
  store.context = new (window.AudioContext || window.webkitAudioContext)()
  console.log(store.context)
  effects.initializeEffects()
  $(window).on('click', () => {
    console.log('New Audio Context Created')
    $(window).off()
    oscillator.newOscillator()
    $('#testNote').on('click', () => { oscillator.toggleOscillator(store.oscillators[0]) })
    $('#startSequence').on('click', sequencer.playSequence)
  })

  $('#addToSequence').on('click', () => {
    const target = `#${$('#sequence :selected').val()}`
    const note = convert.inputToNote()
    const freq = convert.noteToFrequency(note)
    $(target).text(note.name() + note.octave)
    $(target).data('freq', freq.toFixed(2))
    $(target).on('mouseover', () => {
      $(target).text(freq.toFixed(2))
    })
    $(target).on('mouseout', () => {
      $(target).text(note.name() + note.octave)
    })
    $('#sequence option:selected').next().attr('selected', 'selected')
  })
  $('#waveform').on('change', oscillator.setWaveform)
  $('#gain').on('change', () => { store.master.gain.value = ($('#gain').val() / 100) })
})
