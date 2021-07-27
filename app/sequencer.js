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
    const target = $(`#${1 + (count % sequencer.steps.length)}`)
    const lastTarget = $(`#${1 + ((count - 1) % sequencer.steps.length)}`)
    lastTarget.css('background-color', '')
    lastTarget.css('font-weight', '')
    lastTarget.css('color', '')
    target.css('color', 'white')
    target.css('font-weight', 'bold')
    target.css('background-color', 'brown')
    store.oscillators[0].frequency.setValueAtTime(target.data('freq'), store.audioCtx.currentTime)
    count++
  }, convert.bpmToMsInterval($('#tempo').val()))

  // if (togglePlay) {
  //   console.log(togglePlay)
  //   console.log(sequenceId)
  //   clearInterval(sequenceId)
  // }
}

module.exports = {
  sequencer,
  playSequence
}
