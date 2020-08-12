import React from "react";
import s from "./desires-list.module.scss";
import { useDispatch } from "react-redux";
import { SORT_DESIRES, SORT_OFFERS } from "../../redux/actions/types";

export default function MainListControl({
  changeComponent,
  visibleComponent,
  sortDesires,
  sortOffers,
  sortingValues,
}) {
  const dispatch = useDispatch();

  const sortDesiresHandler = (sortValue) => {
    dispatch({ type: SORT_DESIRES, payload: [] });
    sortDesires(sortValue);
  };
  const sortOffersHandler = (sortValue) => {
    dispatch({ type: SORT_OFFERS, payload: [] });
    sortOffers(sortValue);
  };

  return (
    <div className={s.main_list_control}>
      <div className={s.list_control}>
        <div>
          <span
            onClick={() => {
              changeComponent("desires");
            }}
            className={`${
              visibleComponent === "desires" ? s.active_link : null
            }`}
          >
            Желания
          </span>
          <span
            onClick={() => changeComponent("offers")}
            className={`${
              visibleComponent === "offers" ? s.active_link : null
            }`}
          >
            Предложения
          </span>
        </div>
        <label>
          <span>Сортировка <span className={s.select_arrow}>&#x276D;</span></span>
          {visibleComponent === "desires" ? (
            sortingValues ? (
              <select onChange={(e) => sortDesiresHandler(e.target.value)}>
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
            <select onChange={(e) => sortOffersHandler(e.target.value)}>
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
    </div>
  );
}
