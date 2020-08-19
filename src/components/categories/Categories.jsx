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
  const [subcatLoading, setSubcatLoading] = useState(false);

  useEffect(() => {
    if (subcategories && subcategories.length) {
      setSubcatLoading(false);
    } else {
      setTimeout(() => setSubcatLoading(false), 3000)
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
        setSubcatLoading(false);
      }, 5000);
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
      {categories && categories.length ? (
        <>
          {/* DESKTOP */}
          <ul>
            {categories.map((c, i) => (
              <li
                key={i}
                onClick={() => filterByCategoryHandler(c.id)}
                className={`shadow-sm`}
              >
                {c.name} <span>&#x276D;</span>
              </li>
            ))}
          </ul>

          {/* MOBILE */}
          <select
            className={`form-control shadow-sm`}
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
          <div className="spinner-grow text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {subcategories && !subcatLoading ? (
        <>
          {/* DESKTOP */}
          {subcategories && subcategories.length && !subcatLoading ? (
            <ul>
              {subcategories.map((c, i) => (
                <li
                  key={i}
                  onClick={() => filterBySubcategoryHandler(c.id)}
                  className={`shadow-sm`}
                >
                  {c.name}
                </li>
              ))}
            </ul>
          ) : null}

          {/* MOBILE */}
          {subcategories && subcategories.length && !subcatLoading ? (
            <select
              className={`form-control shadow-sm mt-2`}
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
          ) : null}
        </>
      ) : subcatLoading ? (
        <div className={`text-center py-1`}>
          <div className="spinner-grow text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : null}
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
