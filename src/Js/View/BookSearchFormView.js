class BookSearchFormView {
  _parElement = document.querySelector('.bookSearchForm_View');
  constructor() {}
  // Create Html Element

  _generateMarkUp() {
    return `
    <input name='search' type="search"   class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="جست و جو نام کتاب ...">

     <button type="submit" class="text-white absolute h-full  left-0 top-0 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">جست و جو</button>
   
    `;
  }
  // Render
  _render() {
    const renderHtml = this._generateMarkUp();
    this._parElement.innerHTML = `${renderHtml}`;
  }

  _handlerSearchBook(handler) {
    this._parElement.addEventListener('submit', (e) => {
      e.preventDefault();
      let searchInput = this._parElement.querySelector('input');
      handler(searchInput.value);
      setTimeout(() => {
        searchInput.value = '';
      }, 200);
    });
  }
}

export default new BookSearchFormView();
