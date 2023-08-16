class BookDetailView {
  _parElement = document.querySelector('.bookDetail_View');
  constructor() {
    this.data = {};
  }
  // Create Html Element
  _generateMarkUp() {
    return `<p>${this.data.id}</p>`;
  }
  // Render
  _render(data) {
    this.data = data;
    const renderHtml = this._generateMarkUp();
    this._parElement.insertAdjacentHTML(
      'beforeEnd',
      `
      <h1>اطلاعات کتاب</h1>
      <section>
      ${renderHtml}
     </section>
      `
    );
  }
  _clear() {
    this._parElement.innerHTML = '';
  }
}

export default new BookDetailView();
