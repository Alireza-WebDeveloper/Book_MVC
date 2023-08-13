import * as Model from '../Model/index';
import BookView from '../View/BookView';

const controllerLoadBook = async () => {
  try {
    await Model.loadingDataBook();
    BookView._render(Model.Store.book);
  } catch (error) {
    alert(error.message);
  }
};

(() => {
  if (location.pathname === '/') {
    controllerLoadBook();
  }
})();
