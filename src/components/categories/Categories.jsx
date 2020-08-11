import React, { useState, useEffect } from "react";
import s from "./categories.module.scss";
import { connect, useDispatch } from "react-redux";
import {
  getCategories,
  getDesiresByCategory,
  getOffersByCategory,
  selectHeadingCategories,
  getSubcategories,
  selectHeadingSubcategories,
} from "../../redux/actions/appActions";
import {
  GET_DESIRES_BY_CATEGORY,
  GET_OFFERS_BY_CATEGORY,
} from "../../redux/actions/types";

function Categories({
  getCategories,
  categories,
  getOffersByCategory,
  getDesiresByCategory,
  getSubcategories,
  selectHeadingCategories,
  selectHeadingSubcategories,
  subcategories,
}) {
  const dispatch = useDispatch();
  const [subcatLoading, setSubcatLoading]= useState(false)

  useEffect(() => {
    if (subcategories && subcategories.length) {
      setSubcatLoading(false)
    }
    getCategories();
  }, [subcategories]);

  const filterByCategoryHandler = (id) => {
    setSubcatLoading(true);
    getSubcategories(id);
    selectHeadingCategories(id);
    dispatch({ type: GET_OFFERS_BY_CATEGORY, payload: [] });
    dispatch({ type: GET_DESIRES_BY_CATEGORY, payload: [] });
    getOffersByCategory(id);
    getDesiresByCategory(id);
    if (!subcategories || !subcategories.length) {
      setTimeout(() => {
        setSubcatLoading(false)
      }, 5000)
    }
  };

  const filterBySubcategoryHandler = (id) => {
    selectHeadingSubcategories(id);
    dispatch({ type: GET_OFFERS_BY_CATEGORY, payload: [] });
    dispatch({ type: GET_DESIRES_BY_CATEGORY, payload: [] });
    getOffersByCategory(id);
    getDesiresByCategory(id);
  };

  return (
    <section className={s.categories}>
      <h3 className="h5">КАТЕГОРИИ</h3>
      {categories && categories.length ? (
        <>
          <ul className="categories-list">
            {categories.map((c, i) => (
              <li
                className="btn"
                key={i}
                onClick={() => filterByCategoryHandler(c.id)}
              >
                {c.name}
              </li>
            ))}
          </ul>
          <select
            className={`form-control`}
            onChange={(e) => filterByCategoryHandler(e.target.value)}
          >
            <option value="default" hidden>
              КАТЕГОРИИ
            </option>
            {categories.map((c, i) => (
              <option key={i} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </>
      ) : (
        <div className={`text-center py-1`}>
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {subcategories && subcategories.length && !subcatLoading ? (
        <>
          <h3 className="h5 mt-2">ПОДКАТЕГОРИИ</h3>
          <ul className="categories-list">
            {subcategories.map((c, i) => (
              <li
                className="btn"
                key={i}
                onClick={() => filterBySubcategoryHandler(c.id)}
              >
                {c.name}
              </li>
            ))}
          </ul>
          <select
            className={`form-control`}
            onChange={(e) => filterBySubcategoryHandler(e.target.value)}
          >
            <option value="default" hidden>
              ПОДКАТЕГОРИИ
            </option>
            {subcategories.map((c, i) => (
              <option key={i} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </>
      ) : (
        subcatLoading ?
            <div className={`text-center py-1`}>
              <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            : null
      )}
    </section>
  );
}

const mapStateToProps = (state) => ({
  categories: state.app.categories,
  subcategories: state.app.subcategories,
});

const mapDispatchToProps = {
  getCategories,
  getDesiresByCategory,
  getOffersByCategory,
  selectHeadingCategories,
  getSubcategories,
  selectHeadingSubcategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
