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

export { loadingDataBook, searchDataBook };
