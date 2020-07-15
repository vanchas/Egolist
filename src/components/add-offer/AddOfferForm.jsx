import React, { useEffect, useState } from "react";
import s from "./add-form.module.scss";
import Alert from "../helpers/Alert";
import Success from "../helpers/Success";
import { useRouter } from "next/router";
import inputValidateHandler from "../helpers/FieldsValidator";

export default function AddLotForm({
  createOffer,
  alert,
  showAlert,
  categories,
  subcategories,
  getSubcategories,
  locations,
  cities,
  getCities,
  success,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [category1, setCategory1] = useState(null);
  const [category2, setCategory2] = useState(null);
  const [subcategory1, setSubcategory1] = useState(null);
  const [subcategory2, setSubcategory2] = useState(null);
  const [price, setPrice] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [isActive, setIsActive] = useState(0);
  const [showSubSelect1, setShowSubSelect1] = useState(false);
  const [showSubSelect2, setShowSubSelect2] = useState(false);
  const [subcategory1Loading, setSubcategory1Loading] = useState(false);
  const [subcategory2Loading, setSubcategory2Loading] = useState(false);
  const [regionLoading, setRegionLoading] = useState(false);
  const [warning, setWarning] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      title.trim().length &&
      description.trim().length &&
      category1 &&
      subcategory1 &&
      price > 0
    ) {
      setLoading(true);
      createOffer(
        router.query.desire_id,
        photos,
        video,
        description,
        title,
        price,
        [category1 ? category1.id : null, category2 ? category2.id : null],
        [subcategory1 ? subcategory1.id : null, subcategory2 ? subcategory2.id : null],
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
      setPrice("");
      setIsActive(1);
      setTimeout(() => setLoading(false), 5000);
    } else {
      showAlert("Bce поля должны быть заполнены");
    }
  };

  useEffect(() => {
    if (subcategories.length) {
      setSubcategory1Loading(false);
      setSubcategory2Loading(false);
    }
    setTimeout(() => setWarning(null), 10000);
  }, [warning, subcategories]);

  const category1Handler = (category) => {
    setSubcategory1Loading(true);
    setCategory1(JSON.parse(category));
    getSubcategories(JSON.parse(category).id);
    setShowSubSelect1(true);
  };
  const category2Handler = (category) => {
    setSubcategory2Loading(true);
    getSubcategories(JSON.parse(category).id);
    setCategory2(JSON.parse(category));
    setShowSubSelect2(true);
  };

  const locationSelectHandler = (e) => {
    setRegionLoading(true);
    setRegion(e.target.value);
    getCities(e.target.value);
  };

  return (
    <div className={s.add_lot_form}>
      <h3>Создание предложения</h3>
      {warning && (
        <div className="alert alert-danger" role="alert">
          {warning}
        </div>
      )}

      <span className={s.btn_back} onClick={() => router.back()}>
        &lt; Назад
      </span>
      {alert && <Alert />}
      {success && <Success />}
      <form onSubmit={submitHandler}>
        <div>
          <label>Заголовок</label>
          <input
            name={`header`}
            type="text"
            value={title}
            maxLength={`50`}
            required
            className="form-control"
            onChange={(e) => {
              if (inputValidateHandler(e, setWarning)) setTitle(e.target.value);
            }}
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
          <label>Описание</label>
          <textarea
            name={`description`}
            required
            maxLength={`1000`}
            value={description}
            className="form-control"
            rows="10"
            onChange={(e) => {
              if (inputValidateHandler(e, setWarning))
                setDescription(e.target.value);
            }}
          />
        </div>
        <div>
          <fieldset>
            <legend>Выберите категорию</legend>
            {!categories || !categories.length ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : category1 ? (
              <div>
                Выбрана категория {category1.name}
                <span
                  className={`btn btn-danger ml-2`}
                  onClick={() => {
                    setCategory1(null);
                    setSubcategory1(null);
                    setShowSubSelect1(false);
                  }}
                >
                  X
                </span>
              </div>
            ) : (
              <select
                required
                className="form-control"
                onChange={(e) => category1Handler(e.target.value)}
              >
                <option value="default" hidden>
                  первая категория
                </option>
                {categories && categories.length
                  ? categories.map((c, i) => (
                      <option key={i} value={JSON.stringify(c)}>
                        {c.name}
                      </option>
                    ))
                  : null}
              </select>
            )}
            {!subcategories.length && subcategory1Loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              showSubSelect1 &&
              (subcategory1 ? (
                <div>
                  Выбрана подкатегория {subcategory1.name}
                  <span
                    className={`btn btn-danger ml-2`}
                    onClick={() => {
                      setSubcategory1(null);
                    }}
                  >
                    X
                  </span>
                </div>
              ) : (
                <select
                  required
                  className="form-control"
                  onChange={(e) => setSubcategory1(JSON.parse(e.target.value))}
                >
                  <option value="default" hidden>
                    первая подкатегория
                  </option>
                  {subcategories && subcategories.length
                    ? subcategories.map((s, i) => (
                        <option key={i} value={JSON.stringify(s)}>
                          {s.name}
                        </option>
                      ))
                    : null}
                </select>
              ))
            )}
            <br />
            {!categories || !categories.length ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : category2 ? (
              <div>
                Выбрана категория {category2.name}
                <span
                  className={`btn btn-danger ml-2`}
                  onClick={() => {
                    setCategory2(null);
                    setSubcategory2(null);
                    setShowSubSelect2(false);
                  }}
                >
                  X
                </span>
              </div>
            ) : (
              <select
                className="form-control"
                onChange={(e) => category2Handler(e.target.value)}
              >
                <option value="default" hidden>
                  вторая категория
                </option>
                {categories && categories.length
                  ? categories.map((c, i) => (
                      <option key={i} value={JSON.stringify(c)}>
                        {c.name}
                      </option>
                    ))
                  : null}
              </select>
            )}
            {!subcategories && subcategory2Loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              showSubSelect2 &&
              (subcategory2 ? (
                <div>
                  Выбрана подкатегория {subcategory2.name}
                  <span
                    className={`btn btn-danger ml-2`}
                    onClick={() => {
                      setSubcategory2(null);
                    }}
                  >
                    X
                  </span>
                </div>
              ) : (
                <select
                  className="form-control"
                  onChange={(e) => setSubcategory2(JSON.parse(e.target.value))}
                >
                  <option value="default" hidden>
                    первая подкатегория
                  </option>
                  {subcategories && subcategories.length
                    ? subcategories.map((s, i) => (
                        <option key={i} value={JSON.stringify(s)}>
                          {s.name}
                        </option>
                      ))
                    : null}
                </select>
              ))
            )}
          </fieldset>
          <fieldset>
            <legend>Выберите область</legend>
            {!locations || !locations.length ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <select
                required
                className="form-control"
                onChange={(e) => locationSelectHandler(e)}
              >
                <option value="default" hidden></option>
                {locations && locations.length
                  ? locations.map((c, i) => (
                      <option key={i} value={c.id}>
                        {c.name_ru}
                      </option>
                    ))
                  : null}
              </select>
            )}
            {!cities.length && regionLoading ? (
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
                  Города
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
          <label htmlFor="price">Цена</label>
          <input
            type="number"
            id="price"
            min={`1`}
            max={`999999999999`}
            maxLength={12}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
            required
          />
          <label>
            <input
              type="checkbox"
              onChange={() => {
                if (isActive) {
                  setIsActive(0);
                } else setIsActive(1);
              }}
            />
            Сделать Активным
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
