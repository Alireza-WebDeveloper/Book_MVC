class FavoriteView {
  _parElement = document.querySelector('.favorite_View');

  constructor() {
    this.data = [];
  }

  // Create Html Element
  _generateMarkUp() {
    return this.data
      .map((book) => {
        return ``;
      })
      .join('');
  }

  // Render
  _render(data) {
    this.data = data;
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
}

export default new FavoriteView();
