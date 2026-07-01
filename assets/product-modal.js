if (!customElements.get('product-modal')) {
  customElements.define('product-modal', class ProductModal extends ModalDialog {
    constructor() {
      super();
    }

    hide() {
      super.hide();
    }

    show(opener) {
      super.show(opener);
      this.showActiveMedia();
    }

    showActiveMedia() {
      this.querySelectorAll(`[data-media-id]:not([data-media-id="${this.openedBy.getAttribute("data-media-id")}"])`).forEach((element) => {
          element.classList.remove('active');
        }
      )
      const activeMedia = this.querySelector(`[data-media-id="${this.openedBy.getAttribute("data-media-id")}"]`);
      const activeMediaTemplate = activeMedia.querySelector('template');
      const activeMediaContent = activeMediaTemplate ? activeMediaTemplate.content : null;
      activeMedia.classList.add('active');
      activeMedia.scrollIntoView();

      const container = this.querySelector('[role="document"]');
      container.scrollLeft = (activeMedia.width - container.clientWidth) / 2;

      if (activeMedia.nodeName == 'DEFERRED-MEDIA' && activeMediaContent && activeMediaContent.querySelector('.js-youtube'))
        activeMedia.loadContent();
    }
  });
}

if (!customElements.get('product-main-modal')) {
  customElements.define('product-main-modal', class ProductModal extends ModalDialog {
    constructor() {
      super();
      this.slider = this.querySelector('.swiper--product--media');
      let _this = this;
      document.addEventListener('keydown', function(event) {
        _this.zoomEvent(event);
      });
    }

    hide() {
      super.hide();
      this.slider.swiper.scale = 1;
      this.querySelector('.swiper-slide-active').classList.remove('swiper-slide-zoomed');
    }

    show(opener) {
      super.show(opener);
      if (this.slider.swiper) {
        this.slider.swiper.destroy(true, true);
        this.initSlide();
      } else {
        this.initSlide();
      }
      this.showActiveMedia();
    }

    initSlide() {
      // eslint-disable-next-line no-new
      new window.Swiper(this.slider, {
        navigation: {
          nextEl: '.product-media-modal__dialog .swiper-button-next',
          prevEl: '.product-media-modal__dialog .swiper-button-prev'
        },
        zoom: {
          minRatio: 1,
          maxRatio: 2
        },
        breakpoints: {
          1024: {
            slidesPerView: 1,
            allowTouchMove: false,
          }
        },
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        }
      })
    }

    showActiveMedia() {
     
      this.querySelectorAll(`[data-media-id]:not([data-media-id="${this.openedBy.getAttribute("data-media-id")}"])`).forEach((element) => {
          element.classList.remove('active');
        }
      )
      const activeMedia = this.querySelector(`[data-media-id="${this.openedBy.getAttribute("data-media-id")}"]`);

      var indexSlideActive = Array.from(document.querySelectorAll('.swiper-slide[data-media-id]')).indexOf(activeMedia);

      this.slider.swiper.slideTo(indexSlideActive, 200, true );

      const activeMediaTemplate = activeMedia.querySelector('template');
      const activeMediaContent = activeMediaTemplate ? activeMediaTemplate.content : null;
      activeMedia.classList.add('active');
      

      const container = this.querySelector('[role="document"]');
      container.scrollLeft = (activeMedia.width - container.clientWidth) / 2;

      if (activeMedia.nodeName == 'DEFERRED-MEDIA' && activeMediaContent && activeMediaContent.querySelector('.js-youtube'))
        activeMedia.loadContent();
    }
    zoomEvent(event) {
      const key = event.key;
      switch (event.key) {
        case "ArrowUp":
          this.slider.swiper.zoom.in();
          break;
        case "ArrowDown":
          this.slider.swiper.zoom.out();
          break;
      }
    }
  });
}
