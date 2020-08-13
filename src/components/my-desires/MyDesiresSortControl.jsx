import React from "react";
import s from "./my-desire.module.scss";
import Link from "next/link";

function MyDesiresSortControl(props) {
  return (
    <div className={s.desires_list_sort}>
      <span className={s.create_btn}>
        {props.allowToCreateDesires && (
          <Link href="/create-new-desire">
            <a className="text-dark">Создать</a>
          </Link>
        )}
      </span>

      <div className={s.sort_select}>
        <span className={s.sort_title}>
          Сортировка <span className={s.select_arrow}>&#x276D;</span>
        </span>
        {props.sortingValues ? (
          <select onChange={(e) => props.sortDesiresHandler(e.target.value)}>
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
          <div className={`pt-2 text-center px-5`}>
            <div className="spinner-grow text-warning" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyDesiresSortControl;
