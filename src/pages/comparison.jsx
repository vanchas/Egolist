import React, { useEffect, useState } from "react";
import ComparisonList from "../components/comparison/ComparisonList";
import s from "../components/comparison/comparison.module.scss";
import { connect } from "react-redux";
import arrayMove from "array-move";

const ComparisonPage = (props) => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    setOffers(props.offers ?? [])
  }, [props.offers])

  const onSortEnd = ({ oldIndex, newIndex }) => {
    return setOffers((items) => arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div className={s.comparison_page}>
      <ComparisonList
        offers={offers}
        onSortEnd={onSortEnd}
        lockAxis={`y`}
        pressDelay={100}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  offers: state.user.comparisonOffers,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ComparisonPage);
