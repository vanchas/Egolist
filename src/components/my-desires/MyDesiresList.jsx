import React, { useEffect, useState } from "react";
import s from "./my-desire.module.scss";
import MyDesireItem from "./MyDesireItem";
import Link from "next/link";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { SORT_MY_DESIRES } from "../../redux/actions/types";
import { authenticationService } from "../../_services/authentication.service";
import MyDesiresSortControl from "./MyDesiresSortControl";

export default function MyDesireList({
  sortMyDesires,
  hideShowDesire,
  desires,
  locations,
  cities,
  getCities,
  sortingValues,
  deleteDesire,
}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [allowToCreateDesires, setAllowToCreateDesires] = useState(false);
  const dispatch = useDispatch();

  const allowToCreateDesiresHandler = (userData) => {
    if (
      userData.active ||
      (!userData.activation_token_sms || !userData.activation_token_sms)
    ) {
      setAllowToCreateDesires(true);
    }
  };

  useEffect(() => {
    if (desires && desires.length) {
      setLoading(false);
    }
    const user = authenticationService.currentUserValue;
    if (user && user.user) {
      setUser(user);
      allowToCreateDesiresHandler(user.user);
    }
    setTimeout(() => setLoading(false), 5000);
  }, []);

  const sortDesiresHandler = (value) => {
    setLoading(true);
    dispatch({ type: SORT_MY_DESIRES, payload: [] });
    sortMyDesires(value);
  };

  return (
    <div className={s.red_list}>
        <MyDesiresSortControl
          desires={desires}
          allowToCreateDesires={allowToCreateDesires}
          sortDesiresHandler={sortDesiresHandler}
          sortingValues={sortingValues}
        />

      <div className={s.red_list_items}>
        {desires && desires.length ? (
          <ul>
            {desires.map((d, i) => (
              <li key={i}>
                <MyDesireItem
                  deleteDesire={deleteDesire}
                  sortingValues={sortingValues}
                  desire={d}
                  hideShowDesire={hideShowDesire}
                  locations={locations}
                  cities={cities}
                  getCities={getCities}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className={`text-center py-5`}>
            {loading ? (
              <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="py-5 h5 text-center text-white">
                Вы еще не создали ни одного желания...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
