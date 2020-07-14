import React, { useState, useEffect } from "react";
import Alert from '../helpers/Alert'
import Success from '../helpers/Success'
import { useRouter } from 'next/router'
import s from './update.module.scss'
// import Chip from '@material-ui/core/Chip';

export default function UpdateForm({ locations, alert, showAlert,
  updateDesire, categories, subcategories, cities, types, priorities, getSubcategories, getCities, success }) {
  const router = useRouter();
  const [header, setHeader] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [priority_id, setPriority_id] = useState(null);
  const [type_id, setType_id] = useState(null);
  const [category_ids, setCategory_ids] = useState([]);
  const [subcategory_ids, setSubcategory_ids] = useState([]);
  const [region_id, setRegion_id] = useState(null);
  const [is_active, setIs_active] = useState(1);
  const [city_id, setCity_id] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const submitHandler = e => {
    e.preventDefault();
    if (header && photo && video && price && description && priority_id && type_id && category_ids.length && subcategory_ids.length && region_id && is_active && city_id) {
      updateDesire(router.query.id, photo, video, description, header, price, priority_id, type_id, category_ids, subcategory_ids, region_id, city_id, is_active);
    } else {
      showAlert('Bce поля должны быть заполнены');
    }
  }

  const deleteCategory = (id) => {
    setSelectedCategories(selectedCategories.filter(cat => +cat.id != +id));
  };

  const selectCategory = id => {
    categories.map(cat => {
      if (selectedCategories.length < 2) {
        if (+cat.id === +id) {
          setSelectedCategories([...selectedCategories, cat])
        }
      } else showAlert('Максимум 2 категории');
    })
  }

  const deleteSubcategory = (id) => {
    setSelectedSubcategories(selectedSubcategories.filter(cat => +cat.id != +id));
  };

  const selectSubcategory = id => {
    subcategories.map(cat => {
      if (selectedSubcategories.length < 2) {
        if (+cat.id === +id) {
          setSelectedSubcategories([...selectedSubcategories, cat])
        }
      } else showAlert('Максимум 2 подкатегории');
    });
  }

  return (
    <div className={s.update_form}>
      <h3>Изменить желание</h3>
      {alert && <Alert />}
      <form encType="multipart/form-data" onSubmit={submitHandler}>
        <label>Категория</label>
        <select className="form-control" onChange={e => {
          selectCategory(e.target.value);
          getSubcategories(e.target.value);
          setCategory_ids([...category_ids, e.target.value]);
        }}>
          <option value="default" hidden></option>
          {categories
            ? categories.map((cat, i) => (
              <option value={cat.id} key={i}>{cat.name}</option>
            )) : null}
        </select>
        <label>Подкатегория</label>
        <select className="form-control" onChange={e => {
          selectSubcategory(e.target.value);
          setSubcategory_ids([...subcategory_ids, e.target.value]);
        }}>
          <option value="default" hidden></option>
          {subcategories
            ? subcategories.map((cat, i) => (
              <option value={cat.id} key={i}>{cat.name}</option>
            )) : null}
        </select>
        <label>Регион</label>
        <select className="form-control" onChange={e => {
          getCities(parseInt(e.target.value));
          setRegion_id(parseInt(e.target.value));
        }}>
          <option value="default" hidden></option>
          {locations
            ? locations.map((loc, i) => (
              <option value={loc.id} key={i}>{loc.name_ru}</option>
            )) : null}
        </select>
        <label>Город</label>
        <select className="form-control" onChange={e => setCity_id(e.target.value)}>
          <option value="default" hidden></option>
          <option value="default">Не важно</option>
          {cities
            ? cities.map((city, i) => (
              <option value={city.id} key={i}>{city.name_ru}</option>
            )) : null}
        </select>
        <div className={s.types}>
          <div>Тип</div>
          {types
            ? types.map((type, i) => (
              <label key={i}>
                <input type="radio" value={type.id} onChange={e => setType_id(e.target.value)} name="type" />
                {type.value}</label>
            )) : null}
        </div>
        <div className={s.priorities}>
          <div>Приоритет</div>
          {priorities
            ? priorities.map((priority, i) => (
              <label key={i}>
                <input type="radio" value={priority.id} onChange={e => setPriority_id(e.target.value)} name="priority" />
                {priority.value}</label>
            )) : null}
        </div>
        <label htmlFor="header">Заголовок</label>
        <input className="form-control" type="text"
          name="header"
          id="header"
          onChange={e => setHeader(e.target.value)} />
        <label htmlFor="description">Описание</label>
        <input className="form-control"
          type="text"
          name="description"
          id="description"
          onChange={e => setDescription(e.target.value)}
        />
        <label htmlFor="price">Цена</label>
        <input className="form-control"
          type="number"
          name="price"
          id="price"
          onChange={e => setPrice(e.target.value)}
        />
        <label htmlFor="video">Видео</label>
        <input className="form-control" type="url"
          name="video"
          id="video"
          onChange={e => setVideo(e.target.value)} />
        <label htmlFor="photo">Фото</label>
        <input className="form-control" type="file" multiple
          name="photo"
          id="photo"
          onChange={e => setPhoto(e.target.files)} />
        <div>
          {success && <Success />}
          <button type="submit"
            className="btn btn-primary mt-2">
            Сохранить</button>
        </div>
      </form>
    </div>
  );
}
