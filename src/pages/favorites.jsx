import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import FavDesires from "../components/favorites/FavDesires";
import FavOffers from "../components/favorites/FavOffers";
import {
  deleteFavorite,
  getUserFavoritePosts,
  sortFavoriteDesires,
  sortFavoriteOffers,
} from "../redux/actions/userActions";
import {
  getCities,
  showSuccess,
  getSortingValues,
  getCurrencies,
} from "../redux/actions/appActions";
import { authenticationService } from "../_services/authentication.service";
import {
  SORT_FAVORITE_DESIRES,
  SORT_FAVORITE_OFFERS,
} from "../redux/actions/types";
import Router from "next/router";
import s from "../components/favorites/fav.module.scss";
import FavoritePageControl from "../components/favorites/FavoritePageControl";

function Favorites({
  getUserFavoritePosts,
  deleteFavorite,
  sortFavoriteDesires,
  sortFavoriteOffers,
  sortingValues,
  getSortingValues,
  favoriteDesires,
  favoriteOffers,
  getCurrencies,
}) {
  const [visibleComponent, setVisibleComponent] = useState("desires");
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showPage, setShowPage] = useState(false);

  const changeVisibleComponent = (ref) => {
    setVisibleComponent(ref);
  };

  const showPageResolver = () => {
    const user = authenticationService.currentUserValue;
    if (user.token && user.user) {
      setShowPage(true);
      getUserFavoritePosts(user.user.id);
      setUserId(user.user.id);
    } else {
      Router.push("/login");
    }
  };

  useEffect(() => {
    getCurrencies();
    getSortingValues();
    showPageResolver();
  }, []);

  const sortDesiresHandler = (userId, value) => {
    setLoading(true);
    dispatch({ type: SORT_FAVORITE_DESIRES, payload: [] });
    sortFavoriteDesires(userId, value);
  };

  const sortOffersHandler = (userId, value) => {
    setLoading(true);
    dispatch({ type: SORT_FAVORITE_OFFERS, payload: [] });
    sortFavoriteOffers(userId, value);
  };

  return (
    <div className={s.favorites_page}>
      {showPage && (
        <>
          <FavoritePageControl
            visibleComponent={visibleComponent}
            changeVisibleComponent={changeVisibleComponent}
            sortDesiresHandler={sortDesiresHandler}
            sortOffersHandler={sortOffersHandler}
            sortingValues={sortingValues}
            userId={userId}
          />
          {visibleComponent === "desires" ? (
            <FavDesires
              favoriteDesires={favoriteDesires}
              deleteFavorite={deleteFavorite}
              loading={loading}
              setLoading={setLoading}
            />
          ) : (
            <FavOffers
              favoriteOffers={favoriteOffers}
              deleteFavorite={deleteFavorite}
              loading={loading}
              setLoading={setLoading}
            />
          )}
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  favoriteDesires: state.user.favoriteDesires,
  favoriteOffers: state.user.favoriteOffers,
  sortingValues: state.app.sortingValues,
});

const mapDispatchToProps = {
  getUserFavoritePosts,
  deleteFavorite,
  getCities,
  sortFavoriteDesires,
  sortFavoriteOffers,
  showSuccess,
  getSortingValues,
  getCurrencies,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
