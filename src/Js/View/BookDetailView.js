import Swal from 'sweetalert2';
class BookDetailView {
  _parElement = document.querySelector('.bookDetail_View');
  constructor() {
    this.data = {};
  }
  _generateAbout() {
    return this.data.about
      .map((dt) => {
        return `<p class='text-lg'>${dt.description}</p>`;
      })
      .join('');
  }
  _generatePrintVersion() {
    return this.data.version.print
      .map((pr) => {
        return `<button class='px-3 py-1.5 flex items-center gap-2 rounded-lg text-xl bg-gray-300 dark:bg-gray-700'>
        <span>${pr.type} : </span>
        <span>${pr.description}</span>
        </button>`;
      })
      .join('');
  }
  // Create Html Element
  _generateMarkUp() {
    return `
    <section class='grid grid-cols-1 gap-10 p-3 rounded-md bg-gray-100 dark:bg-gray-800'>
    <div class='grid lg:grid-cols-3  grid-cols-1 gap-2'>
    <section>
     <img src='${this.data.img}' class='lg:h-80 h-96 w-full rounded-md'/>
     </section>
     <section class='flex flex-col space-y-4 p-1 '>
    <div>
    <button
     data-code="${this.data.id}"
     class="${
       this.data.favorite && this.data.favorite === true
         ? 'btn_removeFavorite'
         : 'btn_addFavorite'
     } px-2 w-fit py-1 mr-auto   text-sm hover:bg-gray-50 dark:hover:bg-gray-900  rounded-full flex gap-3 items-center"
   >
     <span>${
       this.data.favorite && this.data.favorite === true
         ? '<i class="fa-solid fa-bookmark fa-2x"></i>'
         : '<i class="fa-regular fa-bookmark fa-2x"></i>'
     }</span>
     </button>
    </div>
     <h1 class='text-4xl font-bold'>${this.data.name}</h1>
     <div class='flex flex-col space-y-3'>
     <article class='flex items-center'>
     <span class='text-xl font-semibold'>نویسنده :  </span>
     <span class='text-lg'>${this.data.author}</span>
     </article>
     <article class='flex  items-center'>
     <span class='text-xl font-semibold'>مترجم :  </span>
     <span class='text-lg'>${this.data.translator}</span>
     </article>
     <article class='flex  items-center'>
     <span class='text-xl font-semibold'>انتشارات :  </span>
     <span class='text-lg'>${this.data.announcer}</span>
     </article>
     </div>
     </section>
     <div class='shadow-lg shadow-black rounded-lg p-2 flex flex-col'>
     <h1 class='text-4xl font-bold text-center'>چاپ</h1>
     <span class='h-1 bg-gray-300 w-full mt-3'></span>
     <section class='flex flex-wrap gap-3 p-2'>
     ${this._generatePrintVersion()}
     </section>
     </div>
    </div>
    <div class='flex flex-col space-y-10'>
     <section class='flex flex-col space-y-4'>
     <h1 class='text-2xl font-bold'>معرفی کتاب ${this.data.name}</h1>
     <p class='text-lg'>${this.data.introduction}</p>
     </section>
     <section class='flex flex-col space-y-4'>
     <h1 class='text-2xl font-bold'> درباره کتاب ${this.data.name}</h1>
      ${this._generateAbout()}
     </section>
    </div>
    </section>`;
  }
  // Render
  _render(data) {
    this.data = data;
    const renderHtml = this._generateMarkUp();
    this._parElement.innerHTML = `${renderHtml}`;
  }
  _clear() {
    this._parElement.innerHTML = '';
  }
  _renderError(message) {
    this._parElement.innerHTML = `<div class='flex justify-center items-center'>
     <p class='text-4xl'>${message}</p>
     </div>`;
  }
  _handlerAddToFavorite(handler) {
    this._parElement.addEventListener('click', (e) => {
      let button = e.target.closest('.btn_addFavorite');
      if (button) {
        handler({ ...this.data, favorite: true });
      }
    });
  }
  _handlerRemoveOfFavorite(handler) {
    this._parElement.addEventListener('click', (e) => {
      let button = e.target.closest('.btn_removeFavorite');
      if (button) {
        handler({ ...this.data, favorite: false });
      }
    });
  }
  _successAlert(message = '') {
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1000,
    });
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
}

export default new BookDetailView();
