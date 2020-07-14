import React, { useState, useEffect } from 'react'
import s from './categories.module.scss'
import {connect, useDispatch} from 'react-redux';
import { getCategories, getDesiresByCategory, getOffersByCategory } from '../../redux/actions/actions'
import {GET_DESIRES_BY_CATEGORY, GET_OFFERS_BY_CATEGORY} from "../../redux/actions/types";

function Categories({ getCategories, categories,getOffersByCategory, getDesiresByCategory }) {
  const dispatch = useDispatch()

  useEffect(() => {
    getCategories();
  }, []);

  const filterByCategotyHandler = (id) => {
    dispatch({type: GET_OFFERS_BY_CATEGORY, payload: []})
    dispatch({type: GET_DESIRES_BY_CATEGORY, payload: []})
    getOffersByCategory(id)
    getDesiresByCategory(id)
  }

  return (
    <section className={s.categories}>
      <h3 className="h5">
        КАТЕГОРИИ</h3>
        {categories && categories.length
          ? <>
            <ul className="categories-list">
            {categories.map((c, i) => (
              <li className="btn" key={i}
                onClick={() => filterByCategotyHandler(c.id)}>
                {c.name}</li>
            ))}</ul>
              <select className={`form-control`}
                      onChange={(e) => filterByCategotyHandler(e.target.value)}>
                <option value="default" hidden>КАТЕГОРИИ</option>
                {categories.map((c, i) => (
                    <option key={i} value={c.id}>{c.name}</option>
                ))}
              </select>
            </>
          : <div className={`text-center py-1`}>
            <div className="spinner-border text-secondary" role="status">
            <span className="sr-only">Loading...</span>
            </div></div>}
    </section>
  )
}

const mapStateToProps = (state) => ({
  categories: state.app.categories
})

const mapDispatchToProps = {
  getCategories,
  getDesiresByCategory,
  getOffersByCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
