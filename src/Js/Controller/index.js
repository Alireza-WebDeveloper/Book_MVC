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

const controllerLoadBookDetail = async (id = 1) => {
  try {
    await Model.loadingDataBookDetail(id);
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
    let parts = location.pathname.split('/');
    let id = parts[parts.length - 1];
    controllerLoadBookDetail(id);
  }
})();
