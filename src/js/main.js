var $nav = $('.nav');

function navigation() {
  var $toggle = $('.toggle, .toggle--close');
  var $main = $('main, footer');

  $toggle.on('click', function(){
    $nav.animate({
      width: 'toggle'
    });
    $main.css('opacity','0.3');
  });
  $(window).on('scroll', function() {
    if($(this).height()>500) {
      $nav.removeAttr('style');
      $main.removeAttr('style');
    }
  })
  
}

navigation();

