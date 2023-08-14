class HeaderView {
  _parElement = document.querySelector('#header');
  constructor() {
    this.data = {
      banner: {
        img: 'https://img.freepik.com/free-photo/front-view-books-with-white-background_23-2148255835.jpg?w=740&t=st=1692018645~exp=1692019245~hmac=ed654b668f3d60b9782be8d2f975745e010028c91c137fccb9d171c7a47a1b49',
      },
    };
  }
  // Create Html Element
  _generateMarkUp() {
    return `<div class="flex flex-wrap justify-between p-3">
      <section class="flex space-x-4">
        <a
          href="/"
          class="px-5 py-2.5 rounded-lg text-xl hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          خانه
        </a>
      </section>
    </div>
    <section class="relative" id='banner'>
      <img
        src="${this.data.banner.img}"
        alt="banner"
        class="h-[80vh] w-full object-fill"
      />
     <div class='absolute top-0 w-full h-full flex justify-center items-center'>
     <p class='  md:text-6xl text-4xl text-center animate-bounce'>معرفی جدید ترین کتاب ها</p></div>
    </section>`;
  }
  // Render
  _render() {
    const renderHtml = this._generateMarkUp();
    this._parElement.insertAdjacentHTML('beforeEnd', renderHtml);
  }

  _clear() {
    this._parElement.innerHTML = '';
  }
}

export default new HeaderView();
