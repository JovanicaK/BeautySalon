var $nav = $('.nav');

function navigation() {
  var $toggle = $('.toggle, .toggle--close');
  var $main = $('main, footer');

  $toggle.on('click', function(){
    $nav.animate({
      width: 'toggle'
    });
    $main.toggleClass('opacity');
  });
  $(window).on('scroll', function() {
    if($(this).height()>500) {
      $nav.removeAttr('style');
      $main.removeClass('opacity');
    }
  })
  
}

navigation();

