import Swal from 'sweetalert2';
class FavoriteView {
  _parElement = document.querySelector('.favorite_View');

  constructor() {
    this.data = [];
  }

  // Create Html Element
  _generateMarkUp() {
    return this.data
      .map((book) => {
        return `<section class="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg space-y-2">
      <img
        src="${book.img}"
        class="w-full h-52 rounded-lg"
      />
      <div class="flex flex-col space-y-2">
        <p class="text-lg  font-semibold text-black dark:text-white">${
          book.name
        }</p>
        <p class="text-sm text-black dark:text-white">
          ${book.introduction.slice(0, 100)}
        </p>

       <div class='flex justify-between flex-wrap items-center'>
       <a
       href="/book/${book.id}"
       class="px-5 w-fit py-2.5 rounded-lg text-lg bg-gray-50 dark:bg-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 flex gap-3 items-center"
     >
       <span>بخوانید</span>
       <span class="text-sm">◀</span>
       </a>
       <button
       data-code="${book.id}"
       class="${
         book.favorite && book.favorite === true
           ? 'btn_removeFavorite'
           : 'btn_addFavorite'
       } px-2 w-fit py-1   text-sm hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full flex gap-3 items-center"
    >
      <span>${
        book.favorite && book.favorite === true
          ? ' <i class="fa-solid fa-bookmark fa-2x"></i>'
          : '<i class="fa-regular fa-bookmark fa-2x"></i>'
      }</span>
       </button>
       </div>
      </div>
    </section>`;
      })
      .join('');
  }

  // Render
  _render() {
    if (this.data.length === 0) {
      return this._empty();
    }
    const renderHtml = this._generateMarkUp();
    this._parElement.innerHTML = `<h1>لیست کتاب های مورد علاقه</h1>
      <div
        class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5"
      >
      ${renderHtml}
        </section>`;
  }

  _clear() {
    this._parElement.innerHTML = '';
  }

  _empty(message = 'هیچ کتابی اضافه نشده') {
    this._parElement.innerHTML = `<div class='p-2'>
      <p class='text-4xl capitalize text-center'>${message}</p>
      </div>`;
  }

  _renderError(message) {
    this._parElement.innerHTML = `<div class='flex justify-center items-center'>
       <p class='text-4xl'>${message}</p>
       </div>`;
  }

  _addToFavorite(newBook) {
    this.data = [...this.data, newBook];
    localStorage.setItem('favorite', JSON.stringify(this.data));
  }

  _removeOfFavorite(newBook) {
    this.data = this.data.filter((book) => book.id !== newBook.id);
    localStorage.setItem('favorite', JSON.stringify(this.data));
  }

  _loadFavoriteWithLocalStorage() {
    const dataOfFavorite = localStorage.getItem('favorite');
    if (dataOfFavorite) {
      this.data = JSON.parse(dataOfFavorite);
    }
  }

  _errorAlert(message = '') {
    Swal.fire({
      position: 'top-center',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 1000,
    });
  }

  _handleFavorite() {
    this._parElement.addEventListener('click', (e) => {
      let button = e.target.closest('.btn_removeFavorite');
      if (button) {
        let id = Number(button.dataset.code);
        let findBook = this.data.find((book) => book.id === id);
        this._removeOfFavorite({ ...findBook, favorite: false });
        this._render();
        this._errorAlert('کتاب از لیست مورد علاقه حذف شد');
      }
    });
  }
  _setTitlePage() {
    document.title = `علاقه مندی`;
  }
}

export default new FavoriteView();
