import React, { useEffect, useState } from "react";
import {
  getUsersSortValues,
} from "../../../redux/actions/adminActions";
import { connect } from "react-redux";

function ListSort(props) {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    props.getUsersSortValues();
  }, []);

  return (
    <div className={`py-3 d-flex`}>
        <form
            className={`d-flex px-2`}
            onSubmit={(e) => props.searchHandler(e, searchValue)}
        >
            <input
                type={`text`}
                className={`form-control`}
                placeholder={`Поиск по имени и фамилии`}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type={`submit`} className={`btn btn-warning`}>
                Поиск
            </button>
        </form>
      <div className={`px-2`}>
        {props.sortingValues && props.sortingValues.length ? (
          <select
            className={`form-control`}
            onChange={(e) => props.sortHandler(e.target.value)}
          >
            <option hidden>Сортировка</option>
            {props.sortingValues.map((value, i) => (
              <option key={i} value={value.id}>{value.value}</option>
            ))}
            {/*<option value={`name+`}>По имени [A - Я]</option>*/}
            {/*<option value={`name-`}>По имени [Я - А]</option>*/}
            {/*<option value={`desires+`}>По кол-ву желаний от большего</option>*/}
            {/*<option value={`desires-`}>По кол-ву желаний от меньшего</option>*/}
            {/*<option value={`offers+`}>По кол-ву предложений от большего</option>*/}
            {/*<option value={`offers-`}>По кол-ву предложений от меньшего</option>*/}
            {/*<option value={`type`}>По типу пользователя ??</option>*/}
          </select>
        ) : <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  sortingValues: state.admin.sortingValues
});
const mapDispatchToProps = {
  getUsersSortValues,
};
export default connect(mapStateToProps, mapDispatchToProps)(ListSort);
