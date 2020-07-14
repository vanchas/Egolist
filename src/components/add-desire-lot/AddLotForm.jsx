import React, { useState, useEffect } from "react";
import s from "./add-form.module.scss";
import Alert from "../helpers/Alert";

export default function AddLotForm({
  desiresInfo,
  createDesire,
  alert,
  showAlert,
  categories,
  subcategories,
  getSubcategories,
  locations,
  cities,
  getCities,
  currentGeoPosition,
}) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [category1, setCategory1] = useState(null);
  const [category2, setCategory2] = useState(null);
  const [subcategory1, setSubcategory1] = useState(null);
  const [subcategory2, setSubcategory2] = useState(null);
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [priority, setPriority] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [isActive, setIsActive] = useState(0);
  const [currentGeoRegion, setCurrGeoRegion] = useState(null);
  const [showSubSelect1, setShowSubSelect1] = useState(false);
  const [showSubSelect2, setShowSubSelect2] = useState(false);
  const [subcat1Loading, setSubcat1Loading] = useState(false);
  const [subcat2Loading, setSubcat2Loading] = useState(false);
  const [regionLoading, setRegionLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      title.trim().length &&
      description.trim().length &&
      category1.length &&
      subcategory1.length &&
      price > 0
    ) {
      setLoading(true);
      createDesire(
        photos,
        video,
        description,
        title,
        price,
        priority,
        condition,
        [category1, category2],
        [subcategory1, subcategory2],
        region,
        city,
        isActive
      );
      setTitle("");
      setPhotos([]);
      setVideo("");
      setDescription("");
      setCategory1(null);
      setCategory2(null);
      setSubcategory1(null);
      setSubcategory2(null);
      setCondition("");
      setPrice("");
      setPriority("");
      setIsActive(1);
      setTimeout(() => setLoading(false), 2000);
    } else {
      showAlert("Bce поля должны быть заполнены");
    }
  };

  useEffect(() => {
    if (
      location.length &&
      currentGeoPosition &&
      currentGeoPosition.region_rus
    ) {
      locations.map((loc) => {
        if (
          loc.name_ru.toLowerCase() ===
          currentGeoPosition.region_rus.toLowerCase()
        ) {
          setCurrGeoRegion(loc);
          getCities(loc.id);
        }
      });
    }
  }, []);

  const category1Handler = (e) => {
    setSubcat1Loading(true);
    setCategory1(e.target.value);
    getSubcategories(e.target.value);
    setShowSubSelect1(true)
  };
  const category2Handler = (e) => {
    setSubcat2Loading(true);
    getSubcategories(e.target.value);
    setCategory2(e.target.value);
    setShowSubSelect2(true)
  };

  const locationSelectHandler = (e) => {
    setRegionLoading(true);
    setRegion(e.target.value);
    getCities(e.target.value);
  };

  return (
    <div className={s.add_lot_form}>
      <span className={s.btn_back}>&lt; back</span>
      {alert && <Alert />}
      <h3>Создание желания</h3>
      <form onSubmit={submitHandler}>
        <div>
          <label>Заголовок *</label>
          <input
            type="text"
            value={title}
            required
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Фото</label>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((input, i) => (
            <input
              key={i}
              type="file"
              onChange={(e) => setPhotos([...photos, e.target.files[0]])}
            />
          ))}
          <label htmlFor="video">Видео (YouTube)</label>
          <input
            type="url"
            value={video}
            placeholder="https:// ...."
            id="video"
            className="form-control"
            onChange={(e) => setVideo(e.target.value)}
          />
          <label>Описание *</label>
          <textarea
            required
            value={description}
            className="form-control"
            rows="10"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <fieldset>
            <legend>Выберите категорию *</legend>
            {!categories.length ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : category1 ? (
              <div>Выбрана категория {category1}</div>
            ) : (
              <select
                required
                className="form-control"
                onChange={(e) => category1Handler(e)}
              >
                <option value="default" hidden>
                  первая категория *
                </option>
                {categories && categories.length
                  ? categories.map((c, i) => (
                      <option key={i} value={c.id}>
                        {c.name}
                      </option>
                    ))
                  : null}
              </select>
            )}
            {subcat1Loading && !subcategories.length ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : showSubSelect1 && (
                  subcategory1 ? (
                <div>Выбрана подкатегория {subcategory1}</div>
              ) : (
                <select
                  required
                  className="form-control"
                  onChange={(e) => setSubcategory1(e.target.value)}
                >
                  <option value="default" hidden>
                    первая подкатегория *
                  </option>
                  {subcategories && subcategories.length
                    ? subcategories.map((s, i) => (
                        <option key={i} value={s.id}>
                          {s.name}
                        </option>
                      ))
                    : null}
                </select>)
            )}
            <br />
            {!categories.length ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : category2 ? (
              <div>Выбрана категория {category2}</div>
            ) : (
              <select
                className="form-control"
                onChange={(e) => category2Handler(e)}
              >
                <option value="default" hidden>
                  вторая категория
                </option>
                {categories && categories.length
                  ? categories.map((c, i) => (
                      <option key={i} value={c.id}>
                        {c.name}
                      </option>
                    ))
                  : null}
              </select>
            )}
            {subcat2Loading && !subcategories.length ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : showSubSelect2 && (
                subcategory2 ? (
              <div>Выбрана подкатегория {subcategory2}</div>
            ) : (
              <select
                className="form-control"
                onChange={(e) => setSubcategory2(e.target.value)}
              >
                <option value="default" hidden>
                  вторая подкатегория
                </option>
                {subcategories && subcategories.length
                  ? subcategories.map((s, i) => (
                      <option key={i} value={s.id}>
                        {s.name}
                      </option>
                    ))
                  : null}
              </select>)
            )}
          </fieldset>
          {/* LOCATIONS */}
          <fieldset>
            <legend>Выберите область *</legend>
            {!locations.length ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <select
                required
                className="form-control"
                onChange={(e) => locationSelectHandler(e)}
              >
                <option value="default" hidden>
                  Область *
                </option>
                {locations && locations.length
                  ? locations.map((c, i) => {
                      if (currentGeoRegion && currentGeoRegion.id === c.id) {
                        return (
                          <option selected key={i} value={c.id}>
                            {c.name_ru}
                          </option>
                        );
                      }
                      return (
                        <option key={i} value={c.id}>
                          {c.name_ru}
                        </option>
                      );
                    })
                  : null}
              </select>
            )}
            {regionLoading && !cities.length ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <select
                required
                className="form-control"
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="default" hidden>
                  Город *
                </option>
                <option value="default">Не важно</option>
                {cities && cities.length
                  ? cities.map((s, i) => (
                      <option key={i} value={s.id}>
                        {s.name_ru}
                      </option>
                    ))
                  : null}
              </select>
            )}
          </fieldset>
          <div className={s.condition_fieldset}>
            <legend>Сроки *</legend>
            {desiresInfo.types && desiresInfo.types.length ? (
              desiresInfo.types.map((t, i) => (
                <label key={i}>
                  {t.value}
                  <input
                    type="radio"
                    name="condition"
                    value={t.id}
                    onChange={(e) => setCondition(e.target.value)}
                  />
                </label>
              ))
            ) : (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
          <label htmlFor="price">Цена *</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
            required
          />
          <label htmlFor="priority">Приоритет *</label>
          {!desiresInfo.priorities || !desiresInfo.priorities.length ? (
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <select
              id="priority"
              required
              onChange={(e) => setPriority(e.target.value)}
              className="form-control"
            >
              <option value="default" hidden></option>
              {desiresInfo.priorities && desiresInfo.priorities.length
                ? desiresInfo.priorities.map((p, i) => (
                    <option key={i} value={p.id}>
                      {p.value}
                    </option>
                  ))
                : null}
            </select>
          )}
          <label>
            <input
              type="checkbox"
              onChange={() => {
                if (isActive) {
                  setIsActive(0);
                } else setIsActive(1);
              }}
            />
            Сделать активным
          </label>
          <div className="d-flex">
            <button type="submit" className="ml-2 btn btn-secondary">
              Опубликовать
            </button>
            {loading && (
              <div className="text-center py-2 pl-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
