import React, { useEffect, useState } from "react";
import {
  getUsersSortValues,
} from "../../../redux/actions/adminActions";
import { connect } from "react-redux";
import HttpRequest from "../../../_helpers/HttpRequest";

function ListSort(props) {
  const [searchValue, setSearchValue] = useState("");
  const [sortValues, setSortValues] = useState(null);

  const fetchSortsValues = () => {
      HttpRequest.execute(`/info/sorts/user`)
          .then(data => {
              setSortValues(data.sorts)
          }).catch(err => console.error('Error: ', err));
  }

  useEffect(() => {
    // props.getUsersSortValues();
      fetchSortsValues()
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
        {sortValues && sortValues.length ? (
          <select
            className={`form-control`}
            onChange={(e) => props.sortHandler(e.target.value)}
          >
            <option hidden>Сортировка</option>
            {sortValues.map((value, i) => (
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
});
const mapDispatchToProps = {
  getUsersSortValues,
};
export default connect(mapStateToProps, mapDispatchToProps)(ListSort);
