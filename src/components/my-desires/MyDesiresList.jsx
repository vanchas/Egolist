import React, { useEffect, useState } from "react";
import s from "./my-desire.module.scss";
import MyDesireItem from "./MyDesireItem";
import Link from "next/link";
import Router from "next/router";

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

  useEffect(() => {
    if (desires && desires.length) {
      setLoading(false);
    }
    setTimeout(() => setLoading(false), 10000);
  }, []);

  return (
    <div className={s.red_list}>
      <div className={s.red_list_heading}>
        Вы сделали предложения на следующие лоты:
      </div>
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
            onChange={(e) => sortMyDesires(e.target.value)}
          >
            <option value="default" hidden>
              Сортировка
            </option>
            <option value="priority+">Priority from big to small</option>
            <option value="priority-">Priority from small to big</option>
            <option value="price+">Price from big to small</option>
            <option value="price-">Price from small to big</option>
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
