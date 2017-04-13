/**
 * Created by jonlazarini on 13/04/17.
 */
import tooltip from 'bootstrap/js/tooltip'
import popover from 'bootstrap/js/popover'

export const popoverControl = ($DOMNode, opts) => {
  var isVisible = false

  var hideAllPopovers = () => {
    // hides all popover before showing the one we want
    $('[data-toggle="popover"]').each(function() {
      $(this).popover('hide');
    });
  };

  // hide popovers
  if(isVisible) hideAllPopovers()
  // show popover
  $DOMNode.popover(opts)
  $DOMNode.popover('show')
  isVisible = true

  $(document).on('click', function(e) {
    hideAllPopovers();
    isVisible = false;
  });

}
