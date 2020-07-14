import React from "react";
import s from "./desires-list.module.scss";
import { useDispatch } from "react-redux";
import { SORT_DESIRES, SORT_OFFERS } from "../../redux/actions/types";

export default function MainListControl({
  changeComponent,
  visibleComponent,
  sortDesires,
  sortOffers,
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
    <div>
      <h3 className="h4 font-weight-bold m-0 py-3">ОБЬЯВЛЕНИЯ ИЗ ЛЕНТЫ</h3>

      <div className={s.list_control}>
        <div>
          <span
            onClick={() => {
              changeComponent("desires");
            }}
            className={`${
              visibleComponent === "desires" ? s.active_black : null
            }`}
          >
            Желания
          </span>
          <span
            onClick={() => changeComponent("offers")}
            className={`${
              visibleComponent === "offers" ? s.active_black : null
            }`}
          >
            Предложения
          </span>
        </div>
        <label className="form-group">
          <span>Сортировка</span>
          {visibleComponent === "desires" ? (
            <select onChange={(e) => sortDesiresHandler(e.target.value)}>
              <option value="default" hidden></option>
              <option value="price+">Price from big to small</option>
              <option value="price-">Price from small to big</option>
              <option value="priority+">Priority from big to small</option>
              <option value="priority-">Priority from small to big</option>
            </select>
          ) : (
            <select onChange={(e) => sortOffersHandler(e.target.value)}>
              <option value="default" hidden></option>
              <option value="rating+">Rating from big to small</option>
              <option value="rating-">Rating from small to big</option>
              <option value="price+">Price from big to small</option>
              <option value="price-">Price from small to big</option>
            </select>
          )}
        </label>
      </div>
    </div>
  );
}
