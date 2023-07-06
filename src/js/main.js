var $nav = $('.nav');
var opened = 'opened';
var $header = $('.header')



function navigation() {
  var $toggle = $('.toggle, .toggle--close');

  $toggle.on('click', function(){
    $nav.animate({
      width: 'toggle'
    });
    });
  
}
  




function backToTop() {
  var $btn = $('.backtotop-btn');
    $(window).on('scroll', function() {
      if ($(window).scrollTop() > 150) {
        $btn.fadeIn(300);
      } else {
        $btn.fadeOut(300);
      }
    });
    $btn.on('click', function() {
      $('html, body').animate({
        scrollTop: 0
      }, '300');
    });
}

navigation();
backToTop();

