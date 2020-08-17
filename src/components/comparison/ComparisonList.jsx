import React from "react";
import ComparisonItem from "./ComparisonItem";
import s from "./comparison.module.scss";

import { SortableContainer } from "react-sortable-hoc";

const ComparisonList = SortableContainer(({ offers }) => {
  return (
    <ul className={s.offers_list}>
      {offers && offers.length ? (
        offers.map((offer, index) => (
          <ComparisonItem key={index} index={index} offer={offer} />
        ))
      ) : (
        <div className={`text-center text-white py-5 h5`}>
          Список предложений для сравнения пуст
        </div>
      )}
    </ul>
  );
});

export default ComparisonList;
