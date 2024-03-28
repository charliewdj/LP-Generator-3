(function() {

  var device;
  var ua = navigator.userAgent;
  if ((ua.indexOf('iPhone') > 0) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
    device = 'sp';
  } else {
    device = 'pc';
  }

  // if (device == 'sp') {
  //   return;
  // }


	var $win = $(window);

  var Product = (function() {
    var CLASS = {
			fixed: 'is--fixed',
		};

    function Product(config) {
			this.config = config;
			this.$target = $(this.config.target);
		}

    Product.prototype.init = function() {
      var _self = this;
      var position = _self.$target.offset().top;

      $win.on('load scroll', function(){
        var scroll = $(this).scrollTop();

        if(scroll >= position) {
          _self.$target.addClass(CLASS.fixed);
        } else {
          _self.$target.removeClass(CLASS.fixed);
        }
      });
    };

    return Product;
	})();

  var targets = {
    target: '.detailHead',
  };

  $(function() {
    var product = new Product(targets);
    product.init();
  });
})();