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

const updateBookDetailAddFavorite = () => {
  Store.bookDetail.favorite = true;
};

const updateBookDetailRemoveFavorite = () => {
  Store.bookDetail.favorite = false;
};

const updateBookDetailWithFavoriteList = (favorites) => {
  favorites.forEach((favorite) => {
    if (Store.bookDetail.id === favorite.id) {
      Store.bookDetail.favorite = favorite.favorite;
    }
  });
};

export {
  loadingDataBookDetail,
  updateBookDetailAddFavorite,
  updateBookDetailRemoveFavorite,
  updateBookDetailWithFavoriteList,
};
