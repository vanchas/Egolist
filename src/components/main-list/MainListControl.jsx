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
              <option value="price+">Цена от большей к меньшей</option>
              <option value="price-">Цена от меньшей к большей</option>
              <option value="priority+">Приоритет от срочного</option>
              <option value="priority-">Приоритет от не срочного</option>
            </select>
          ) : (
            <select onChange={(e) => sortOffersHandler(e.target.value)}>
              <option value="default" hidden></option>
              <option value="rating+">Рейтинг от большего к меньшему</option>
              <option value="rating-">Рейтинг от меньшего к большему</option>
              <option value="price+">Цена от большей к меньшей</option>
              <option value="price-">Цена от меньше к большей</option>
            </select>
          )}
        </label>
      </div>
    </div>
  );
}
