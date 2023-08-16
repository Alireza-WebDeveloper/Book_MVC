import { Store } from '.';
import { asyncGetBookDetail } from '../Helpers/Book';

const loadingDataBookDetail = async (id) => {
  try {
    const data = await asyncGetBookDetail(id);
    Store.bookDetail = data;
  } catch (error) {
    throw new Error(error.messsage);
  }
};

export { loadingDataBookDetail };
