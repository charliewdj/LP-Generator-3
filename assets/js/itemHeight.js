(function() {
  'use strict';

  var $win = $(window);
  var breakPoint = 896;

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

  if (device == 'sp') {
    return;
  }

  var itemHeight = (function() {
    function itemHeight(config) {
      this.target = $(config.target);
      this.headline = config.headline;
      this.description = config.description;
      this.company = config.company;
    }

    itemHeight.prototype.init = function() {
      var _self = this;

      _self.headlineHeight();
      _self.descriptionHeight();
      _self.companyHeight();
    }

    itemHeight.prototype.headlineHeight = function() {
      var _self = this;

      var maxHeight = 0;

      _self.target.each(function(){
        var headlineH = $(this).find(_self.headline).height();
        if (headlineH > maxHeight) {
          maxHeight = headlineH;
        }
      });

      $(_self.headline).height(maxHeight);
    }

    itemHeight.prototype.descriptionHeight = function() {
      var _self = this;

      var maxHeight = 0;

      _self.target.each(function(){
        var descriptionH = $(this).find(_self.description).height();
        if (descriptionH > maxHeight) {
          maxHeight = descriptionH;
        }
      });

      $(_self.description).height(maxHeight);
    }

    itemHeight.prototype.companyHeight = function() {
      var _self = this;

      var maxHeight = 0;

      _self.target.each(function(){
        var companyH = $(this).find(_self.company).height();
        if (companyH > maxHeight) {
          maxHeight = companyH;
        }
      });

      $(_self.company).height(maxHeight);
    }

    return itemHeight;
  })();

  var targets = [
    {
      target: '.introductionArticle',
      headline: '.introductionArticle__headline',
      description: '.introductionArticle__description',
      company: ''
    }, {
      target: '.connectionArticle',
      headline: '.connectionArticle__headline',
      description: '.connectionArticle__description',
      company: '.connectionArticle__company'
    }
  ];

  $(function() {
    if (App.deviceCheck('pc')) {
      for (var i = 0, iLen = targets.length; i < iLen; i++) {
        var item_height = new itemHeight(targets[i]);
        item_height.init();
      }
    }
  });

})();