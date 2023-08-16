import * as Model from '../Model/index';
import BookView from '../View/BookView';
import HeaderView from '../View/HeaderView';
import BookDetailView from '../View/BookDetailView';
import { regexBookDetail } from '../../RegExr/BookDetail';
const controllerLoadBook = async () => {
  try {
    await Model.loadingDataBook();
    BookView._render(Model.Store.book);
  } catch (error) {
    alert(error.message);
  }
};

const controllerLoadBookDetail = async (id) => {
  try {
    await Model.loadingDataBookDetail(1);
    BookDetailView._render(Model.Store.bookDetail);
  } catch (error) {
    alert(error.message);
  }
};

(() => {
  HeaderView._render();
  HeaderView._LocalStorageLoadTheme();

  if (location.pathname === '/') {
    controllerLoadBook();
  }
  if (location.pathname.match(regexBookDetail)) {
    controllerLoadBookDetail();
  }
})();
