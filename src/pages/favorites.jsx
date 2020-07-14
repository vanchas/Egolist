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
    success
}) {
  const [visibleComponent, setVisibleComponent] = useState("desires");
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);

  const changeVisibleComponent = (ref) => {
    setVisibleComponent(ref);
  };

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user.token) {
      getUserFavoritePosts(user.user.id);
      setUserId(user.user.id);
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
    <div>
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
              <option value="price+">Price from big to small</option>
              <option value="price-">Price from small to big</option>
              <option value="priority_id+">Priority from big to small</option>
              <option value="priority_id-">Priority from small to big</option>
            </select>
          ) : (
            <select className={`form-control`}
              onChange={(e) => sortOffersHandler(userId, e.target.value)}
            >
              <option value="default" hidden></option>
              <option value="rating+">Rating from big to small</option>
              <option value="rating-">Rating from small to big</option>
              <option value="price+">Price from big to small</option>
              <option value="price-">Price from small to big</option>
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
    </div>
  );
}

const mapStateToProps = (state) => ({
  favoritePosts: state.user.favoritePosts,
  locations: state.app.locations,
  cities: state.app.cities,
  success: state.app.success
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
