(function() {



	var $win = $(window);

	/**
	 * スムーススクロール
	 * @type {config}
	 */
  var ProductSlider = (function() {
    var CLASS = {
			small: 'small',
		};

    function ProductSlider(config) {
			this.config = config;
			this.$target = $(this.config.target);
      this.$item = this.config.item;
      this.$width = this.config.width;
      this.$margin = this.config.margin;
		}

    ProductSlider.prototype.init = function(e) {
      var _self = this;

      _self.contentWidth();
      var direction, position, list, active, position;
      var maxW = ($win.width() - 20) - $('.productArticle').outerWidth();
      var now = 0;

      $win.on('load', function(){
        var max = ($('.product').width() - $('.productArticle').outerWidth()) - 161;

        var position = 0;

        $('.product').css({
          'transform': 'translate3d(-' + position +'px, 0px, 0px)'
        });

        var maxHeight = 0;
        $('.product .productArticle').each(function(){
          if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
        });
        $('.product .productArticle').height(maxHeight);


        var countup = function(){
          var pos = $('.product').offset();
          list = pos.left;
        }
        setTimeout(countup, 1000);


      });

      _self.$target.on('touchstart', function(event){
        position = _self.getPosition(event);
        direction = ''; //一度リセットする

        var pos = $('.product').offset();
        list = pos.left;
      });

      _self.$target.on('touchmove', function(event){
        if (position - _self.getPosition(event) > -30 ) {
          direction = 'right';
          active = list - Math.floor(position - _self.getPosition(event));
          var max = ($('.product').width() - $('.productArticle').outerWidth()) - maxW;

          if (active < -max) {
            $('.product').css({
              'transform': 'translate3d(-' + max +'px, 0px, 0px)'
            });
          } else {
            $('.product').css({
              'transform': 'translate3d(' + active +'px, 0px, 0px)'
            });
          }
        } else if (position - _self.getPosition(event) < 30 ){
          direction = 'left'; //右と検知
          active = list - Math.floor(position - _self.getPosition(event));

          if (active > 0) {
            $('.product').css({
              'transform': 'translate3d(0px, 0px, 0px)'
            });
          } else {
            $('.product').css({
              'transform': 'translate3d(' + active +'px, 0px, 0px)'
            });
          }
        }
      });

      _self.$target.on('touchend', function(event){
        var max = ($('.product').width() - $('.productArticle').outerWidth()) - maxW;

        var pos = $('.product').offset();
        list = pos.left;

        var tabItem = $('.productArticle');
        var box = [];
        var center = [];
        var current = 0;

        for (var i = 0; i < tabItem.length; i++) {
          var a = tabItem.eq(1).outerWidth(true);
          current += a;

          if(i == 0) {
            box.push(0);
          } else if(i == 7) {
            box.push(current - (tabItem.eq(7).outerWidth(true) + 15));
          } else {
            box.push(current - tabItem.eq(i).outerWidth(true));
          }
          center.push(current);
        }

        var pt = active * -1;

        if (direction == 'right'){
          console.log('right');
          if (now >= box[6]){
            $('.product').css({
              'transform': 'translate3d(-' + max +'px, 0px, 0px)'
            });
            now = max;
          } else if (now >= box[5]){
            $('.product').css({
              'transform': 'translate3d(-' + box[6] +'px, 0px, 0px)'
            });
            now = box[6];
          } else if (now >= box[4]){
            $('.product').css({
              'transform': 'translate3d(-' + box[5] +'px, 0px, 0px)'
            });
            now = box[5];
          } else if (now >= box[3]){
            $('.product').css({
              'transform': 'translate3d(-' + box[4] +'px, 0px, 0px)'
            });
            now = box[4];
          } else if (now >= box[2]){
            $('.product').css({
              'transform': 'translate3d(-' + box[3] +'px, 0px, 0px)'
            });
            now = box[3];
          } else if (now >= box[1]){
            $('.product').css({
              'transform': 'translate3d(-' + box[2] +'px, 0px, 0px)'
            });
            now = box[2];
          } else if (now >= box[0]){
            $('.product').css({
              'transform': 'translate3d(-' + box[1] +'px, 0px, 0px)'
            });
            now = box[1];
          }
        } else if (direction == 'left'){
          console.log('left');
          if(now <= box[1]) {
            $('.product').css({
              'transform': 'translate3d(-0px, 0px, 0px)'
            });
            now = 0;
          } else if (now <= box[2]){
            $('.product').css({
              'transform': 'translate3d(-' + box[1] +'px, 0px, 0px)'
            });
            now = box[1];
          } else if (now <= box[3]){
            $('.product').css({
              'transform': 'translate3d(-' + box[2] +'px, 0px, 0px)'
            });
            now = box[2];
          } else if (now <= box[4]){
            $('.product').css({
              'transform': 'translate3d(-' + box[3] +'px, 0px, 0px)'
            });
            now = box[3];
          } else if (now <= box[5]){
            $('.product').css({
              'transform': 'translate3d(-' + box[4] +'px, 0px, 0px)'
            });
            now = box[4];
          } else if (now <= box[6]){
            $('.product').css({
              'transform': 'translate3d(-' + box[5] +'px, 0px, 0px)'
            });
            now = box[5];
          } else if (now <= max){
            $('.product').css({
              'transform': 'translate3d(-' + box[6] +'px, 0px, 0px)'
            });
            now = box[6];
          }
        }
      });

      $('.section--product .arrow--prev').on('click', function(event){
        var max = ($('.product').width() - $('.productArticle').outerWidth()) - maxW;
        var tabItem = $('.productArticle');
        var box = [];
        var center = [];
        var current = 0;

        for (var i = 0; i < tabItem.length; i++) {
          var a = tabItem.eq(1).outerWidth(true);
          current += a;

          if(i == 0) {
            box.push(0);
          } else if(i == 7) {
            box.push(current - (tabItem.eq(7).outerWidth(true) + 15));
          } else {
            box.push(current - tabItem.eq(i).outerWidth(true));
          }
          center.push(current);
        }

        if(now <= box[1]) {
          $('.product').css({
            'transform': 'translate3d(-0px, 0px, 0px)'
          });
          now = 0;
        } else if (now <= box[2]){
          $('.product').css({
            'transform': 'translate3d(-' + box[1] +'px, 0px, 0px)'
          });
          now = box[1];
        } else if (now <= box[3]){
          $('.product').css({
            'transform': 'translate3d(-' + box[2] +'px, 0px, 0px)'
          });
          now = box[2];
        } else if (now <= box[4]){
          $('.product').css({
            'transform': 'translate3d(-' + box[3] +'px, 0px, 0px)'
          });
          now = box[3];
        } else if (now <= box[5]){
          $('.product').css({
            'transform': 'translate3d(-' + box[4] +'px, 0px, 0px)'
          });
          now = box[4];
        } else if (now <= box[6]){
          $('.product').css({
            'transform': 'translate3d(-' + box[5] +'px, 0px, 0px)'
          });
          now = box[5];
        } else if (now <= max){
          $('.product').css({
            'transform': 'translate3d(-' + box[6] +'px, 0px, 0px)'
          });
          now = box[6];
        }
      });

      $('.section--product .arrow--next').on('click', function(event){
        var max = ($('.product').width() - $('.productArticle').outerWidth()) - maxW;
        var tabItem = $('.productArticle');
        var box = [];
        var center = [];
        var current = 0;

        for (var i = 0; i < tabItem.length; i++) {
          var a = tabItem.eq(1).outerWidth(true);
          current += a;

          if(i == 0) {
            box.push(0);
          } else if(i == 7) {
            box.push(current - (tabItem.eq(7).outerWidth(true) + 15));
          } else {
            box.push(current - tabItem.eq(i).outerWidth(true));
          }
          center.push(current);
        }

        if (now >= box[6]){
          $('.product').css({
            'transform': 'translate3d(-' + max +'px, 0px, 0px)'
          });
          now = max;
        } else if (now >= box[5]){
          $('.product').css({
            'transform': 'translate3d(-' + box[6] +'px, 0px, 0px)'
          });
          now = box[6];
        } else if (now >= box[4]){
          $('.product').css({
            'transform': 'translate3d(-' + box[5] +'px, 0px, 0px)'
          });
          now = box[5];
        } else if (now >= box[3]){
          $('.product').css({
            'transform': 'translate3d(-' + box[4] +'px, 0px, 0px)'
          });
          now = box[4];
        } else if (now >= box[2]){
          $('.product').css({
            'transform': 'translate3d(-' + box[3] +'px, 0px, 0px)'
          });
          now = box[3];
        } else if (now >= box[1]){
          $('.product').css({
            'transform': 'translate3d(-' + box[2] +'px, 0px, 0px)'
          });
          now = box[2];
        } else if (now >= box[0]){
          $('.product').css({
            'transform': 'translate3d(-' + box[1] +'px, 0px, 0px)'
          });
          now = box[1];
        }
      });
    };

    ProductSlider.prototype.contentWidth = function() {
      var _self = this;

      var itemW = _self.$target.find(_self.$item).width();
      var len = _self.$target.find(_self.$item).length;

      _self.$target.width(((Math.ceil(itemW) + _self.$margin)  * len) - _self.$margin);
    };

    ProductSlider.prototype.getPosition = function(event) {
      return event.originalEvent.touches[0].pageX;
    }

    return ProductSlider;
	})();

  var RunkingSlider = (function() {
    var CLASS = {
      small: 'small',
    };

    function RunkingSlider(config) {
      this.config = config;
      this.$target = $(this.config.target);
      this.$item = this.config.item;
      this.$width = this.config.width;
      this.$margin = this.config.margin;
    }

    RunkingSlider.prototype.init = function(e) {
      var _self = this;

      var direction, position, list, active, position;
      var maxW;
      var now = 0;

      $win.on('load', function(){
        _self.contentWidth();

        var max = ($('.wpp-list').width() - $('.runkingArticle').outerWidth()) - 161;
        maxW = ($win.width() - 20) - $('.runkingArticle').outerWidth();

        var position = 0;

        $('.wpp-list').css({
          'transform': 'translate3d(-' + position +'px, 0px, 0px)'
        });

        var countup = function(){
          var pos = $('.wpp-list').offset();
          list = pos.left;
        }
        setTimeout(countup, 1000);
      });

      _self.$target.on('touchstart', function(event){
        position = _self.getPosition(event);
        direction = ''; //一度リセットする

        var pos = $('.wpp-list').offset();
        list = pos.left;
      });

      _self.$target.on('touchmove', function(event){
        if (position - _self.getPosition(event) > -30 ) {
          direction = 'right';
          active = list - Math.floor(position - _self.getPosition(event));
          var max = ($('.wpp-list').width() - $('.runkingArticle').outerWidth()) - maxW;

          if (active < -max) {
            $('.wpp-list').css({
              'transform': 'translate3d(-' + max +'px, 0px, 0px)'
            });
          } else {
            $('.wpp-list').css({
              'transform': 'translate3d(' + active +'px, 0px, 0px)'
            });
          }
        } else if (position - _self.getPosition(event) < 30 ){
          direction = 'left'; //右と検知
          active = list - Math.floor(position - _self.getPosition(event));

          if (active > 0) {
            $('.wpp-list').css({
              'transform': 'translate3d(0px, 0px, 0px)'
            });
          } else {
            $('.wpp-list').css({
              'transform': 'translate3d(' + active +'px, 0px, 0px)'
            });
          }
        }
      });

      _self.$target.on('touchend', function(event){
        var max = ($('.wpp-list').width() - $('.runkingArticle').outerWidth()) - maxW;

        var pos = $('.wpp-list').offset();
        list = pos.left;

        var tabItem = $('.runkingArticle');
        var itemMax = tabItem.length;
        var box = [];
        var center = [];
        var current = 0;

        for (var i = 0; i < itemMax; i++) {
          var a = tabItem.eq(1).outerWidth(true);
          current += a;

          if(i == 0) {
            box.push(0);
          } else if(i == itemMax) {
            box.push(current - (tabItem.eq(itemMax).outerWidth(true) + 15));
          } else {
            box.push(current - tabItem.eq(i).outerWidth(true));
          }
          center.push(current);
        }

        var pt = active * -1;

        if (direction == 'right'){
          console.log('right');
          if (pt > box[itemMax - 2]){
            $('.wpp-list').css({
              'transform': 'translate3d(-' + max +'px, 0px, 0px)'
            });
            now = max;
          } else if (pt > box[1]){
            $('.wpp-list').css({
              'transform': 'translate3d(-' + box[2] +'px, 0px, 0px)'
            });
            now = box[2];
          } else if (pt > box[0]){
            $('.wpp-list').css({
              'transform': 'translate3d(-' + box[1] +'px, 0px, 0px)'
            });
            now = box[1];
          }
        } else if (direction == 'left'){
          console.log('left');
          if(pt < box[1]) {
            $('.wpp-list').css({
              'transform': 'translate3d(-0px, 0px, 0px)'
            });
            now = 0;
          } else if (pt < box[2]){
            $('.wpp-list').css({
              'transform': 'translate3d(-' + box[1] +'px, 0px, 0px)'
            });
            now = box[1];
          } else if (pt < max){
            $('.wpp-list').css({
              'transform': 'translate3d(-' + box[2] +'px, 0px, 0px)'
            });
            now = box[2];
          }
        }
      });

      $('.section--runking .arrow--prev').on('click', function(event){
        var max = ($('.wpp-list').width() - $('.runkingArticle').outerWidth()) - maxW;
        var tabItem = $('.runkingArticle');
        var box = [];
        var center = [];
        var current = 0;

        for (var i = 0; i < tabItem.length; i++) {
          var a = tabItem.eq(1).outerWidth(true);
          current += a;

          if(i == 0) {
            box.push(0);
          } else if(i == 3) {
            box.push(current - (tabItem.eq(3).outerWidth(true) + 15));
          } else {
            box.push(current - tabItem.eq(i).outerWidth(true));
          }
          center.push(current);
        }

        if(now <= box[1]) {
          $('.wpp-list').css({
            'transform': 'translate3d(-0px, 0px, 0px)'
          });
          now = 0;
        } else if (now <= box[2]){
          $('.wpp-list').css({
            'transform': 'translate3d(-' + box[1] +'px, 0px, 0px)'
          });
          now = box[1];
        } else if (now <= max){
          $('.wpp-list').css({
            'transform': 'translate3d(-' + box[2] +'px, 0px, 0px)'
          });
          now = box[2];
        }
      });

      $('.section--runking .arrow--next').on('click', function(event){
        var max = ($('.wpp-list').width() - $('.runkingArticle').outerWidth()) - maxW;
        var tabItem = $('.runkingArticle');
        var itemMax = tabItem.length;
        var box = [];
        var center = [];
        var current = 0;

        for (var i = 0; i < itemMax; i++) {
          var a = tabItem.eq(1).outerWidth(true);
          current += a;

          if(i == 0) {
            box.push(0);
          } else if(i == itemMax) {
            box.push(current - (tabItem.eq(itemMax).outerWidth(true) + 15));
          } else {
            box.push(current - tabItem.eq(i).outerWidth(true));
          }
          center.push(current);
        }

        if (now >= box[itemMax - 2]){
          $('.wpp-list').css({
            'transform': 'translate3d(-' + max +'px, 0px, 0px)'
          });
          now = max;
        } else if (now >= box[1]){
          $('.wpp-list').css({
            'transform': 'translate3d(-' + box[2] +'px, 0px, 0px)'
          });
          now = box[2];
        } else if (now >= box[0]){
          $('.wpp-list').css({
            'transform': 'translate3d(-' + box[1] +'px, 0px, 0px)'
          });
          now = box[1];
        }
      });
    };

    RunkingSlider.prototype.contentWidth = function() {
      var _self = this;

      var itemW = _self.$target.find(_self.$item).width();
      var len = _self.$target.find(_self.$item).length;

      _self.$target.width(((Math.ceil(itemW) + _self.$margin)  * len) - _self.$margin);
    };

    RunkingSlider.prototype.getPosition = function(event) {
      return event.originalEvent.touches[0].pageX;
    }

    return RunkingSlider;
  })();

  var HistorySlider = (function() {
    var CLASS = {
      small: 'small',
    };

    function HistorySlider(config) {
      this.config = config;
      this.$target = $(this.config.target);
      this.$item = this.config.item;
      this.$width = this.config.width;
      this.$margin = this.config.margin;
    }

    HistorySlider.prototype.init = function(e) {
      var _self = this;

      _self.contentWidth();
      var direction, position, list, active, position;
      var maxW = ($win.width() - 20) - $('.historyArticle').outerWidth();
      var now = 0;
      var itemLen = _self.$target.find(_self.$item).length - 1;

      $win.on('load', function(){
        var max = ($('.history').width() - $('.historyArticle').outerWidth()) - 161;

        var position = 0;
        $('.history').css({
          'transform': 'translate3d(-' + position +'px, 0px, 0px)'
        });

        if(itemLen + 1 <= 1) {
          $('.section--history .arrows').remove();
        }

        var countup = function(){
          var pos = $('.history').offset();
          list = pos.left;
        }
        setTimeout(countup, 1000);
      });

      _self.$target.on('touchstart', function(event){
        position = _self.getPosition(event);
        direction = ''; //一度リセットする

        var pos = $('.history').offset();
        list = pos.left;
      });

      _self.$target.on('touchmove', function(event){
        if (position - _self.getPosition(event) > -30 ) {
          direction = 'right';
          active = list - Math.floor(position - _self.getPosition(event));
          var max = ($('.history').width() - $('.historyArticle').outerWidth()) - maxW;

          if (active < -max) {
            $('.history').css({
              'transform': 'translate3d(-' + max +'px, 0px, 0px)'
            });
          } else {
            $('.history').css({
              'transform': 'translate3d(' + active +'px, 0px, 0px)'
            });
          }
        } else if (position - _self.getPosition(event) < 30 ){
          direction = 'left'; //右と検知
          active = list - Math.floor(position - _self.getPosition(event));

          if (active > 0) {
            $('.history').css({
              'transform': 'translate3d(0px, 0px, 0px)'
            });
          } else {
            $('.history').css({
              'transform': 'translate3d(' + active +'px, 0px, 0px)'
            });
          }
        }
      });

      _self.$target.on('touchend', function(event){
        var max = ($('.history').width() - $('.historyArticle').outerWidth()) - maxW;

        var pos = $('.history').offset();
        list = pos.left;

        var tabItem = $('.historyArticle');
        var box = [];
        var center = [];
        var current = 0;

        for (var i = 0; i < tabItem.length; i++) {
          var a = tabItem.eq(1).outerWidth(true);
          current += a;

          if(i == 0) {
            box.push(0);
          } else if(i == 3) {
            box.push(current - (tabItem.eq(3).outerWidth(true) + 15));
          } else {
            box.push(current - tabItem.eq(i).outerWidth(true));
          }
          center.push(current);
        }

        var pt = active * -1;

        if (direction == 'right'){
          console.log('right');
          // if (pt > box[2]){
          //   $('.history').css({
          //     'transform': 'translate3d(-' + max +'px, 0px, 0px)'
          //   });
          //   now = max;
          // } else if (pt > box[1]){
          //   $('.history').css({
          //     'transform': 'translate3d(-' + box[2] +'px, 0px, 0px)'
          //   });
          //   now = box[2];
          // } else if (pt > box[0]){
          //   $('.history').css({
          //     'transform': 'translate3d(-' + box[1] +'px, 0px, 0px)'
          //   });
          //   now = box[1];
          // }
          console.log(pt)
          console.log(box)

          if (pt > box[box.length - 2]){
            $('.history').css({
              'transform': 'translate3d(-' + max +'px, 0px, 0px)'
            });
            now = max;
          } else if (pt > box[box.length - 3]){
            $('.history').css({
              'transform': 'translate3d(-' + box[box.length - 2] +'px, 0px, 0px)'
            });
            now = box[box.length - 2];
          } else if (pt > box[0]){
            $('.history').css({
              'transform': 'translate3d(-' + box[1] +'px, 0px, 0px)'
            });
            now = box[1];
          }
        } else if (direction == 'left'){
          if(pt < box[1]) {
            $('.history').css({
              'transform': 'translate3d(-0px, 0px, 0px)'
            });
            now = 0;
          } else if (pt < box[box.length - 2]){
            $('.history').css({
              'transform': 'translate3d(-' + box[box.length - 3] +'px, 0px, 0px)'
            });
            now = box[1];
          } else if (pt < max){
            $('.history').css({
              'transform': 'translate3d(-' + box[box.length - 2] +'px, 0px, 0px)'
            });
            now = box[box.length - 2];
          }
        }
      });

      $('.section--history .arrow--prev').on('click', function(event){
        var max = ($('.history').width() - $('.historyArticle').outerWidth()) - maxW;
        var tabItem = $('.historyArticle');
        var box = [];
        var center = [];
        var current = 0;

        for (var i = 0; i < tabItem.length; i++) {
          var a = tabItem.eq(1).outerWidth(true);
          current += a;

          if(i == 0) {
            box.push(0);
          } else if(i == itemLen) {
            box.push(current - (tabItem.eq(itemLen).outerWidth(true) + 15));
          } else {
            box.push(current - tabItem.eq(i).outerWidth(true));
          }
          center.push(current);
        }


        if(now <= box[1]) {
          $('.history').css({
            'transform': 'translate3d(-0px, 0px, 0px)'
          });
          now = 0;
        } else if (now <= box[box.length - 2]){
          $('.history').css({
            'transform': 'translate3d(-' + box[box.length - 3] +'px, 0px, 0px)'
          });
          now = box[1];
        } else if (now <= max){
          $('.history').css({
            'transform': 'translate3d(-' + box[box.length - 2] +'px, 0px, 0px)'
          });
          now = box[box.length - 2];
        }
      });

      $('.section--history .arrow--next').on('click', function(event){
        var max = ($('.history').width() - $('.historyArticle').outerWidth()) - maxW;
        var tabItem = $('.historyArticle');
        var box = [];
        var center = [];
        var current = 0;

        for (var i = 0; i < tabItem.length; i++) {
          var a = tabItem.eq(1).outerWidth(true);
          current += a;

          if(i == 0) {
            box.push(0);
          } else if(i == itemLen) {
            box.push(current - (tabItem.eq(itemLen).outerWidth(true) + 15));
          } else {
            box.push(current - tabItem.eq(i).outerWidth(true));
          }
          center.push(current);
        }

        if (now >= box[box.length - 2]){
          $('.history').css({
            'transform': 'translate3d(-' + max +'px, 0px, 0px)'
          });
          now = max;
        } else if (now >= [box.length - 3]){
          $('.history').css({
            'transform': 'translate3d(-' + box[box.length - 2] +'px, 0px, 0px)'
          });
          now = box[box.length - 2];
        } else if (now >= box[0]){
          $('.history').css({
            'transform': 'translate3d(-' + box[1] +'px, 0px, 0px)'
          });
          now = box[1];
        }
      });
    };

    HistorySlider.prototype.contentWidth = function() {
      var _self = this;

      var itemW = _self.$target.find(_self.$item).width();
      var len = _self.$target.find(_self.$item).length;

      _self.$target.width(((Math.ceil(itemW) + _self.$margin)  * len) - _self.$margin);
    };

    HistorySlider.prototype.getPosition = function(event) {
      return event.originalEvent.touches[0].pageX;
    }

    return HistorySlider;
  })();

  var AttentionSlider = (function() {
    var CLASS = {
      small: 'small',
    };

    function AttentionSlider(config) {
      this.config = config;
      this.$target = $(this.config.target);
      this.$item = this.config.item;
      this.$width = this.config.width;
      this.$margin = this.config.margin;
    }

    AttentionSlider.prototype.init = function(e) {
      var _self = this;

      var direction, position, list, active, position, space;
      if(App.deviceCheck('pc')) {
        space = 40;
      } else {
        space = 30;
        if(_self.$target.hasClass('attention__inner--common')) {
          space = 0;
        } else {
          space = 30;
        }
      }
      var maxW = ($('.attention').innerWidth() - space) - $('.attentionArticle').outerWidth();
      var now = 0;
      var itemLen = _self.$target.find(_self.$item).length - 1;

      $win.on('load', function(){
        var max = ($('.attention__inner').width() - $('.attentionArticle').outerWidth()) - 161;

        var position = 0;
        $('.attention__inner').css({
          'transform': 'translate3d(-' + position +'px, 0px, 0px)'
        });

        var maxHeight = 0;

        console.log(_self.$item);

        $(_self.$item).each(function(){
          var $_self = $(this);
          var itemH = $_self.find('.attentionArticle__headline').height();
          if (itemH > maxHeight) {
            maxHeight = itemH;
          }
        });
        $('.attentionArticle__headline').height(maxHeight);

        if(App.deviceCheck('pc')) {
          if(itemLen + 1 <= 2) {
            $('.section--attention .arrows').remove();
          }
        }

        if(App.deviceCheck('sp')) {
          if(itemLen + 1 <= 1) {
            $('.section--attention .arrows').remove();
          }
        }

        var countup = function(){
          var pos = $('.attention__inner').offset();
          list = pos.left;
        }
        setTimeout(countup, 1000);
      });

      _self.$target.on('touchstart', function(event){
        position = _self.getPosition(event);
        direction = ''; //一度リセットする

        var pos = $('.attention__inner').offset();
        list = pos.left;
      });

      _self.$target.on('touchmove', function(event){
        if (position - _self.getPosition(event) > -30 ) {
          direction = 'right';
          active = list - Math.floor(position - _self.getPosition(event));
          var max = ($('.attention__inner').width() - $('.attentionArticle').outerWidth()) - maxW;

          if (active < -max) {
            $('.attention__inner').css({
              'transform': 'translate3d(-' + max +'px, 0px, 0px)'
            });
          } else {
            $('.attention__inner').css({
              'transform': 'translate3d(' + active +'px, 0px, 0px)'
            });
          }
        } else if (position - _self.getPosition(event) < 30 ){
          direction = 'left'; //右と検知
          active = list - Math.floor(position - _self.getPosition(event));

          if (active > 0) {
            $('.attention__inner').css({
              'transform': 'translate3d(0px, 0px, 0px)'
            });
          } else {
            $('.attention__inner').css({
              'transform': 'translate3d(' + active +'px, 0px, 0px)'
            });
          }
        }
      });

      _self.$target.on('touchend', function(event){
        var max = ($('.attention__inner').width() - $('.attentionArticle').outerWidth()) - maxW;

        var pos = $('.attention__inner').offset();
        list = pos.left;

        var tabItem = $('.attentionArticle');
        var box = [];
        var center = [];
        var current = 0;

        for (var i = 0; i < tabItem.length; i++) {
          var a = tabItem.eq(1).outerWidth(true);
          current += a;

          if(i == 0) {
            box.push(0);
          } else if(i == 3) {
            box.push(current - (tabItem.eq(3).outerWidth(true) + 20));
          } else {
            box.push(current - tabItem.eq(i).outerWidth(true));
          }
          center.push(current);
        }

        var pt = active * -1;

        if (direction == 'right'){
          if (pt > box[box.length - 2]){
            $('.attention__inner').css({
              'transform': 'translate3d(-' + max +'px, 0px, 0px)'
            });
            now = max;
          } else if (pt > box[box.length - 3]){
            $('.attention__inner').css({
              'transform': 'translate3d(-' + box[box.length - 2] +'px, 0px, 0px)'
            });
            now = box[box.length - 2];
          } else if (pt > box[0]){
            $('.attention__inner').css({
              'transform': 'translate3d(-' + box[1] +'px, 0px, 0px)'
            });
            now = box[1];
          }
        } else if (direction == 'left'){
          if(pt < box[1]) {
            $('.attention__inner').css({
              'transform': 'translate3d(-0px, 0px, 0px)'
            });
            now = 0;
          } else if (pt < box[box.length - 2]){
            $('.attention__inner').css({
              'transform': 'translate3d(-' + box[box.length - 3] +'px, 0px, 0px)'
            });
            now = box[1];
          } else if (pt < max){
            $('.attention__inner').css({
              'transform': 'translate3d(-' + box[box.length - 2] +'px, 0px, 0px)'
            });
            now = box[box.length - 2];
          }
        }
      });

      $('.section--attention .arrow--prev').on('click', function(event){
        var max = ($('.attention__inner').width() - $('.attentionArticle').outerWidth()) - maxW;
        var tabItem = $('.attentionArticle');
        var box = [];
        var center = [];
        var current = 0;

        for (var i = 0; i < tabItem.length; i++) {
          var a = tabItem.eq(1).outerWidth(true);
          current += a;

          if(i == 0) {
            box.push(0);
          } else if(i == itemLen) {
            box.push(current - (tabItem.eq(itemLen).outerWidth(true) + 20));
          } else {
            box.push(current - tabItem.eq(i).outerWidth(true));
          }
          center.push(current);
        }

        if(App.deviceCheck('pc')) {
          if(now <= box[1]) {
            $('.attention__inner').css({
              'transform': 'translate3d(-0px, 0px, 0px)'
            });
            now = 0;
          } else if (now <= box[box.length - 2]){
            $('.attention__inner').css({
              'transform': 'translate3d(-' + box[box.length - 3] +'px, 0px, 0px)'
            });
            now = box[1];
          }
        }

        if(App.deviceCheck('sp')) {
          if(now <= box[1]) {
            $('.attention__inner').css({
              'transform': 'translate3d(-0px, 0px, 0px)'
            });
            now = 0;
          } else if (now <= box[box.length - 2]){
            $('.attention__inner').css({
              'transform': 'translate3d(-' + box[box.length - 3] +'px, 0px, 0px)'
            });
            now = box[1];
          } else if (now <= max){
            $('.attention__inner').css({
              'transform': 'translate3d(-' + box[box.length - 2] +'px, 0px, 0px)'
            });
            now = box[box.length - 2];
          }
        }
      });

      $('.section--attention .arrow--next').on('click', function(event){
        var max = ($('.attention__inner').innerWidth() - $('.attentionArticle').outerWidth()) - maxW;
        var tabItem = $('.attentionArticle');
        var box = [];
        var center = [];
        var current = 0;

        for (var i = 0; i < tabItem.length; i++) {
          var a = tabItem.eq(1).outerWidth(true);
          current += a;

          if(i == 0) {
            box.push(0);
          } else if(i == itemLen) {
            box.push(current - (tabItem.eq(itemLen).outerWidth(true) + 20));
          } else {
            box.push(current - tabItem.eq(i).outerWidth(true));
          }
          center.push(current);
        }

        if(App.deviceCheck('pc')) {
          if (now >= box[box.length - 3]){
            $('.attention__inner').css({
              'transform': 'translate3d(-' + max +'px, 0px, 0px)'
            });
            now = max;
          } else if (now >= box[0]){
            $('.attention__inner').css({
              'transform': 'translate3d(-' + box[1] +'px, 0px, 0px)'
            });
            now = box[1];
          }
        }

        if(App.deviceCheck('sp')) {
          if (now >= box[box.length - 2]){
            $('.attention__inner').css({
              'transform': 'translate3d(-' + max +'px, 0px, 0px)'
            });
            now = max;
          } else if (now >= [box.length - 3]){
            $('.attention__inner').css({
              'transform': 'translate3d(-' + box[box.length - 2] +'px, 0px, 0px)'
            });
            now = box[box.length - 2];
          } else if (now >= box[0]){
            $('.attention__inner').css({
              'transform': 'translate3d(-' + box[1] +'px, 0px, 0px)'
            });
            now = box[1];
          }
        }
      });
    };

    AttentionSlider.prototype.contentWidth = function() {
      var _self = this;

      var itemW = _self.$target.find(_self.$item).width();
      var len = _self.$target.find(_self.$item).length;

      _self.$target.width(((Math.ceil(itemW) + _self.$margin)  * len) - _self.$margin);
    };

    AttentionSlider.prototype.getPosition = function(event) {
      return event.originalEvent.touches[0].pageX;
    }

    return AttentionSlider;
  })();

  var tagHeight = (function() {
    var CLASS = {
      small: 'small',
    };

    function tagHeight(config) {
      this.config = config;
      this.$target = $(this.config.target);
      this.$company = $(this.config.company);
      this.$tag = $(this.config.tag);
      this.$service = $(this.config.service);
    }

    tagHeight.prototype.init = function(e) {
      var _self = this;

      _self.companyHeight();
      _self.tagHeight();
      _self.serviceHeight();
    };

    tagHeight.prototype.companyHeight = function() {
      var _self = this;

      var maxHeight = 0;

      _self.$target.each(function(){
        var companyH = $(this).find(_self.$company).height();
        if (companyH > maxHeight) {
          maxHeight = companyH;
        }
      });

      $(_self.$company).height(maxHeight);
    }

    tagHeight.prototype.tagHeight = function() {
      var _self = this;

      var maxHeight = 0;

      _self.$target.each(function(){
        var tagH = $(this).find(_self.$tag).height();
        if (tagH > maxHeight) {
          maxHeight = tagH;
        }
      });

      $(_self.$tag).height(maxHeight);
    }

    tagHeight.prototype.serviceHeight = function() {
      var _self = this;

      var maxHeight = 0;

      _self.$target.each(function(){
        var serviceH = $(this).find(_self.$service).height();
        if (serviceH > maxHeight) {
          maxHeight = serviceH;
        }
      });

      $(_self.$service).height(maxHeight);
    }


    return tagHeight;
  })();

  /**
	 * targetを指定
	 * @type {*[]}
	 */
	var targets = [
    {
      target: '.product',
      item: '.productArticle',
      width: 194,
      margin: 15
    },
    {
      target: '.wpp-list',
      item: '.runkingArticle',
      width: 194,
      margin: 15
    },
    {
      target: '.history',
      item: '.historyArticle',
      width: 194,
      margin: 15
    }
  ];

  var items = {
    target: '.productArticle',
    company: '.productArticle__headline',
    tag: '.productArticle__tag',
    service: '.productArticle__service',
  }


  $(function() {

    var tag_height = new tagHeight(items);
    tag_height.init();

    if(App.deviceCheck('sp')) {
      var product_slider = new ProductSlider(targets[0]);
      product_slider.init();

      var runking_slider = new RunkingSlider(targets[1]);
      runking_slider.init();

      var history_slider = new HistorySlider(targets[2]);
      history_slider.init();
    }

    // var attention_slider = new AttentionSlider(targets[3]);
    // attention_slider.init();

  });
})();