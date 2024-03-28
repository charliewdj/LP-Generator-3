(function() {
  'use strict';
/**
   * deviceCheck
   **/
 var device;
 var ua = navigator.userAgent;
 if ((ua.indexOf('iPhone') > 0) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
   device = 'sp';
 } else {
   device = 'pc';
 }

 if (device == 'pc') {
   return;
 }

$('.blockEditor table').wrap('<div class="block__table"><div class="block__table__inner">');
$('.blockEditor table').each(function(){
  var len = $(this)[0].rows[0].cells.length;
  $(this).width(150 * len);
});

function scrollTable() {
  var timeoutScroll;
  $('.blockEditor .block__table__inner').each(function(){
    var _self = $(this);
    _self.scroll(function(){
      var position = _self.scrollLeft();
      var tableW = Math.floor(_self.find('table').outerWidth() - _self.outerWidth());

      _self.addClass('scroll');

      if (position >= tableW) {
        _self.addClass('end');
      } else {
        _self.removeClass('end');
      }

      clearTimeout(timeoutScroll);
      timeoutScroll = setTimeout( function () {
        _self.removeClass('scroll');
      }, 500 ) ;
    });
  });
}

scrollTable();

})();