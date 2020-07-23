import React, { useEffect, useState } from "react";
import s from "./my-desire.module.scss";
import MyDesireItem from "./MyDesireItem";
import Link from "next/link";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { SORT_MY_DESIRES } from "../../redux/actions/types";

export default function MyDesireList({
  sortMyDesires,
  hideShowDesire,
  desires,
  locations,
  cities,
  getCities,
  sortingValues,
                                       deleteDesire
}) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (desires && desires.length) {
      setLoading(false);
    }
    setTimeout(() => setLoading(false), 10000);
  }, []);

  const sortDesiresHandler = (value) => {
    setLoading(true);
    dispatch({ type: SORT_MY_DESIRES, payload: [] });
    sortMyDesires(value);
  };

  return (
    <div className={s.red_list}>
      <div className={s.desires_list_heading}>Ваши желания:</div>
      <div className={s.red_list_control}>
        <span className="btn text-dark" onClick={() => Router.back()}>
          Назад
        </span>
        <span className="btn">
          <Link href="/addNewLot">
            <a className="text-dark">Создать желание</a>
          </Link>
        </span>
        <div className={s.desires_list_sort}>
          {sortingValues ? (
            <select
              className="form-control border-dark"
              onChange={(e) => sortDesiresHandler(e.target.value)}
            >
              <option value="default" hidden>
                Сортировка
              </option>
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
          )}
        </div>
      </div>

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
