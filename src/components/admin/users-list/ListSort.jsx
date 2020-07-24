import React from "react";

export default function ({ sortHandler }) {
  return (
    <div className={`py-3 d-flex`}>
      <div className={`px-2`}>
        <select
          className={`form-control`}
          // onChange={(e) => sortHandler(e.target.value)}
        >
          <option hidden>Сортировка</option>
          <option value={`name+`}>По имени [A - Я]</option>
          <option value={`name-`}>По имени [Я - А]</option>
          <option value={`desires+`}>По кол-ву желаний от большего</option>
          <option value={`desires-`}>По кол-ву желаний от меньшего</option>
          <option value={`offers+`}>По кол-ву предложений от большего</option>
          <option value={`offers-`}>По кол-ву предложений от меньшего</option>
          <option value={`type`}>По типу пользователя ??</option>
        </select>
      </div>
      <div className={`px-2`}>
        <input
          type={`text`}
          className={`form-control`}
          placeholder={`Поиск по имени и фамилии`}
        />
      </div>
    </div>
  );
}
