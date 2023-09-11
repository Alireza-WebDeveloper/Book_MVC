import Swiper from 'swiper';
import 'swiper/swiper.min.css';
class BookCarouselView {
  constructor() {
    this.data = [];
    this._parElement = document.querySelector('.bookCarousel_View');
    this.swiper = null; // نمونه Swiper
  }

  _generateMarkUp() {
    return `
      <div class="swiper-container">
        <div class="swiper-wrapper gap-3">
          ${this.data
            .map(
              (item) => `  
            <section class="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg space-y-2 swiper-slide"> 
            <a href='/book/${item.id}'>   
              <img
                src="${item.img}"
                class="w-full h-60 rounded-lg"
              />
              </a>
            </section>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  _render(data) {
    this.data = data;
    const renderHtml = this._generateMarkUp();
    this._parElement.innerHTML = renderHtml; // تغییر اینجا

    // ایجاد اسلایدر Swiper
    this.swiper = new Swiper('.swiper-container', {
      // تنظیمات Swiper به دلخواه شما
      slidesPerView: 3,
      spaceBetween: 2,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 500,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 1,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 1,
        },
        // تنظیمات برای وضعیت‌های مختلف صفحه
        0: {
          slidesPerView: 1,
          spaceBetween: 1,
        },
      },
    });
  }
}

export default new BookCarouselView();
