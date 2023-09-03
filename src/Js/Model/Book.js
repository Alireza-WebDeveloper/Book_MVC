import { Store } from '../Model/index';
import { asyncGetBook } from '../Helpers/Book';

const loadingDataBook = async () => {
  try {
    const data = await asyncGetBook();
    Store.book = data;
    Store.bookSearch = data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const searchDataBook = (query) => {
  const filter = Store.book.filter((book) => book.name.includes(query));
  Store.bookSearch = filter;
};

const updateBookAddFavorite = (bookId) => {
  const findBook = Store.book.find((book) => book.id === bookId);
  findBook.favorite = true;
};

const updateBookRemoveFavorite = (bookId) => {
  const findBook = Store.book.find((book) => book.id === bookId);
  findBook.favorite = false;
};

const updateBookWithFavoriteList = (favorites) => {
  Store.book.forEach((book) => {
    favorites.forEach((favorite) => {
      if (book.id === favorite.id) {
        book.favorite = favorite.favorite;
      }
    });
  });
  Store.bookSearch = Store.book;
};

export {
  loadingDataBook,
  searchDataBook,
  updateBookAddFavorite,
  updateBookRemoveFavorite,
  updateBookWithFavoriteList,
};
