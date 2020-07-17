import React, { useState, useEffect } from 'react'
import s from './categories.module.scss'
import {connect} from 'react-redux';
import { getCategories, getDesiresByCategory, selectHeadingCategories } from '../../redux/actions/actions'

function Categories({ getCategories, categories, getDesiresByCategory, selectHeadingCategories }) {

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className={s.categories}>
      <h3 className="h5">
        КАТЕГОРИИ</h3>
        {categories && categories.length
          ? <>
            <ul className="categories-list">
            {categories.map((c, i) => (
              <li className="btn" key={i}
                onClick={() => {
                  selectHeadingCategories(c.id)
                  getDesiresByCategory(c.id)
                }}>
                {c.name}</li>
            ))}</ul>
              <select className={`form-control`}
                      onChange={(e) => {
                        selectHeadingCategories(e.target.value)
                        getDesiresByCategory(e.target.value)
                      }}>
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
  selectHeadingCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
