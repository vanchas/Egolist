import React from "react";
import s from "./fav.module.scss";

function FavoritePageControl(props) {
  return (
    <div className={s.favorite_page_control}>
      <div>
        <span
          onClick={() => props.changeVisibleComponent("desires")}
          className={`${props.visibleComponent === 'desires' ? s.active_toggler : ''} ${s.posts_toggler}`}
        >
          Избранные желания
        </span>
        <span
          className={`${props.visibleComponent === 'offers' ? s.active_toggler : ''} ${s.posts_toggler}`}
          onClick={() => props.changeVisibleComponent("offers")}
        >
          Избранные предложения
        </span>
      </div>
      <label className={s.favorites_sort}>
        {/*<span className="mr-3">Сортировка</span>*/}
        {props.visibleComponent === "desires" ? (
          props.sortingValues ? (
            <select
              className={`form-control`}
              onChange={(e) =>
                props.sortDesiresHandler(props.userId, e.target.value)
              }
            >
              <option hidden>Сортировка</option>
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
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )
        ) : props.sortingValues ? (
          <select
            className={`form-control`}
            onChange={(e) =>
              props.sortOffersHandler(props.userId, e.target.value)
            }
          >
            <option value="default" hidden></option>
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
      </label>
    </div>
  );
}

export default FavoritePageControl;
