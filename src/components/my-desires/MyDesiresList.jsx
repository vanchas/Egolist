import React, { useEffect, useState } from "react";
import s from "./my-desire.module.scss";
import MyDesireItem from "./MyDesireItem";
import Link from "next/link";
import Router from "next/router";
import {useDispatch} from "react-redux";
import {GET_OFFERS_BY_DESIRE_ID, SORT_MY_DESIRES} from "../../redux/actions/types";
import myDesires from "../../pages/myDesires";

export default function MyDesireList({
  sortMyDesires,
  hideShowDesire,
  desires,
  locations,
  cities,
  getCities,
  getOffersByDesireId,
  offers,
  sortOffersByDesireId,
}) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    if (desires && desires.length) {
      dispatch({type: GET_OFFERS_BY_DESIRE_ID, payload: []})
      setLoading(false);
    }
    setTimeout(() => setLoading(false), 10000);
  }, [myDesires]);

  const sortDesiresHandler = (value) => {
    setLoading(true)
    dispatch({type: SORT_MY_DESIRES, payload: []})
    sortMyDesires(value)
  }

  return (
    <div className={s.red_list}>
      <div className={s.red_list_control}>
        <span className="btn text-dark" onClick={()=>Router.back()}>Назад</span>
        <span className="btn">
          <Link href="/addNewLot">
            <a className="text-dark">Создать желание</a>
          </Link>
        </span>
        <div className={s.desires_list_sort}>
          <select
            className="form-control"
            onChange={(e) => sortDesiresHandler(e.target.value)}
          >
            <option value="default" hidden>
              Сортировка
            </option>
            <option value="priority+">Приоритет от срочного</option>
            <option value="priority-">Приоритет от не срочного</option>
            <option value="price+">Цена от большей к меньшей</option>
            <option value="price-">Цена от меньшей к большей</option>
          </select>
        </div>
      </div>

      <div className={s.red_list_items}>
        {desires && desires.length ? (
          <ul>
            {desires.map((d, i) => (
              <li key={i}>
                <MyDesireItem
                  desire={d}
                  hideShowDesire={hideShowDesire}
                  locations={locations}
                  cities={cities}
                  offers={offers}
                  getCities={getCities}
                  getOffersByDesireId={getOffersByDesireId}
                  sortOffersByDesireId={sortOffersByDesireId}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className={`text-center py-5`}>
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="py-5 h5 text-center">
                У Вас нет активных желаний...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
