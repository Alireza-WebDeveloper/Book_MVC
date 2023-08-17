import * as Model from '../Model/index';
import BookView from '../View/BookView';
import HeaderView from '../View/HeaderView';
import BookDetailView from '../View/BookDetailView';
import BookSearchFormView from '../View/BookSearchFormView';
import { regexBookDetail } from '../../RegExr/BookDetail';

const controllerLoadBook = async () => {
  try {
    await Model.loadingDataBook();
    BookView._render(Model.Store.bookSearch);
  } catch (error) {
    BookView._renderError(error.message);
  }
};

const controllerSearchBook = (query = '') => {
  Model.searchDataBook(query);
  if (Model.Store.bookSearch.length <= 0) BookView._empty();
  else BookView._render(Model.Store.bookSearch);
};

const controllerLoadBookDetail = async (id = 1) => {
  try {
    await Model.loadingDataBookDetail(id);
    BookDetailView._render(Model.Store.bookDetail);
  } catch (error) {
    BookDetailView._renderError('همچین صفحه ای وجود ندارد');
  }
};

const initialLoad = () => {
  HeaderView._render();
  HeaderView._LocalStorageLoadTheme();
  if (location.pathname === '/') {
    controllerLoadBook();
    BookSearchFormView._render();
    BookSearchFormView._handlerSearchBook(controllerSearchBook);
  } else if (location.pathname.match(regexBookDetail)) {
    let parts = location.pathname.split('/');
    let id = parts[parts.length - 1];
    controllerLoadBookDetail(id);
  } else {
    alert('همچین صفحه ای وجود ندارد');
    setTimeout(() => {
      location.pathname = '/';
    }, 0);
  }
};

initialLoad();
