import * as Model from '../Model/index';
import BookView from '../View/BookView';
import HeaderView from '../View/HeaderView';
import BookDetailView from '../View/BookDetailView';
import BookSearchFormView from '../View/BookSearchFormView';
import { regexBookDetail } from '../../RegExr/BookDetail';
import FavoriteView from '../View/FavoriteView';
import Swal from 'sweetalert2';
import { updateBookAddFavorite, updateBookRemoveFavorite } from '../Model/Book';

// controller On BookView
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

// Controller On BookDetail View
const controllerLoadBookDetail = async (id = 1) => {
  try {
    await Model.loadingDataBookDetail(id);
    BookDetailView._render(Model.Store.bookDetail);
  } catch (error) {
    BookDetailView._renderError('همچین صفحه ای وجود ندارد');
  }
};

// Favorite
const controllerAddToFavorite = (newBook) => {
  FavoriteView._addToFavorite(newBook);
  updateBookAddFavorite(newBook.id);
  BookView._render(Model.Store.book);
};
const controllerRemoveOfFavorite = (newBook) => {
  FavoriteView._removeOfFavorite(newBook);
  updateBookRemoveFavorite(newBook.id);
  BookView._render(Model.Store.book);
};

const controllerLoadFavorite = () => {};

// initialLoad
const initialLoad = () => {
  HeaderView._render();
  HeaderView._LocalStorageLoadTheme();
  // Book Page
  if (location.pathname === '/') {
    controllerLoadBook();
    BookSearchFormView._render();
    BookSearchFormView._handlerSearchBook(controllerSearchBook);
    BookView._handlerAddToFavorite(controllerAddToFavorite);
    BookView._handlerRemoveOfFavorite(controllerRemoveOfFavorite);
    // BookDetail Page
  } else if (location.pathname.match(regexBookDetail)) {
    let parts = location.pathname.split('/');
    let id = parts[parts.length - 1];
    controllerLoadBookDetail(id);
    // Not Found Page
  } else if (location.pathname === '/favorite') {
    FavoriteView._render([]);
  } else {
    Swal.fire({
      text: 'همچین صفحه ای وجود ندارد',
      icon: 'error',
      confirmButtonColor: 'red',
      confirmButtonText: 'Ok',
      allowOutsideClick: false,
      allowEnterKey: true,
      backdrop: 'black',
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          location.pathname = '';
        }, 100);
      }
    });
  }
};

initialLoad();
