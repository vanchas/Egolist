import React from "react";
import s from "./offers-for-me.module.scss";

function MyOffersSortControl(props) {
  return (
    <div className={s.offers_list_sort}>
      <div className={s.title}>Предложения других пользователей</div>

      {props.offers && props.offers.length ? (
        <div className={s.sort}>
          <span>
            Сортировка <span>&#x276D;</span>{" "}
          </span>
          {props.sortingValues ? (
            <select
              onChange={(e) =>
                props.sortOffersByDesireId(desire_id, e.target.value)
              }
            >
              <option value="default" hidden>
                По рейтингу
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
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default MyOffersSortControl;
