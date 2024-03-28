 $(function() {
   pageTopButton();
   //  pageTopHidden();
 });

 //  $(window).resize(function() {
 //    pageTopHidden();
 //  });



 // ボタン押下トップへ戻る
 function pageTopButton() {
   $('.js-topButton').click(function() {
     $('html, body').animate({
       scrollTop: 0
     }, 500);
     return false;
   });
 }

 // トップに戻るボタンの表示非表示
 //  function pageTopHidden() {
 //    var w = $(window).width();
 //    if (w >= 769) {
 //      $(window).on('scroll', function() {
 //        var scroll = $(this).scrollTop();
 //        if (scroll >= 300) {
 //          $('.js-topButton').addClass('in_view');
 //        } else {
 //          $('.js-topButton').removeClass('in_view');
 //        }
 //      });
 //    }
 //  }