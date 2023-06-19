(function () {

  const myOffcanvas = document.querySelector('.offcanvas')
  const bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
  let draggie = new Draggabilly('.draggie-btn', {
    axis: 'y',
    //未指定就是上一層
    containment: true,
    // containment: '.draggie'
  });
  draggie.on('staticClick', function () {
    // console.log('staticClick');
    bsOffcanvas.show()
  });

  // 頁面載入後，先自動開啟一次Modal
  window.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      openNews()
    })
  })

  function openNews() {
    const news = document.querySelector('#news');
    const newsModal = new bootstrap.Modal(document.getElementById('iframeModal'));
    const newsPage = document.querySelector('#iframePage');

    newsModal.show();

    function onModalShown() {
      let newsSrc = news.dataset.src;
      newsPage.src = `${newsSrc}`;
      console.log(newsSrc);

      // 移除監聽事件
      newsModal._element.removeEventListener('shown.bs.modal', onModalShown);
    }

    // 添加監聽事件
    newsModal._element.addEventListener('shown.bs.modal', onModalShown);
  }


  // 在iframe開啟指定頁面
  let iframeSrc;
  const iframeBtns = document.querySelectorAll('.iframe-btn');
  const iframeModal = document.querySelector('#iframeModal');
  const iframePage = document.querySelector('#iframePage');

  iframeBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      iframeSrc = this.dataset.src;
      console.log(iframeSrc)
    });
  });

  iframeModal.addEventListener('shown.bs.modal', function () {
    iframePage.src = `${iframeSrc}`;
  });

  iframeModal.addEventListener('hide.bs.modal', function () {
    iframePage.src = '';
  });

  //顯示禮包碼的區塊
  const gameGifts = document.querySelectorAll('.game-gift');
  gameGifts.forEach((gameGift) => {
    let btnOpen = gameGift.querySelector('.btnOpen');
    if (btnOpen) {
      btnOpen.addEventListener('click', function () {
        this.classList.add('d-none');

        const gameGiftElement = this.closest('.game-gift').querySelector('.gift-number');
        gameGiftElement.classList.remove('d-none')

        const copyButton = gameGiftElement.querySelector('button')
        let copyText = gameGiftElement.querySelector('p')
        let copyInput = gameGiftElement.querySelector('input')

        //複制序號
        copyButton.addEventListener("click", (e) => {
          window.getSelection().selectAllChildren(copyText); //選取元素內的文字
          // copyInput.select(); //input等輸入元素才使用.select()
          document.execCommand("copy"); //複製選取內容
          e.target.classList.add('active')
          // console.log(e.target)
          window.getSelection().removeAllRanges(); //取消選取
          setTimeout(function () {
            e.target.classList.remove('active');
          }, 1500);
        });

      });
    }

  });

  //全螢幕切換
  const fullscreen = document.querySelector('#fullscreen')
  fullscreen.addEventListener('click', toggleFullScreen)

  function toggleFullScreen() {
    if (!document.fullscreenElement &&  // 不在全螢幕模式下
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement) {  // 確認瀏覽器支援全螢幕
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();  // 全螢幕模式
        bsOffcanvas.hide()
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();  // IE11全螢幕模式
        bsOffcanvas.hide()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();  // Firefox全螢幕模式
        bsOffcanvas.hide()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);  // Chrome和Safari全螢幕模式
        bsOffcanvas.hide()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();  // 退出全螢幕
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();  // IE11退出全螢幕
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();  // Firefox退出全螢幕
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();  // Chrome和Safari退出全螢幕
      }
    }
  }

})();
//# sourceMappingURL=script.js.map
