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
    let theme = this._theme();

    return `<div class="flex flex-wrap justify-between p-3 items-center">
      <section class="flex space-x-4">
        <a
          href="/"
          class="px-5 py-2.5 rounded-lg text-2xl hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          خانه
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
    <section class="relative h-[80vh] flex justify-evenly items-center flex-wrap bg-gray-50 dark:bg-gray-900" id='banner'>
    <img
    src="${this.data.banner.img}"
    alt="banner"
    class="h-80 w-80 object-fill"
    />
     <p class='md:text-6xl text-4xl text-center animate-bounce'>معرفی جدید ترین کتاب ها</p> 
    </section>`;
  }
  // Render
  _render() {
    const renderHtml = this._generateMarkUp();
    this._parElement.insertAdjacentHTML('beforeEnd', renderHtml);
  }
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
  _LocalStorageSaveTheme(value) {
    localStorage.setItem('theme', JSON.stringify(value));
  }
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
  _theme() {
    const storedTheme = JSON.parse(localStorage.getItem('theme'));
    if (storedTheme === 'dark') {
      return 'dark';
    }
    return 'light';
  }
  _updateThemeIcon(value) {
    let toggle_Theme = this._parElement.querySelector('.toggle_Theme');
    if (value === 'light') {
      toggle_Theme.innerHTML = `<i class="fa fa-sun text-4xl"></i>`;
    } else {
      toggle_Theme.innerHTML = `<i class="fa fa-moon text-4xl"></i>`;
    }
  }
  _clear() {
    this._parElement.innerHTML = '';
  }
}

export default new HeaderView();
