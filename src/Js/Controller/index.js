import * as Model from '../Model/index';
import BookView from '../View/BookView';
import HeaderView from '../View/HeaderView';
const controllerLoadBook = async () => {
  try {
    await Model.loadingDataBook();
    BookView._render(Model.Store.book);
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
})();
