import { Store } from '../Model/index';
import { asyncGetBook } from '../Helpers/Book';

const loadingDataBook = async () => {
  try {
    const data = await asyncGetBook();
    Store.book = data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { loadingDataBook };
