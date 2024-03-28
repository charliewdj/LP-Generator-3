(function () {
  var CLASS = {
    show: "show",
    current: "current",
    open: "navOpen",
  };

  var timerOpen;
  var timerOpenChild;
  var timerSub;
  class Gnav {
    constructor(config) {
      this.target = $(config.target);
      this.target2 = $(config.target2);
      this.time = config.time;
    }

    init() {
      var $_self = this;
      this.target.hover(this.open, this.close);
      this.target2.hover(this.subOpen, this.subClose);

      $(".hasCHild").hover(this.detailOpen, this.detailClose);

      $('.header__search input[name="s"]').focus();
      $('.header__search input[name="s"]').on("click blur", function (e) {
        if (e.type === "click") {
          $_self.searchOpen();
        } else if (e.type === "blur") {
          $_self.searchClose();
        }
      });
    }

    open() {
      var $_self = $(this);
      timerOpen = setTimeout(function () {
        $_self.addClass(CLASS.current);
        $_self.find(".subNav").addClass(CLASS.show);
        $_self.find(".subNav__inner").addClass(CLASS.show);
        $(".main").addClass(CLASS.open);
      }, $_self.time);
    }

    close() {
      var $_self = $(this);
      setTimeout(function () {
        $_self.removeClass(CLASS.current);
        $_self.find(".subNav").removeClass(CLASS.show);
        $_self.find(".subNav__inner").removeClass(CLASS.show);
        $(".main").removeClass(CLASS.open);
      }, $_self.time);
      clearTimeout(timerOpen);
    }

    subOpen() {
      var $_self = $(this);
      timerSub = setTimeout(function () {
        $_self.addClass(CLASS.current);
        $_self.find(".subNav").addClass(CLASS.show);
        $_self.find(".subNav__inner").addClass(CLASS.show);
        $(".main").addClass(CLASS.open);
      }, 0);
    }

    subClose() {
      var $_self = $(this);
      setTimeout(function () {
        $_self.removeClass(CLASS.current);
        $_self.find(".subNav").removeClass(CLASS.show);
        $_self.find(".subNav__inner").removeClass(CLASS.show);
        $(".main").removeClass(CLASS.open);
      }, 0);
      clearTimeout(timerSub);
    }

    detailOpen() {
      var $_that = $(this);
      timerOpenChild = setTimeout(function () {
        $_that.find(".childNav").css('top', $_that.position().top);
        $_that.find(".childNav").addClass(CLASS.show);
      }, $_that.time);
    }

    detailClose() {
      var $_that = $(this);
      setTimeout(function () {
        $_that.find(".childNav").removeClass(CLASS.show);
      }, $_that.time);
      clearTimeout(timerOpenChild);
    }

    searchOpen() {
      $(".searchKeyWord").addClass(CLASS.show);
      $(".main").addClass(CLASS.open);
    }

    searchClose() {
      $(".searchKeyWord").removeClass(CLASS.show);
      $(".main").removeClass(CLASS.open);
    }
  }

  class SpNav {
    constructor(config) {
      this.target = $(config.target);
      this.time = config.time;
    }

    init() {
      var $_self = this;

      $(window).on("load resize", function () {
        $(".gNav").css("max-height", $(window).innerHeight() - $(".header").height() + 57);
      });

      this.target.on("click", function () {
        $(".gNav").slideToggle();
        $(this).toggleClass('active');
      });

      let _tmp_sub = "";
      $(".gNav__item--01 > a, .gNav__item--02 > a").on("click", function (e) {
        e.preventDefault();

        let _target = $(this).parent().data("target");
        
        if (_tmp_sub == _target) {
          $(".subNav." + _target).slideUp();
          $('.gNav__item--sub').removeClass(CLASS.current);
          _tmp_sub = '';
        }
        else {
          $(".gNav__item--01.subNav").slideUp();
          $(".gNav__item--02.subNav").slideUp();
          $('.gNav__item--01, .gNav__item--02').removeClass(CLASS.current);
          
          $(this).parent().addClass(CLASS.current);
          $(".subNav." + _target).slideDown();
          _tmp_sub = _target;
        }
        
      });
      
      $(".gNav__item--sub.gNav__item--03 > a, .gNav__item--sub.gNav__item--04 > a").on("click", function (e) {
        e.preventDefault();

        let _target = $(this).parent().data("target");
        $(this).parent().toggleClass(CLASS.current);
        $(".subNav." + _target).slideToggle();
        
      });

      let _tmp = "";
      $(".hasCHild .subChild").on("click", function (e) {
        e.preventDefault();

        var $_that = $(this);

        let target = $(this).parent().data("item");

        $(".childNav").removeClass(CLASS.show);
        $(".hasCHild").removeClass(CLASS.current);

        var index = $(this).parent().index();
        if (_tmp == target) {
          if (index % 2 === 0) {
            $(this).parent().next().next().css("margin-top", 0);
            $(this).parent().next().next().next().css("margin-top", 0);
          } else {
            $(this).parent().next().css("margin-top", 0);
            $(this).parent().next().next().css("margin-top", 0);
          }

          _tmp = "";
        } else {
          $(this).parent().addClass(CLASS.current);
          $(this).parent().find(".childNav").addClass(CLASS.show);

          // アコーディオンの高さを取得
          let _childHeight = $(this).parent().find(".childNav").outerHeight();

          if (index % 2 === 0) {
            $(".subNav__item").css("margin-top", 0);

            $_that.parent().next().next().css("margin-top", _childHeight);
            $_that.parent().next().next().next().css("margin-top", _childHeight);
          } else {
            $(".subNav__item").css("margin-top", 0);

            $_that.parent().next().css("margin-top", _childHeight);
            $_that.parent().next().next().css("margin-top", _childHeight);
          }

          _tmp = target;
        }
      });

      $('.spSearch input[name="s"]').on("click blur", function (e) {
        if (e.type === "click") {
          $_self.searchOpen();
        } else if (e.type === "blur") {
          $_self.searchClose();
        }
      });
    }

    searchOpen() {
      $(".spSearch .searchKeyWord").addClass(CLASS.show);
      $(".main").addClass(CLASS.open);
    }

    searchClose() {
      $(".spSearch .searchKeyWord").removeClass(CLASS.show);
      $(".main").removeClass(CLASS.open);
    }
  }

  targets = {
    target: ".gNav__item--sub",
    target2: ".smallNav__item",
    time: 0,
  };

  menu = {
    target: ".spMenu",
  };

  if (App.deviceCheck("pc")) {
    var gnav = new Gnav(targets);
    gnav.init();
  }

  if (App.deviceCheck("sp")) {
    var spNav = new SpNav(menu);
    spNav.init();
  }
})();
