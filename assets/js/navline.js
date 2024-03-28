(function() {



	var $win = $(window);

	/**
	 * スムーススクロール
	 * @type {config}
	 */
  var NavLine = (function() {
    var CLASS = {
			current: 'current',
		};

    function NavLine(config) {
			this.config = config;
			this.$target = $(this.config.nav);
		}

    NavLine.prototype.init = function() {
      var _self = this;

      _self.$target.hover(
        function() {
          var $_self = $(this);

          $('.gNav .hover__line').css({
            'width': $_self.find('a').width(),
            'left': $_self.find('a').position().left,
            'opacity': '1'
          });
        },
        function() {

          $('.gNav .hover__line').css({
            // 'left': $('.primaryTab__item.current > a').position().left,
            'opacity': '0'
          });

        }
      );
    };

    return NavLine;
	})();

  var TabLine = (function() {
    var CLASS = {
			current: 'current',
		};

    function TabLine(config) {
			this.config = config;
			this.$target = $(this.config.tab);
		}

    TabLine.prototype.init = function() {
      var _self = this;

      $win.on('load', function(){
        if($('.primary .hover__line').length) {
          $('.primary .hover__line').css({
            'left': $('.primaryTab__item.current > a').position().left
          });
        }
      });

      _self.$target.hover(
        function() {
          var $_self = $(this);

          $('.primary .hover__line').css({
            'left': $_self.position().left
          });
        },
        function() {

          $('.primary .hover__line').css({
            'left': $('.primaryTab__item.current > a').position().left
          });

        }
      );
    };

    return TabLine;
	})();

  /**
	 * targetを指定
	 * @type {*[]}
	 */
  var navs = {
    nav: '.gNav__item',
  };

	var tabs = {
    tab: '.primaryTab__item > a',
  };


  $(function() {
    var navline = new NavLine(navs);
    navline.init();

    var tabline = new TabLine(tabs);
    tabline.init();
  });
})();