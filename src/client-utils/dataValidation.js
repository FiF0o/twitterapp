/**
 * Created by jonlazarini on 13/04/17.
 */
import $ from 'jquery'
import { popoverControl } from '../controls/popover'

export const ValidateText = (text) => {

  const alphaNumReg = /^[a-z0-9]+$/i

  const popoverOptions = {
    animation: true,
    delay: 500,
    placement: 'right',
    html: true,
    trigger: 'manual',
    title: 'Error',
    content: 'Please do not use special characters',
    template: `<div class="popover"><div class="arrow"></div><div class="popover-title">title</div><div class="popover-content">content</div></div>`
  }

  const $tField = $('input#twitter')
  const $button = $('[value="submit"]')
  const $tweetTextForm = $('.form-group')

  if(!text.match(alphaNumReg)) {
    console.error('field has special(s) character(s)')
    popoverControl($tField, popoverOptions)
    $button.prop('disabled', true)
    $tweetTextForm.addClass('has-error')
  }
  // field has only alphanum chars
  else {
    $button.prop('disabled', false)
    $tweetTextForm.removeClass('has-error')
  }
}
