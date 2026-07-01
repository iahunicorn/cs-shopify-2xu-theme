if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.form = this.querySelector('form');
        this.form.querySelector('[name=id]').disabled = false;
        this.updateCartButton(this.form);
        this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        this.cart =
          document.querySelector('cart-notification') ||
          document.querySelector('cart-drawer');
        this.submitButton = this.querySelector('[type="submit"]');
        if (document.querySelector('cart-drawer'))
          this.submitButton.setAttribute('aria-haspopup', 'dialog');
        const variants = document.querySelectorAll(
          'fieldset.product-form__input'
        );
        var submitButton = this.querySelector(
          '.product-form__submit[type="button"]'
        );
        if (!submitButton) {
          submitButton = this.querySelector(
            '.product-form__submit[type="submit"]'
          );
        }
        submitButton.addEventListener('click', function (evt) {
          variants.forEach((el) => {
            if (
              !el.querySelectorAll('input').length ||
              el.querySelectorAll('input:checked').length
            )
              el.classList.remove('required-error');
            else el.classList.add('required-error');
          });
        });
      }

      updateCartButton(form) {
        if (this.sizeSelected()) {
          form
            .querySelector('button[name=add]')
            .classList.remove('require-size');
        } else {
          form.querySelector('button[name=add]').classList.add('require-size');
        }
      }

      sizeSelected(evt) {
        var sizeOptions = document.querySelectorAll('input[name="Size"]');
        var isValid = false;
        sizeOptions.forEach(function (option) {
          if (option.checked) {
            isValid = true;
            return;
          }
        });
        return isValid;
      }
      onSubmitHandler(evt) {
        evt.preventDefault();
        if (
          document.querySelector('.product__info-container') &&
          document
            .querySelector('.product__info-container')
            .querySelector('.required-error')
        )
          return;
        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

        this.handleErrorMessage();

        this.submitButton.setAttribute('aria-disabled', true);
        this.submitButton.classList.add('loading');
        this.querySelector('.loading-overlay__spinner').classList.remove(
          'hidden'
        );

        const config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];

        const formData = new FormData(this.form);
        if (this.cart) {
          // formData.append('sections', this.cart.getSectionsToRender().map((section) => section.id));
          const sectionsToRender = this.cart
            .getSectionsToRender()
            .map((section) => section.id)
            .filter((value, index, array) => array.indexOf(value) === index);
          formData.append('sections', sectionsToRender);
          formData.append('sections_url', window.location.pathname);
          this.cart.setActiveElement(document.activeElement);
        }
        config.body = formData;

        fetch(`${routes.cart_add_url}`, config)
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              this.handleErrorMessage(response.description);

              const soldOutMessage =
                this.submitButton.querySelector('.sold-out-message');
              if (!soldOutMessage) return;
              this.submitButton.setAttribute('aria-disabled', true);
              this.submitButton.querySelector('span').classList.add('hidden');
              soldOutMessage.classList.remove('hidden');
              this.error = true;
              return;
            } else if (!this.cart) {
              window.location = window.routes.cart_url;
              return;
            }

            this.error = false;
            const quickAddModal = this.closest('quick-add-modal');
            if (quickAddModal) {
              document.body.addEventListener(
                'modalClosed',
                () => {
                  setTimeout(() => {
                    this.cart.renderContents(response);
                  });
                },
                { once: true }
              );
              quickAddModal.hide(true);
            } else {
              this.cart.renderContents(response);
            }
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.submitButton.classList.remove('loading');
            if (this.cart && this.cart.classList.contains('is-empty'))
              this.cart.classList.remove('is-empty');
            if (!this.error) this.submitButton.removeAttribute('aria-disabled');
            this.querySelector('.loading-overlay__spinner').classList.add(
              'hidden'
            );
          });
      }

      handleErrorMessage(errorMessage = false) {
        this.errorMessageWrapper =
          this.errorMessageWrapper ||
          this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage =
          this.errorMessage ||
          this.errorMessageWrapper.querySelector(
            '.product-form__error-message'
          );

        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }
    }
  );
}
