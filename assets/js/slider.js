$(function(){
  var rand_obj = $("#js--carousel");
  var obj_ary  = [];
  rand_obj.find("> *").each(function() {
    obj_ary.push($(this));
  });
  obj_ary.sort(function() {
    return Math.random() - Math.random();
  });
  rand_obj.empty();
  obj_ary.forEach(function(v) {
      rand_obj.append(v);
  });

  var press_obj = $("#js--press");
  var press_ary  = [];
  press_obj.find("> *").each(function() {
    press_ary.push($(this));
  });
  press_ary.sort(function() {
    return Math.random() - Math.random();
  });
  press_obj.empty();
  press_ary.forEach(function(v) {
      press_obj.append(v);
  });

  $('#js--carousel').slick({
    autoplay:true,
    autoplaySpeed:5000,
    dots:true,
    arrows: false
  });

  $('#js--onepress').slick({
    autoplay:true,
    autoplaySpeed:5000,
    dots:true,
    arrows: false
  });

  $('#js--press').slick({
    autoplay:true,
    autoplaySpeed:5000,
    dots:true,
    arrows: false
  });

  $('#js--press--top').slick({
    autoplay:true,
    autoplaySpeed:5000,
    dots:true,
    arrows: false
  });

  $('#js--point').slick({
    autoplay: true,
    autoplaySpeed: 7000,
    dots: false,
    arrows: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          dots: true,
        },
      },
    ],
  });

  var timer = null;
  var mediaQuery = window.matchMedia('(max-width: 768px)');

  $('#js--point').on('beforeChange', function(slick, currentSlide) {
    if (mediaQuery.matches) {
      $('#js--point .slick-next, #js--point .slick-prev').removeClass('hide');
    }
  });
  $('#js--point').on('afterChange', function(slick, currentSlide) {
    if (mediaQuery.matches) {
      timer = setTimeout(function() {
        $('#js--point .slick-next, #js--point .slick-prev').addClass('hide');
      }, 800);
    }
  });

  $(window).on('scroll', function() {
    if (mediaQuery.matches) {
      $('#js--point .slick-next, #js--point .slick-prev').removeClass('hide');
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(function() {
        $('#js--point .slick-next, #js--point .slick-prev').addClass('hide');
      }, 2000);
    }
  });


  var showNam;
  if(App.deviceCheck('sp')) {
    showNam = 1;
  } else {
    showNam = 2;
  }

  $('#js--attention').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    dots: false,
    arrows: true,
    // infinite: false
    slidesToShow: showNam,
    slidesToScroll: 1,
  });


  var rand_pickup = $("#js--pickup");
  var pickup_ary  = [];
  rand_pickup.find("> *").each(function() {
    pickup_ary.push($(this));
  });
  pickup_ary.sort(function() {
    return Math.random() - Math.random();
  });
  rand_pickup.empty();
  pickup_ary.forEach(function(v) {
      rand_pickup.append(v);
  });

  $("#js--pickup").slick({
    autoplay: true, // 自動でスクロール
    autoplaySpeed: 0, // 自動再生のスライド切り替えまでの時間を設定
    speed: 5000, // スライドが流れる速度を設定
    cssEase: "linear", // スライドの流れ方を等速に設定
    slidesToShow: 1, // 表示するスライドの数
    swipe: false, // 操作による切り替えはさせない
    arrows: false, // 矢印非表示
    pauseOnFocus: false, // スライダーをフォーカスした時にスライドを停止させるか
    pauseOnHover: false, // スライダーにマウスホバーした時にスライドを停止させるか
  });
});