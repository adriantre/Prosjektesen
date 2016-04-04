function initSideMenu() {
// $(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    // overlay.click(function () {
    //   overlay_click();
    // });

    // function overlay_click() {
    //   if(isClosed == true) {
    //     overlay.hide();
    //     trigger.removeClass('is-open');
    //     trigger.addClass('is-closed');
    //     isClosed = false;
        
    //   }
    // }

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  

}