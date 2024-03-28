(function () {
  var $win = $(window);

  /**
   * スムーススクロール
   * @type {config}
   */
  var HeaderSmall = (function () {
    var CLASS = {
      small: "small",
    };

    function HeaderSmall(config) {
      this.config = config;
      this.$target = $(this.config.target);
    }

    HeaderSmall.prototype.init = function () {
      var _self = this;
      let scrolltop = 0;
      let beforePos = 0;
      let elemTop = _self.$target.height();

      $win.on("scroll", function (e) {
        scrolltop = $(document).scrollTop();

        if (scrolltop == beforePos) {
        } else if (elemTop > scrolltop || 0 > scrolltop - beforePos) {
          $("body").removeClass(CLASS.small);
          $('.smallNav').removeClass('active');
        } else {
          $("body").addClass(CLASS.small);

          setTimeout(function() {
            $('.smallNav').addClass('active');
          }, 300);
        }

        beforePos = scrolltop;

        if ($(this).scrollTop() > _self.$target.height()) {
          if ($(".likeButtonFloat").length !== 0) {
            $(".likeButtonFloat").addClass("fixed");
            $(".page-index").addClass("fixed");
          }
        } else {
          if ($(".likeButtonFloat").length !== 0) {
            $(".likeButtonFloat").removeClass("fixed");
            $(".page-index").removeClass("fixed");
          }
        }
      });
    };

    return HeaderSmall;
  })();

  /**
   * targetを指定
   * @type {*[]}
   */
  var targets = [
    {
      target: ".header",
    },
  ];

  $(function () {
    if (App.deviceCheck("pc")) {
      for (var i = 0, iLen = targets.length; i < iLen; i++) {
        var header_small = new HeaderSmall(targets[i]);
        header_small.init();
      }
    }
  });
})();
