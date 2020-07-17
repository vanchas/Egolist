import React, { useState, useEffect } from "react";
import {connect, useDispatch} from "react-redux";
import FavDesires from "../components/favorites/FavDesires";
import FavOffers from "../components/favorites/FavOffers";
import {
  deleteFavorite,
  getUserFavoritePosts,
  sortFavoriteDesires,
  sortFavoriteOffers,
} from "../redux/actions/userActions";
import { getCities, showSuccess } from "../redux/actions/actions";
import { authenticationService } from "../_services/authentication.service";
import {SORT_FAVORITE_DESIRES, SORT_FAVORITE_OFFERS} from "../redux/actions/types";
import Alert from "../components/helpers/Alert";
import Success from "../components/helpers/Success";
import Router from "next/router";

function Favorites({
  showSuccess,
  getUserFavoritePosts,
  favoritePosts,
  locations,
  cities,
  getCities,
  deleteFavorite,
  sortFavoriteDesires,
  sortFavoriteOffers,
    success,
    alert
}) {
  const [visibleComponent, setVisibleComponent] = useState("desires");
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const [showPage, setShowPage] = useState(false)

  const changeVisibleComponent = (ref) => {
    setVisibleComponent(ref);
  };

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user.token && user.user) {
      setShowPage(true);
      getUserFavoritePosts(user.user.id);
      setUserId(user.user.id);
    } else {
      Router.push('/login')
    }
  }, []);

  const sortDesiresHandler = (userId, value) => {
    setLoading(true)
    dispatch({type: SORT_FAVORITE_DESIRES, payload: []})
    sortFavoriteDesires(userId, value)
  }

  const sortOffersHandler = (userId, value) => {
    setLoading(true)
    dispatch({type: SORT_FAVORITE_OFFERS, payload: []})
    sortFavoriteDesires(userId, value)
  }

  return (
    <div>{showPage && <>
    {alert && <Alert/>}
    {success && <Success />}
      <div>
      <span
      onClick={() => changeVisibleComponent("desires")}
      className={`mr-3 btn ${
          visibleComponent === "desires" ? "btn-dark" : "btn-secondary"
      }`}
      >
      Избранные желания
      </span>
      <span
      className={`btn ${
          visibleComponent === "desires" ? "btn-secondary" : "btn-dark"
      }`}
      onClick={() => changeVisibleComponent("offers")}
      >
      Избранные предложения
      </span>
      <label className="form-group float-right d-flex">
      <span className="mr-3">Сортировка</span>
      {visibleComponent === "desires" ? (
          <select className={`form-control`}
                  onChange={(e) => sortDesiresHandler(userId, e.target.value)}
          >
            <option value="default" hidden></option>
            <option value="price+">Цена от большей</option>
            <option value="price-">Цена от меньшей</option>
            <option value="priority_id+">Приоритет от срочного</option>
            <option value="priority_id-">Приоритет от не срочного</option>
          </select>
      ) : (
          <select className={`form-control`}
                  onChange={(e) => sortOffersHandler(userId, e.target.value)}
          >
            <option value="default" hidden></option>
            <option value="rating+">Рейтинг от большего</option>
            <option value="rating-">Рейтинг от меньшего</option>
            <option value="price+">Цена от большего</option>
            <option value="price-">Цена от меньшего</option>
          </select>
      )}
      </label>
      </div>
    {visibleComponent === "desires" ? (
      <FavDesires
      sortFavoriteDesires={sortFavoriteDesires}
      favoritePosts={favoritePosts}
      deleteFavorite={deleteFavorite}
      locations={locations}
      cities={cities}
      getCities={getCities}
      showSuccess={showSuccess}
      success={success}
      loading={loading}
      setLoading={setLoading}
      />
      ) : (
      <FavOffers
      sortFavoriteOffers={sortFavoriteOffers}
      favoritePosts={favoritePosts}
      deleteFavorite={deleteFavorite}
      showSuccess={showSuccess}
      success={success}
      loading={loading}
      setLoading={setLoading}
      />
      )}
    </>}</div>
  );
}

const mapStateToProps = (state) => ({
  favoritePosts: state.user.favoritePosts,
  locations: state.app.locations,
  cities: state.app.cities,
  success: state.app.success,
  alert: state.app.alert
});

const mapDispatchToProps = {
  getUserFavoritePosts,
  deleteFavorite,
  getCities,
  sortFavoriteDesires,
  sortFavoriteOffers,
  showSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
