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
} from "../redux/actions/appActions";
import { authenticationService } from "../_services/authentication.service";
import {
  SORT_FAVORITE_DESIRES,
  SORT_FAVORITE_OFFERS,
} from "../redux/actions/types";
import Router from "next/router";
import s from '../components/favorites/fav.module.scss'

function Favorites({
  getUserFavoritePosts,
  deleteFavorite,
  sortFavoriteDesires,
  sortFavoriteOffers,
  sortingValues,
  getSortingValues,
  favoriteDesires,
  favoriteOffers
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
  }

  useEffect(() => {
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
    <div>
      {showPage && (
        <>
          <div className={s.favorite_page_control}>
            <span
              onClick={() => changeVisibleComponent("desires")}
              className={`btn ${
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
            <label className={`form-group ${s.favorites_sort}`}>
              <span className="mr-3">Сортировка</span>
              {visibleComponent === "desires" ? (
                sortingValues ? (
                  <select
                    className={`form-control`}
                    onChange={(e) => sortDesiresHandler(userId, e.target.value)}
                  >
                    {sortingValues && sortingValues.length
                      ? sortingValues.map((val, i) => {
                          if (val.search_by.includes("idc")) {
                            return (
                              <option key={i} value={val.id}>
                                {val.value}
                              </option>
                            );
                          }
                          if (val.search_by.includes("price")) {
                            return (
                              <option key={i} value={val.id}>
                                {val.value}
                              </option>
                            );
                          }
                          if (val.search_by.includes("priority")) {
                            return (
                              <option key={i} value={val.id}>
                                {val.value}
                              </option>
                            );
                          }
                        })
                      : null}
                  </select>
                ) : (
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )
              ) : sortingValues ? (
                <select
                  className={`form-control`}
                  onChange={(e) => sortOffersHandler(userId, e.target.value)}
                >
                  <option value="default" hidden></option>
                  {sortingValues && sortingValues.length
                    ? sortingValues.map((val, i) => {
                        if (val.search_by.includes("idc")) {
                          return (
                            <option key={i} value={val.id}>
                              {val.value}
                            </option>
                          );
                        }
                        if (val.search_by.includes("price")) {
                          return (
                            <option key={i} value={val.id}>
                              {val.value}
                            </option>
                          );
                        }
                        if (val.search_by.includes("rating")) {
                          return (
                            <option key={i} value={val.id}>
                              {val.value}
                            </option>
                          );
                        }
                      })
                    : null}
                </select>
              ) : (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </label>
          </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
