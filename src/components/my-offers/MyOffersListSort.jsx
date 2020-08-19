import React from "react";
import s from "./offers.module.scss";
import Router from "next/router";

function MyOffersListSort(props) {
  return (
    <div className={s.offers_list_sort}>
      <span className={s.btn_back} onClick={Router.back}>Назад</span>

      {props.sortingValues ? (
        <select
          className="form-control"
          onChange={(e) => props.sortOffersHandler(e.target.value)}
        >
          <option value="default" hidden>
            Сортировка
          </option>
          {props.sortingValues && props.sortingValues.length
            ? props.sortingValues.map((val, i) => {
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
        <div className="spinner-border text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default MyOffersListSort;