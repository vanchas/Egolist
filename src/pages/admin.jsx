import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createCategory, createSubcategory, editCategory, editSubcategory, deleteCategory, deleteSubcategory } from '../redux/actions/adminActions'
import { getSubcategories, getCategories } from '../redux/actions/actions'

const Admin = props => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryId, setNewCategoryId] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [newSubcategoryId, setNewSubcategoryId] = useState('');

  useEffect(() => {
    props.getCategories();
  }, []);

  return (
    <div>
      <div>
        <h3>Create category</h3>
        <form onSubmit={e => {
          e.preventDefault();
          props.createCategory(newCategoryName);
          setNewCategoryName('');
        }}>
          <label>Type new category name
          <input type="text" className="form-control" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
          </label>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>

      <div>
        <h3>Edit category</h3>
        <form onSubmit={e => {
          e.preventDefault();
          props.editCategory(newCategoryId, newCategoryName);
          setNewCategoryName('');
          setNewCategoryId('');
        }}>
          <label>Select category to edit
          <select className="form-control" onChange={e => setNewCategoryId(e.target.value)}>
              <option value="default" hidden></option>
              {props.categories && props.categories.length
                ? props.categories.map((cat, i) => (
                  <option value={cat.id} key={i}>{cat.name}</option>
                )) : null}
            </select>
          </label>
          <label>Type new category name
            <input type="text" className="form-control" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
          </label>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>

      <div>
        <h3>Delete category</h3>
        <form onSubmit={e => {
          e.preventDefault();
          props.deleteCategory(newCategoryId);
          setNewCategoryId('');
        }}>
          <label>Select category to delete
          <select className="form-control" onChange={e => setNewCategoryId(e.target.value)}>
              <option value="default" hidden></option>
              {props.categories && props.categories.length
                ? props.categories.map((cat, i) => (
                  <option value={cat.id} key={i}>{cat.name}</option>
                )) : null}
            </select>
          </label>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>

      <div>
        <h3>Create subcategory</h3>
        <form onSubmit={e => {
          e.preventDefault();
          props.createSubcategory(newCategoryId, newSubcategoryName);
          setNewSubcategoryName('');
          setNewCategoryId('');
        }}>
          <label>Select category for new subcategory
          <select className="form-control" onChange={e => setNewCategoryId(e.target.value)}>
              <option value="default" hidden></option>
              {props.categories && props.categories.length
                ? props.categories.map((cat, i) => (
                  <option value={cat.id} key={i}>{cat.name}</option>
                )) : null}
            </select>
          </label>
          <label>Type new subcategory name
          <input type="text" className="form-control" value={newSubcategoryName} onChange={e => setNewSubcategoryName(e.target.value)} />
          </label>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>

      <div>
        <h3>Edit subcategory</h3>
        <form onSubmit={e => {
          e.preventDefault();
          props.editSubcategory(newSubcategoryId, newCategoryId, newSubcategoryName);
          setNewSubcategoryName('');
          setNewCategoryId('');
          setNewSubcategoryId('');
        }}>
          <label>Select category for edit subcategory
          <select className="form-control" onChange={e => {
              props.getSubcategories(e.target.value);
              setNewCategoryId(e.target.value);
            }}>
              <option value="default" hidden></option>
              {props.categories && props.categories.length
                ? props.categories.map((cat, i) => (
                  <option value={cat.id} key={i}>{cat.name}</option>
                )) : null}
            </select>
          </label>
          <label>Select subcategory to edit
          <select className="form-control" onChange={e => setNewSubcategoryId(e.target.value)}>
              <option value="default" hidden></option>
              {props.subcategories && props.subcategories.length
                ? props.subcategories.map((cat, i) => (
                  <option value={cat.id} key={i}>{cat.name}</option>
                )) : null}
            </select>
          </label>
          <label>Type new subcategory name
          <input type="text" className="form-control" value={newSubcategoryName} onChange={e => setNewSubcategoryName(e.target.value)} />
          </label>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>

      <div>
        <h3>Delete subcategory</h3>
        <form onSubmit={e => {
          e.preventDefault();
          props.deleteSubcategory(newSubcategoryId);
          setNewSubcategoryId('');
          setNewCategoryId('');
        }}>
          <label>Select category for delete subcategory
          <select className="form-control" onChange={e => {
              props.getSubcategories(e.target.value);
              setNewCategoryId(e.target.value);
            }}>
              <option value="default" hidden></option>
              {props.categories && props.categories.length
                ? props.categories.map((cat, i) => (
                  <option value={cat.id} key={i}>{cat.name}</option>
                )) : null}
            </select>
          </label>
          <label>Select subcategory to delete
          <select className="form-control" onChange={e => setNewSubcategoryId(e.target.value)}>
              <option value="default" hidden></option>
              {props.subcategories && props.subcategories.length
                ? props.subcategories.map((cat, i) => (
                  <option value={cat.id} key={i}>{cat.name}</option>
                )) : null}
            </select>
          </label>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>

    </div>
  );
}

const mapStateToProps = (state) => ({
  categories: state.app.categories,
  subcategories: state.app.subcategories
})

const mapDispatchToProps = {
  createCategory, createSubcategory, editCategory, editSubcategory, deleteCategory, deleteSubcategory,
  getCategories, getSubcategories
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
