import * as Model from '../Model/index';
import BookView from '../View/BookView';
import HeaderView from '../View/HeaderView';
import BookDetailView from '../View/BookDetailView';
import BookSearchFormView from '../View/BookSearchFormView';
import { regexBookDetail } from '../../RegExr/BookDetail';
import FavoriteView from '../View/FavoriteView';
import Swal from 'sweetalert2';
import {
  updateBookAddFavorite,
  updateBookRemoveFavorite,
  updateBookWithFavoriteList,
} from '../Model/Book';
import {
  updateBookDetailAddFavorite,
  updateBookDetailRemoveFavorite,
  updateBookDetailWithFavoriteList,
} from '../Model/BookDetail';

// controller On BookView
const controllerLoadBook = async () => {
  try {
    await Model.loadingDataBook();
    FavoriteView._loadFavoriteWithLocalStorage();
    updateBookWithFavoriteList(FavoriteView.data);
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
    FavoriteView._loadFavoriteWithLocalStorage();
    updateBookDetailWithFavoriteList(FavoriteView.data);
    BookDetailView._render(Model.Store.bookDetail);
  } catch (error) {
    BookDetailView._renderError('همچین صفحه ای وجود ندارد');
  }
};

// Favorite
const controllerBookAddFavorite = (newBook) => {
  FavoriteView._addToFavorite(newBook);
  updateBookAddFavorite(newBook.id);
  BookView._render(Model.Store.bookSearch);
  BookView._successAlert('کتاب مورد علاقه شما اضافه شد');
};
const controllerBookRemoveFavorite = (newBook) => {
  FavoriteView._removeOfFavorite(newBook);
  updateBookRemoveFavorite(newBook.id);
  BookView._render(Model.Store.bookSearch);
  BookView._errorAlert('کتاب از لیست مورد علاقه حذف شد');
};

const controllerBookDetailAddFavorite = (newBook) => {
  FavoriteView._addToFavorite(newBook);
  updateBookDetailAddFavorite();
  BookDetailView._render(Model.Store.bookDetail);
  BookDetailView._successAlert('کتاب مورد علاقه شما اضافه شد');
};

const controllerBookDetailRemoveFavorite = (newBook) => {
  FavoriteView._removeOfFavorite(newBook);
  updateBookDetailRemoveFavorite();
  BookDetailView._render(Model.Store.bookDetail);
  BookDetailView._errorAlert('کتاب از لیست مورد علاقه حذف شد');
};

const controllerLoadFavorite = () => {
  FavoriteView._loadFavoriteWithLocalStorage();
  FavoriteView._render();
  FavoriteView._handleFavorite();
};

// initialLoad
const initialLoad = () => {
  HeaderView._render();
  HeaderView._LocalStorageLoadTheme();
  // Book Page
  if (location.pathname === '/') {
    controllerLoadBook();
    BookSearchFormView._render();
    BookSearchFormView._handlerSearchBook(controllerSearchBook);
    BookView._handlerAddToFavorite(controllerBookAddFavorite);
    BookView._handlerRemoveOfFavorite(controllerBookRemoveFavorite);
    // BookDetail Page
  } else if (location.pathname.match(regexBookDetail)) {
    let parts = location.pathname.split('/');
    let id = parts[parts.length - 1];
    controllerLoadBookDetail(id);
    BookDetailView._handlerAddToFavorite(controllerBookDetailAddFavorite);
    BookDetailView._handlerRemoveOfFavorite(controllerBookDetailRemoveFavorite);
    // Not Found Page
  } else if (location.pathname === '/favorite') {
    controllerLoadFavorite();
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
