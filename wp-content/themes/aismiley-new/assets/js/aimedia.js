jQuery(function () {
  // ページ内アンカーリンク
  let speed = 0;
  let href, target, position, headerHeight;
  $('a[href^="#"]').click(function () {
    href = $(this).attr("href");
    headerHeight = $(".header").outerHeight();
    target = $(href == "#" || href == "" ? "html" : href);
    position = target.offset().top - headerHeight - 20;

    if ($(this).parent(".float_menu").length == 0) {
      speed = 0;
    } else {
      speed = 400;
    }

    $("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  });

  function checkScrollPosition() {
    const threshold = 300;

    if ($(window).scrollTop() > threshold) {
      $("#js-pagetop").addClass("active");
    } else {
      $("#js-pagetop").removeClass("active");
    }
  }

  $(window).scroll(function () {
    checkScrollPosition();
  });

  // ページ読み込み時にもチェック
  checkScrollPosition();

  /*jQuery(".seek .seekArticle input[name='itemcheck']").on('click', function(){
      if (typeof check_on == 'function') {
        check_on(this.id,this.checked);
      }
  });*/

  jQuery(".seek .seekArticle .seekArticle__checkWrapper").on("click", function () {
    if (typeof check_on == "function") {
      check_on($(this).find('input[name="itemcheck"]').attr("id"), $(this).find('input[name="itemcheck"]').prop("checked"));
    }
  });

  jQuery(".all--check").on("click", function () {
    Cookies.set("CHECKED_PRODUCTS", []);
    if($(".hidden_products ").length != 0) {
      var items = jQuery(".hidden_seekArticle input[name='itemcheck']");
      var _target = 'hidden_seekArticle';
    }
    else {
      var items = jQuery(".seek .seekArticle input[name='itemcheck']");
      var _target = '.seekArticle';
    }
    
    //items.prop('checked',true);
    items.each(function () {
      if (jQuery(this).parents(_target).css("display") !== "none") {
        jQuery(this).prop("checked", true);
        if (typeof check_on == "function") {
          check_on(this.id, this.checked);
        }
      }
    });
    if (jQuery(this).prev("input").prop("checked")) {
      items.prop("checked", false);
      Cookies.set("CHECKED_PRODUCTS", []);
      return;
    }
    /*if (typeof check_all == 'function') {
      check_all();
    }*/
  });
  
  
  jQuery(".favoreite-allcheck-text").on("click", function () {
    Cookies.set("CHECKED_PRODUCTS", []);
    var items = jQuery(".seek .seekArticle input[name='itemcheck']");
    items.each(function () {
      if (jQuery(this).parents(".seekArticle").css("display") !== "none") {
        jQuery(this).prop("checked", true);
        if (typeof check_on == "function") {
          check_on(this.id, this.checked);
        }
      }
    });
    if (!jQuery(this).prev().prev("input").prop("checked")) {
      items.prop("checked", false);
      Cookies.set("CHECKED_PRODUCTS", []);
      return;
    }
  });

  jQuery("a.disabled").parent("li").hide();

  $(".menu_tab").on("click", function () {
    $(".menu_tabs").slideToggle(function () {
      if ($(this).is(":visible")) {
        $(this).css({
          display: "inline-block",
          overflow: "visible",
        });
      }
    });
  });

  // ファイルアップロードの削除ボタン
  if ($(".wpcf7-file").length != 0) {
    let baseFontSize = 14;
    let file, label, _paerntWidth, _txtWidth, _fileNameWidth;

    // ファイル選択を検知
    $("input[type=file]").change(function () {
      $(".cf7_file-upload").addClass("active");

      file = $(this).prop("files")[0];
      label = $(this).parent().next();

      _paerntWidth = $(".cf7_file-upload").outerWidth() - 14;
      _txtWidth = $('label[for="file_annotation"]').outerWidth();
      _fileNameWidth = _paerntWidth - _txtWidth - 40;

      $(".cf7_file-upload").find(".filename").css("width", _fileNameWidth);
      $(".cf7_file-upload")
        .find(".filename")
        .html(start_and_end(file.name, Math.floor(_fileNameWidth / baseFontSize) + 4));
    });

    // ファイル削除ボタンを押すとファイル選択解除
    $("#file-clear").click(function () {
      $("input[type=file]").val("");
      $(".cf7_file-upload").removeClass("active");
      // $(this).removeClass('show');
    });
  }

  // 文字列を指定の桁数に省略する
  function start_and_end(str, digits) {
    if (str.length > digits) {
      return str.substr(0, digits / 2) + "..." + str.substr(str.length - digits / 2, str.length);
    }
    return str;
  }

  if ($(".seek__table").find("span").length != 0) {
    let __limit_length_td = 35;
    if (App.deviceCheck("sp")) {
      __limit_length_td = 25;
    }
    $(".seek__table")
      .find("span")
      .each(function (index) {
        // 高さの判定
        if ($(this).outerHeight() > __limit_length_td) {
          $(this).addClass("seek__table--omit");
        }
      });
  }

  if ($(".seekArticle__text").length != 0) {
    let __limit_length = 65;
    if (App.deviceCheck("sp")) {
      __limit_length = 63;
    }

    $(".seekArticle__text").each(function (index) {
      // 高さの判定
      if ($(this).outerHeight() > __limit_length) {
        $(this).addClass("seekArticle__text--omit");
      }
    });
  }

  // ニュースの資料チェック
  if ($(".documentList").length != 0) {
    // ページに入ってきた時に製品全チェック処理を走らせる
    Cookies.set("CHECKED_PRODUCTS", []);
    var items = $(".documentList__item input[name='docChk']");

    items.each(function () {
      if (typeof check_on == "function") {
        check_on($(this).val(), true);
      }
    });

    $(".documentList__item input[name='docChk']").on("click", function () {
      if (typeof check_on == "function") {
        check_on($(this).val(), $(this).prop("checked"));
      }
    });
  }

  // SP時の検索バーの挙動
  let scrolltop = 0;
  let beforePos = 0;
  let elemTop = 100;
  const hdr = $(".spSearch");

  $(document).on("load scroll", function () {
    scrolltop = $(document).scrollTop();

    if (scrolltop == beforePos) {
    } else if (elemTop > scrolltop || 0 > scrolltop - beforePos) {
      //ヘッダーが上から出現する
      hdr.removeClass("UpMove");
      hdr.addClass("DownMove");
    } else {
      //ヘッダーが上に消える
      hdr.removeClass("DownMove");
      hdr.addClass("UpMove");
    }

    beforePos = scrolltop;
  });

  if ($(".blockEditorNew").length != 0) {
    $(".blockEditorNew")
      .find("p")
      .find("img")
      .each(function (index) {
        $(this).parent().addClass("image");
      });
  }

  if ($(".scrollTable__wrapper").length != 0) {
    let once = false;
    $(document).on("scroll", function () {
      // ターゲットの画面トップからの距離
      scrolltop = $(document).scrollTop();
      let taeget_position = $(".scrollTable__wrapper").offset().top;

      // 画面トップからの距離から画面の高さより小さければ実行する
      if (taeget_position <= scrolltop + 200 && once !== true) {
        once = true;
        $(".scrollTable__wrapper").addClass("start");
      }
    });
  }

  // AI企業一覧の説明文の上限を決める
  if ($(".corporate").find(".corporatesArticle__description").length != 0) {
    let _coHeight = 80;
    if (App.deviceCheck("pc")) {
      _coHeight = 104;
    }
    $(".corporate")
      .find(".corporatesArticle__description")
      .each(function (index) {
        // 高さの判定
        if ($(this).outerHeight() > _coHeight) {
          $(this).addClass("corporatesArticle__description--omit");
        }
      });
  }

  // 事例一覧の高さを揃える
  if ($(".casesArticle").length != 0) {
    if (App.deviceCheck("pc")) {
      $(".match").matchHeight();
      $(".match_title").matchHeight();
    }
  }

  // 動画をラップする
  if ($(".blockEditor").length != 0) {
    $(".blockEditor").find("iframe:not(.wp-embedded-content)").parent().addClass("video-container");
    // $('.blockEditor').find('iframe').parent().addClass('video-container');
  }

  // ポップアップバナー
  if ($(".poupBannerBlock").length != 0) {
    $(".poupBannerBlock")
      .find(".buttonClose")
      .on("click", function () {
        $(".poupBannerArea").hide();

        return false;
      });

    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 200) {
        $(".poupBannerArea").addClass("show");
      }
    });
  }

  // ウェビナーのサイド追従
  // サイド追従
  let scrollPosition;
  // ヘッダーとヒーローエリアを足す
  let windowHeight = 0;
  let ctaAreaPos = 0;
  let endPos = 0;

  $(window).on("load scroll", function () {
    if ($(".float_menu").length != 0) {
      headerHeight = $(".header").outerHeight();
      windowHeight = $(window).outerHeight();
      ctaAreaPos = $("#entry").offset().top - 170;

      endPos = ctaAreaPos;
      scrollPosition = $(window).scrollTop() + headerHeight;

      if (scrollPosition < endPos) {
        $(".float_menu").addClass("following");
      } else {
        $(".float_menu").removeClass("following");
      }
    }
  });

  // ウェビナーのカテゴリ
  $(".nextArrow")
    .find("span")
    .on("click", function () {
      _distance += _rage;
      chkContainer(_distance);
    });

  $(".prevArrow")
    .find("span")
    .on("click", function () {
      _distance -= _rage;
      chkContainer(_distance);
    });

  $(".tagItem")
    .find("span")
    .on("click", function (e) {
      let _target = $(this).data("href");
      setTimeout(() => {
        if (_tmpDistance == _distance) {
          location.href = _target;
        } else {
          _tmpDistance = _distance;
          e.preventDefault();
          e.stopPropagation();
        }
      }, 100);
    });

  $(".tagListView").on("click", function () {
    $(".tagModal").addClass("show");
  });
  $(".tagClose").on("click", function () {
    $(".tagModal").removeClass("show");
  });

  // ドラッグによる要素の水平移動を実現する関数
  function draggableElement(element) {
    // マウスイベントのリスナーを登録
    element.addEventListener("mousedown", handleMouseDown);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseup", handleMouseUp);
    element.addEventListener("mouseleave", handleMouseUp);

    // タッチイベントのリスナーを登録
    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchmove", handleTouchMove);
    element.addEventListener("touchend", handleTouchEnd);

    function handleMouseDown(e) {
      isDragging = true;
      dragMouseStart = e.clientX;
      dragOffsetStart = _distance;
    }

    function handleMouseMove(e) {
      if (!isDragging) return;
      _distance = dragOffsetStart - (e.clientX - dragMouseStart);
      chkContainer(_distance);
    }

    function handleMouseUp(e) {
      isDragging = false;
    }

    function handleTouchStart(e) {
      var touch = e.touches[0];
      handleMouseDown(touch);
    }

    function handleTouchMove(e) {
      var touch = e.touches[0];
      handleMouseMove(touch);
    }

    function handleTouchEnd(event) {
      handleMouseUp(event);
    }
  }

  // scroll-containerの位置を監視する
  function chkContainer(distance) {
    if (_draggable) {
      // 左端
      if (distance <= 0) {
        distance = 0;
        $(".prevArrow").removeClass("show");
      } else {
        $(".prevArrow").addClass("show");
      }

      // 右端
      if (distance >= scrollContainer.offsetWidth - tagArea.offsetWidth) {
        distance = scrollContainer.offsetWidth - tagArea.offsetWidth;
        $(".nextArrow").removeClass("show");
      } else {
        $(".nextArrow").addClass("show");
      }

      scrollContainer.style.transform = "translateX(" + distance * -1 + "px)";
    }
  }

  // タグエリアの要素を取得してドラッグ可能にする
  var tagArea = document.querySelector(".tagArea");
  var scrollContainer = document.querySelector(".scroll-container");
  let _wrapperWidth = 0;
  let _rage = 320;
  let _distance = 0;
  let _tmpDistance = 0;
  let _draggable = true;
  var isDragging = false;

  if ($(".tagArea").length != 0) {
    draggableElement(scrollContainer);
    // ラッパーの長さを設定
    tagRapper = $(".scroll-container");
    tagRapper.css({ transform: "translateX(0px)" });
    tagRapper.find("li").each(function (index) {
      _wrapperWidth += $(this).outerWidth() + 12;
    });

    tagRapper.css("width", _wrapperWidth);
  }

  $(window).on("load resize", function () {
    if ($(".tagArea").length != 0) {
      if ($(window).width() - $(".tagArea").offset().left <= _wrapperWidth) {
        $(".nextArrow").addClass("show");
        $(".tagListView").addClass("show");

        _draggable = true;
      } else {
        $(".prevArrow").removeClass("show");
        $(".nextArrow").removeClass("show");
        $(".tagListView").removeClass("show");
        tagRapper.css({ transform: "translateX(0px)" });
        _distance = 0;
        _draggable = false;
      }
    }
  });

  if ($("#k3form_embed").length != 0) {
    const textareaObserver = new ResizeObserver(resizeHandler);

    // ResizeObserver インスタンスに監視対象要素を登録
    textareaObserver.observe(document.querySelector("#k3form_embed"));
  }

  /** 監視対象要素の大きさが変わるたびに実行される関数 */
  function resizeHandler(entries) {
    target = $("#entry");
    position = target.offset().top - headerHeight - 60;
    speed = 400;

    $("html, body").animate({ scrollTop: position }, speed, "swing");
  }

  //目次系
  if ($(".contents__magazine--detail").length != 0) {
    let head3DOM = $(".contents__magazine--detail").find("h3"); // 全体からh3の数を取得する

    let targetH3ID = {};
    head3DOM.each(function (i) {
      let t = i + 1;

      $(this)
        .attr("id", "cb-h3-n" + t)
        .attr("class", "index-child");
      targetH3ID[i] = $(this).attr("id");
    });

    let head2DOM = $(".contents__magazine--detail").find("h2"); // 全体からh2の数を取得する
    let targetH2ID = {};
    let targetH2Text = {};
    let targetH3resID = {};
    let targetH3Text = {};
    if (head2DOM.length != 0) {
      head2DOM.each(function (i) {
        // 全てのh2に対して、上から順に連番IDを振り、h2タグ内にあるテキストを取得する
        let t = i + 1;

        $(this).attr("id", "cb-h2-n" + t);
        targetH2ID[i] = $(this).attr("id");
        targetH2Text[i] = $(this).text();

        if (head2DOM.length >= 10) {
          if (t < 10) {
            $("#index ol.page-index_first").append('<li id="listnum' + t + '" class="listitem"><a href="#' + targetH2ID[i] + '" class="linkline">' + targetH2Text[i] + "</a></li>");
          } else {
            $("#index ol.page-index_first").append('<li id="listnum' + t + '" class="listitem is-num"><a href="#' + targetH2ID[i] + '" class="linkline">' + targetH2Text[i] + "</a></li>");
          }
        } else {
          $("#index ol.page-index_first").append('<li id="listnum' + t + '" class="listitem"><a href="#' + targetH2ID[i] + '" class="linkline">' + targetH2Text[i] + "</a></li>");
        }

        let nextDOM = $("#" + targetH2ID[i]).nextUntil("h2");

        let parentList = 0;
        let ch = 0;
        for (let c = 0; c < nextDOM.length; c++) {
          if (nextDOM[c].className == "index-child") {
            // 第2インデックスが存在しない場合、作成する
            if (parentList == 0) {
              $("#listnum" + t).append('<ol class="page-index_second"></ol>');
              parentList = 1;
              targetH3resID = {};
              targetH3Text = {};
            }
            targetH3resID[ch] = nextDOM[c].id;
            targetH3Text[ch] = nextDOM[c].innerHTML;

            let n = ch + 1; // h3のナンバリング用変数（X-Y. タイトルタイトル の [Y]の部分）

            // h3で取得した内容を目次に追加する
            $("#listnum" + t + " ol.page-index_second").append('<li class="listitem"><a href="#' + targetH3resID[ch] + '" class="linkline">' + targetH3Text[ch] + "</a></li>");
            ch = ch + 1;
          }
        }
      });

      $("#index").addClass("visible");

      var links = $(".page-index_first a"); // 対象となるaタグを選択

      $(window).scroll(function () {
        var position = $(this).scrollTop() + $(this).height() / 2; // スクロール位置を取得
        links.each(function () {
          var target = $($(this).attr("href")); // href属性で指定された要素を取得

          if (target.position().top <= position) {
            // if (target.position().top <= position && target.position().top + target.height() > position) {
            links.parent().removeClass("current"); // 全てのaタグからcurrentクラスを削除
            $(this).parent().addClass("current"); // 該当するaタグにcurrentクラスを追加
          }
        });
      });
    } else {
      $("#index").hide();
    }

    let _index_flg = true;
    $("#index-btn").on("click", function () {
      _index_flg = !_index_flg;

      // 開く時
      if (_index_flg) {
        $("#index").addClass("opened");
        $(".page-index_first-wrap").slideDown(400);

        setTimeout(() => {
          $(".page-index_first").animate(
            {
              opacity: 1,
            },
            250,
            "swing"
          );
        }, 400);
      }

      // 閉じる時
      if (!_index_flg) {
        $(".page-index_first").animate(
          {
            opacity: 0,
          },
          250,
          "swing"
        );

        setTimeout(() => {
          $("#index").removeClass("opened");
          $(".page-index_first-wrap").slideUp(400);
        }, 250);
      }
    });

    $(window).on("load resize", function () {
      let _likeButtonPos = $(".likeButtonFloat").offset().top;
      let _likeButtonHeight = $(".likeButtonFloat").outerHeight();
      $("#index").css("top", _likeButtonPos + 244 + 16);

      if (window.matchMedia("(min-width: 1440px)").matches) {
        $("#index").addClass("opened");
        $(".page-index_first-wrap").show(0);
        $(".page-index_first").css("opacity", 1);
        _index_flg = true;
      } else {
        $("#index").removeClass("opened");
        $(".page-index_first-wrap").hide(0);
        $(".page-index_first").css("opacity", 0);
        _index_flg = false;
      }
    });

    // 記事内の目次の作成
    if (head2DOM.length != 0) {
      let _out_html = "";
      _out_html += '<div id="toc_container" class="no_bullets">';
      _out_html += '<p class="toc_title">';
      _out_html += '目次 <span class="toc_toggle">[<a href="#">hide</a>]</span>';
      _out_html += "</p>";

      _out_html += '<ul class="toc_list">';
      _out_html += "</ul>";
      _out_html += "</div>";

      $("#cb-h2-n1").before(_out_html);

      head2DOM.each(function (i) {
        // 全てのh2に対して、上から順に連番IDを振り、h2タグ内にあるテキストを取得する
        let t = i + 1;

        $(this).attr("id", "cb-h2-n" + t);
        targetH2ID[i] = $(this).attr("id");
        targetH2Text[i] = $(this).text();

        if (head2DOM.length >= 10) {
          if (t < 10) {
            $(document)
              .find("#toc_container ul.toc_list")
              .append('<li id="listnum' + t + '" class="listitem "><a href="#' + targetH2ID[i] + '" class="linkline">' + targetH2Text[i] + "</a></li>");
          } else {
            $(document)
              .find("#toc_container ul.toc_list")
              .append('<li id="listnum' + t + '" class="listitem is-num"><a href="#' + targetH2ID[i] + '" class="linkline">' + targetH2Text[i] + "</a></li>");
          }
        } else {
          $(document)
            .find("#toc_container ul.toc_list")
            .append('<li id="listnum' + t + '" class="listitem"><a href="#' + targetH2ID[i] + '" class="linkline">' + targetH2Text[i] + "</a></li>");
        }

        let nextDOM = $("#" + targetH2ID[i]).nextUntil("h2");

        let parentList = 0;
        let ch = 0;
        for (let c = 0; c < nextDOM.length; c++) {
          if (nextDOM[c].className == "index-child") {
            // 第2インデックスが存在しない場合、作成する
            if (parentList == 0) {
              $("#listnum" + t).append('<ul class="page-index_second"></ul>');
              parentList = 1;
              targetH3resID = {};
              targetH3Text = {};
            }
            targetH3resID[ch] = nextDOM[c].id;
            targetH3Text[ch] = nextDOM[c].innerHTML;

            let n = ch + 1; // h3のナンバリング用変数（X-Y. タイトルタイトル の [Y]の部分）

            // h3で取得した内容を目次に追加する
            $("#listnum" + t + " ul.page-index_second").append('<li class="listitem"><a href="#' + targetH3resID[ch] + '" class="linkline">' + targetH3Text[ch] + "</a></li>");
            ch = ch + 1;
          }
        }
      });

      $("#toc_container").addClass("visible");
    } else {
      $("#toc_container").hide();
    }

    $('.page-index_first a[href^="#"], #toc_container a[href^="#"]').click(function () {
      href = $(this).attr("href");
      headerHeight = $(".header").outerHeight();
      target = $(href == "#" || href == "" ? "html" : href);
      position = target.offset().top - headerHeight - 20;

      speed = 400;

      $("html, body").animate({ scrollTop: position }, speed, "swing");
      return false;
    });
  }

  if ($(".attention-wrap").length != 0) {
    var moveInterval = 1.5;
    let moveInterval_max = 6;

    var slideTime = 10;
    var loopWidth = $(".attention__wrap").outerWidth();

    timerLeft();

    function timerLeft() {
      setTimer = setInterval(function () {
        loopPositionLeft();
      }, 0);
    }

    function loopPositionLeft() {
      clearInterval(setTimer);
      $(".attention__wrap")
        .stop()
        .animate({ left: "-=" + moveInterval + "px" }, slideTime, "linear", function () {
          var posLeft = parseInt($(".attention__wrap").css("left"));
          var widthCal = (loopWidth / 2) * -1;

          if (posLeft < widthCal) {
            $(".attention__wrap").css({ left: "0" });
          }
          timerLeft();

          $(this).hover(
            function () {
              $(".attention__wrap").stop();
              clearInterval(setTimer);
            },
            function () {
              loopPositionLeft();
            }
          );
        });
    }

    $("#loopleft").on("mouseenter touchstart", function () {
      $(".attention__wrap").stop();
      clearInterval(setTimer);
      moveInterval = moveInterval_max;
      timerLeft();
    });
    $("#loopleft").on("mouseleave touchend", function () {
      moveInterval = 1.5;
    });

    function timerRight() {
      setTimer = setInterval(function () {
        loopPositionRight();
      }, 0);
    }

    function loopPositionRight() {
      clearInterval(setTimer);
      $(".attention__wrap")
        .stop()
        .animate({ left: "+=" + moveInterval + "px" }, slideTime, "linear", function () {
          var posLeft = parseInt($(".attention__wrap").css("left"));

          if (posLeft > 0) {
            $(".attention__wrap").css({ left: -loopWidth / 2 });
          }
          timerRight();

          $(this).hover(
            function () {
              $(".attention__wrap").stop();
              clearInterval(setTimer);
            },
            function () {
              loopPositionRight();
            }
          );
        });
    }

    $("#loopright").on("mouseenter touchstart", function () {
      $(".attention__wrap").stop();
      moveInterval = moveInterval_max;
      clearInterval(setTimer);
      timerRight();
    });

    $("#loopright").on("mouseleave touchend", function () {
      moveInterval = 1.5;
    });
  }

  if ($(".productList .productList__item").length != 0) {
    $(".productList .productList__item.hasCHild").on("mouseenter", function () {
      $(".frontBg").addClass("show");
      $(".sidebar__box--product").addClass("show");
    });
    $(".productList .productList__item.hasCHild").on("mouseleave", function () {
      $(".frontBg").removeClass("show");
      $(".sidebar__box--product").removeClass("show");
    });
  }

  // 製品カテゴリの目次
  if ($(".contents__prdcategory--detail").length != 0) {
    let head3DOM = $(".contents__prdcategory--detail .content").find("h3"); // 全体からh3の数を取得する

    let targetH3ID = {};
    head3DOM.each(function (i) {
      let t = i + 1;

      $(this).attr("id", "cb-h3-n" + t);
      // .attr("class", "index-child");
      targetH3ID[i] = $(this).attr("id");
    });

    let head2DOM = $(".contents__prdcategory--detail .content").find("h2"); // 全体からh2の数を取得する
    let targetH2ID = {};
    let targetH2Text = {};
    let targetH3resID = {};
    let targetH3Text = {};
    if (head2DOM.length != 0) {
      head2DOM.each(function (i) {
        // 全てのh2に対して、上から順に連番IDを振り、h2タグ内にあるテキストを取得する
        let t = i + 1;

        $(this).attr("id", "cb-h2-n" + t);
        targetH2ID[i] = $(this).attr("id");
        targetH2Text[i] = $(this).text();

        if (head2DOM.length >= 10) {
          if (t < 10) {
            $("#index ol.page-index_first").append('<li id="listnum' + t + '" class="listitem"><a href="#' + targetH2ID[i] + '" class="linkline">' + targetH2Text[i] + "</a></li>");
          } else {
            $("#index ol.page-index_first").append('<li id="listnum' + t + '" class="listitem is-num"><a href="#' + targetH2ID[i] + '" class="linkline">' + targetH2Text[i] + "</a></li>");
          }
        } else {
          $("#index ol.page-index_first").append('<li id="listnum' + t + '" class="listitem"><a href="#' + targetH2ID[i] + '" class="linkline">' + targetH2Text[i] + "</a></li>");
        }

        let nextDOM = $("#" + targetH2ID[i]).nextUntil("h2");

        let parentList = 0;
        let ch = 0;
        for (let c = 0; c < nextDOM.length; c++) {
          if (nextDOM[c].className == "index-child") {
            // 第2インデックスが存在しない場合、作成する
            if (parentList == 0) {
              $("#listnum" + t).append('<ol class="page-index_second"></ol>');
              parentList = 1;
              targetH3resID = {};
              targetH3Text = {};
            }
            targetH3resID[ch] = nextDOM[c].id;
            targetH3Text[ch] = nextDOM[c].innerHTML;

            let n = ch + 1; // h3のナンバリング用変数（X-Y. タイトルタイトル の [Y]の部分）

            // h3で取得した内容を目次に追加する
            // $("#listnum" + t + " ol.page-index_second").append('<li class="listitem"><a href="#' + targetH3resID[ch] + '" class="linkline">' + targetH3Text[ch] + "</a></li>");
            ch = ch + 1;
          }
        }
      });

      $("#index").addClass("visible");

      var links = $(".page-index_first a"); // 対象となるaタグを選択

      $(window).scroll(function () {
        var position = $(this).scrollTop() - $(this).height() / 2; // スクロール位置を取得
        // var position = $(this).scrollTop() + $(this).height() / 2; // スクロール位置を取得
        // console.log('position: ' + position);

        links.each(function () {
          var target = $($(this).attr("href")); // href属性で指定された要素を取得

          if (target.position().top <= position) {
            // if (target.position().top <= position && target.position().top + target.height() > position) {
            links.parent().removeClass("current"); // 全てのaタグからcurrentクラスを削除
            $(this).parent().addClass("current"); // 該当するaタグにcurrentクラスを追加
          }
        });
      });
    } else {
      $("#index").hide();
    }

    let _index_flg = true;
    $("#index-btn").on("click", function () {
      _index_flg = !_index_flg;

      // 開く時
      if (_index_flg) {
        $("#index").addClass("opened");
        $(".page-index_first-wrap").slideDown(400);

        setTimeout(() => {
          $(".page-index_first").animate(
            {
              opacity: 1,
            },
            250,
            "swing"
          );
        }, 400);
      }

      // 閉じる時
      if (!_index_flg) {
        $(".page-index_first").animate(
          {
            opacity: 0,
          },
          250,
          "swing"
        );

        setTimeout(() => {
          $("#index").removeClass("opened");
          $(".page-index_first-wrap").slideUp(400);
        }, 250);
      }
    });

    $(window).on("load resize", function () {
      if (window.matchMedia("(min-width: 1440px)").matches) {
        $("#index").addClass("opened");
        $(".page-index_first-wrap").show(0);
        $(".page-index_first").css("opacity", 1);
        _index_flg = true;
      } else {
        $("#index").removeClass("opened");
        $(".page-index_first-wrap").hide(0);
        $(".page-index_first").css("opacity", 0);
        _index_flg = false;
      }
    });

    // ページ内アンカーリンク
    let speed = 0;
    let href, target, position, headerHeight;
    $('.page-index a[href^="#"]').click(function () {
      href = $(this).attr("href");
      headerHeight = $(".header").outerHeight();
      target = $(href == "#" || href == "" ? "html" : href);

      let _scroll = $(window).scrollTop();

      if (Math.sign(target.offset().top - _scroll) === -1) {
        headerHeight = 150;
      } else {
        headerHeight = 78;
      }

      position = target.offset().top - headerHeight - 20;
      speed = 400;

      $("html, body").animate({ scrollTop: position }, speed, "swing");
      return false;
    });
  }

  if ($(".searchWord .btn_more").length != 0) {
    let _opend = false;
    $(".searchWord .btn_more").on("click", function () {
      var show_text = $(this).parent("").find("ul");
      var small_height = window.matchMedia("(max-width: 768px)").matches ? 96 : 80;
      var original_height = show_text.css({ height: "auto" }).height();

      if(_opend) {
        show_text.attr('style', '').height(original_height).animate({ height: small_height }, 300);
        $(".searchWord .btn_more span").html('もっと見る');
        $(".searchWord .btn_more").removeClass('opend');
      }
      else {
        show_text.height(small_height).animate({ height: original_height }, 300, function () {
          show_text.height("auto");
        });

        $(".searchWord .btn_more span").html('閉じる');
        $(".searchWord .btn_more").addClass('opend');
      }

      _opend = !_opend;
    });
  }
});
