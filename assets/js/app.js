var App = App || {};

/**
 * 共通処理
 * @type {{$win: (any), customWindowEvent: {resize: App.customWindowEvent.resize}, deviceCheck: App.deviceCheck}}
 */
App = {
  $win: $(window),

  /**
   * windowイベント カスタマイズ
   * @type {{resize: customWindowEvent.resize}}
   */
  customWindowEvent: {
    resize: function (callback) {
      App.$win.on("resize", function () {
        var timer,
          interval = 500;

        clearTimeout(timer);

        console.log('#1');

        timer = setTimeout(function () {
          callback();
        }, interval);
      });
    },
  },

  /**
   * デバイスチェック
   * @param device
   * @returns {*}
   */
  deviceCheck: function (device) {
    var MEDIA_QUERIES = "max-width: 768px",
      result;

    device = device.toLowerCase();

    if (device === "sp") {
      result =
        window.matchMedia &&
        window.matchMedia("(" + MEDIA_QUERIES + ")").matches
          ? true
          : false;
    } else if (device === "pc") {
      result =
        window.matchMedia &&
        window.matchMedia("(" + MEDIA_QUERIES + ")").matches
          ? false
          : true;
    }
    return result;
  },
};

(function () {
  /**
   * ブレークポイントの切り替え
   **/
  const isIPad =
    /iPad|Macintosh/i.test(navigator.userAgent) && "ontouchend" in document;
  var ua = navigator.userAgent;
  var pcWidth = 1200;
  var viewport = document.getElementsByName("viewport")[0];
  var wWin = $(window).width();
  $(function () {
    App.$win.on("load", function () {
      if (wWin <= 768) {
        viewport.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimum-scale=1.0"
        );
      } else {
        viewport.setAttribute("content", "width=" + pcWidth);

        if (isIPad) {
          $(".main").css("margin-top", $(".header").outerHeight());
        }
      }
    });

    App.$win.on("orientationchange", function() {
      if (isIPad) {
        $(".main").css("margin-top", $(".header").outerHeight());
      }
    });
  });
})();
