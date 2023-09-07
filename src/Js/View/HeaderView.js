class HeaderView {
  _parElement = document.querySelector('#header');

  constructor() {
    this.data = {
      banner: {
        img: 'https://clipart-library.com/images_k/book-transparent-background/book-transparent-background-13.png',
      },
    };
    this._parElement.addEventListener('click', this._changeTheme.bind(this));
  }

  // Create Html Element
  _generateMarkUp() {
    return `<div class="flex flex-wrap w-full   md:justify-between justify-around p-3 fixed top-0 z-50  items-center
    inset-x-0  backdrop-filter  dark:backdrop-brightness-50 backdrop-blur-[8px]
    ">
      <section class="flex space-x-4">
        <a
          href="/"
          class="px-5 py-2.5 rounded-lg text-2xl hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          خانه
        </a>
        <a
        href="/favorite"
        class="px-5 py-2.5 rounded-lg text-2xl hover:bg-gray-200 dark:hover:bg-gray-800"
      >
       علاقه مندی
      </a>
      </section>
       <section class='cursor-pointer toggle_Theme'>
      ${
        this._theme() === 'dark'
          ? ` <i class="fa fa-moon text-4xl"></i>`
          : ` <i class="fa fa-sun text-4xl"></i>`
      }
       </section>
    </div>
    <section class="relative  mt-20 p-2 bg-gray-50  flex justify-evenly items-center flex-wrap dark:bg-gray-800" id='banner'>
    <img
    src="${this.data.banner.img}"
    alt="banner"
    class="md:w-[200px] md:h-[200px] w-[150px] h-[150px] object-fill"
    />
     <p class='md:text-3xl hidden md:flex text-lg text-center animate-bounce'>
     با داستان‌های انگیزشی کتاب، به دنبال تغییرات بزرگ در زندگی خود بگردید
     </p> 
     <p class='md:text-3xl md:hidden flex text-lg text-center animate-bounce'>
     سفری به دنیای اشتیاق و ماجراجویی
     </p> 
    </section>`;
  }

  // Render
  _render() {
    const renderHtml = this._generateMarkUp();
    this._parElement.insertAdjacentHTML('beforeEnd', renderHtml);
  }

  // Update Theme Icon
  _updateThemeIcon(value) {
    let toggle_Theme = this._parElement.querySelector('.toggle_Theme');
    if (value === 'light') {
      toggle_Theme.innerHTML = `<i class="fa fa-sun text-4xl"></i>`;
    } else {
      toggle_Theme.innerHTML = `<i class="fa fa-moon text-4xl"></i>`;
    }
  }

  // Save Theme On LocalStorage
  _LocalStorageSaveTheme(value) {
    localStorage.setItem('theme', JSON.stringify(value));
  }

  // Load Theme Of LocalStorage Run On Controller
  _LocalStorageLoadTheme() {
    const storedTheme = JSON.parse(localStorage.getItem('theme'));
    const htmlDom = document.querySelector('html');
    if (storedTheme === 'dark') {
      htmlDom.classList.remove('light');
      htmlDom.classList.add('dark');
    } else {
      htmlDom.classList.remove('dark');
      htmlDom.classList.add('light');
    }
  }

  // Change Theme
  _changeTheme(e) {
    if (e.target.closest('.toggle_Theme')) {
      const htmlDom = document.querySelector('html');
      if (htmlDom.className.includes('light')) {
        htmlDom.classList.remove('light');
        htmlDom.classList.add('dark');
        this._LocalStorageSaveTheme('dark');
        this._updateThemeIcon('dark');
      } else {
        htmlDom.classList.remove('dark');
        htmlDom.classList.add('light');
        this._LocalStorageSaveTheme('light');
        this._updateThemeIcon('light');
      }
    }
  }

  // Return Value Theme
  _theme() {
    const storedTheme = JSON.parse(localStorage.getItem('theme'));
    if (storedTheme === 'dark') {
      return 'dark';
    }
    return 'light';
  }

  _clear() {
    this._parElement.innerHTML = '';
  }
}

export default new HeaderView();
