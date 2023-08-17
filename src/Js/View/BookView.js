class BookView {
  _parElement = document.querySelector('.book_View');

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

        <a
          href="/book/${book.id}"
          class="px-5 w-fit py-2.5 rounded-lg text-lg bg-gray-50 dark:bg-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 flex gap-3 items-center"
        >
          <span>بخوانید</span>
          <span class="text-sm">◀</span>
        </a>
      </div>
    </section>`;
      })
      .join('');
  }

  // Render
  _render(data) {
    this.data = data;
    const renderHtml = this._generateMarkUp();
    this._parElement.innerHTML = `<h1>لیست کتاب های موجود</h1>
    <div
      class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5"
    >
    ${renderHtml}
      </section>`;
  }

  _clear() {
    this._parElement.innerHTML = '';
  }

  _empty(message = 'همچین کتابی وجود ندارد') {
    this._parElement.innerHTML = `<div class='p-2'>
    <p class='text-4xl capitalize text-center'>${message}</p>
    </div>`;
  }

  _renderError(message) {
    this._parElement.innerHTML = `<div class='flex justify-center items-center'>
     <p class='text-4xl'>${message}</p>
     </div>`;
  }
}

export default new BookView();
