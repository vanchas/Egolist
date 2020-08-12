import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import s from "./header.module.scss";
import MainLogo from "../../assets/old/main-logo.png";
import Libra from "../../assets/header/libra.png";
import Heart from "../../assets/header/Heart.png";
import Router from "next/router";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { connect, useDispatch } from "react-redux";
import {
  FILTER_DESIRES,
  FILTER_OFFERS,
  SEARCH_INFO,
} from "../../redux/actions/types";
import { authenticationService } from "../../_services/authentication.service";
import {
  filterDesires,
  filterOffers,
  getCities,
  getLocations,
  searchInfo,
} from "../../redux/actions/appActions";

const NavComponent = ({
  locations,
  searchInfo,
  filterOffers,
  filterDesires,
  selectedCategory,
  getCities,
  cities,
  selectedSubcategory,
  comparisonOffers,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [regionId, setRegionId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [cityLoading, setCityLoading] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (cities && cities.length) setCityLoading(false);
    setUser(authenticationService.currentUserValue);
  }, [cities]);

  const filterByLocationHandler = (e) => {
    setCityLoading(true);
    getCities(e.target.value);
    setRegionId(e.target.value);
    dispatch({ type: FILTER_DESIRES, payload: [] });
    dispatch({ type: FILTER_OFFERS, payload: [] });
    filterOffers("region_id", e.target.value);
    filterDesires("region_id", e.target.value);
  };

  const filterByCityHandler = (e) => {
    setCityId(e.target.value);
    dispatch({ type: FILTER_DESIRES, payload: [] });
    dispatch({ type: FILTER_OFFERS, payload: [] });
    filterOffers("region_id", e.target.value);
    filterDesires("region_id", e.target.value);
  };

  const searchByStringHandler = (e) => {
    e.preventDefault();
    dispatch({ type: SEARCH_INFO, payload: [] });
    const searchString = !searchValue.length
      ? " "
      : searchValue.includes("/")
      ? searchValue.split("/").join("~slash~")
      : searchValue;
    searchInfo(
      searchString,
      regionId ?? 1,
      cityId ?? "",
      selectedCategory ? JSON.stringify([selectedCategory]) : [1],
      selectedSubcategory ? JSON.stringify([selectedSubcategory]) : [1]
    );
    setSearchValue("");
  };

  const reloadPage = () => {
    if (Router.pathname === "/") {
      window.location.reload(true);
    }
  };

  return (
    <div className={s.navbar_nav}>
      <Navbar color="" light expand="md" className="">
        <NavbarToggler onClick={toggle} className={s.navbar_toggler} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className={s.navbar_content} navbar>
            <NavItem
              className={`${s.nav_item} ${
                router.pathname === "/" ? s.active_link : null
              } nav-item`}
            >
              <Link href={`/`}>
                <a onClick={reloadPage}>ЛЕНТА</a>
              </Link>
            </NavItem>
            {user && user.token ? (
              <NavItem
                className={`${s.nav_item} ${
                  router.pathname === "/my-desires" ? s.active_link : null
                } nav-item`}
              >
                <Link href={`/my-desires`}>
                  <a>ХОЧУ КУПИТЬ</a>
                </Link>
              </NavItem>
            ) : null}
            {user && user.token ? (
              <>
                <NavItem
                  className={`${s.nav_item} ${
                    router.pathname === "/my-offers" ? s.active_link : null
                  } nav-item`}
                >
                  <Link href={`/my-offers`}>
                    <a>МОИ ПРЕДЛОЖЕНИЯ</a>
                  </Link>
                </NavItem>
                <NavItem className={`${s.nav_item} ${s.nav_item_double}`}>
                  <Link href={`/comparison`}>
                    <a>
                      <img src={Libra} alt="" className={s.libra} />
                      <small className={`text-danger ml-1`}>
                        {comparisonOffers ? comparisonOffers : null}
                      </small>
                    </a>
                  </Link>
                  <Link href={`/favorites`}>
                    <a>
                      <img src={Heart} alt="" className={s.libra} />
                    </a>
                  </Link>
                </NavItem>
              </>
            ) : null}
          </Nav>
        </Collapse>
      </Navbar>
      <form className={`${s.header_form}`}>
        <div className={s.input_holder}>
          <i className={`${s.search_icon} fas fa-search`} />
          <input
            className={`${s.search_input}`}
            type="search"
            placeholder="Начните вводить поисковый запрос"
            aria-label="Search"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </div>
        <div className={s.select_holder}>
          <span>&#x276F;</span>
          <select
            className={s.search_select}
            onChange={(e) => filterByLocationHandler(e)}
          >
            <option value="default" hidden>
              Вся украина
            </option>
            {locations && locations.length
              ? locations.map((l, i) => (
                <option value={l.id} key={i}>
                  {l.name_ru}
                </option>
              ))
              : null}
          </select>
        </div>
        {cities && cities.length && cities[0] && !cityLoading ? (
          <select
            className={s.search_select}
            onChange={(e) => filterByCityHandler(e)}
          >
            <option value="default" hidden>
              Город
            </option>
            {cities && cities.length && cities[0]
              ? cities.map((city, i) => (
                  <option value={city.id} key={i}>
                    {city.name_ru}
                  </option>
                ))
              : null}
          </select>
        ) : cityLoading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <small></small>
        )}
        <button
          className={s.search_btn}
          type="submit"
          onClick={(e) => searchByStringHandler(e)}
        >
          Поиск
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  const comparisonOffers = state.user.comparisonOffers.length;
  return {
    locations: state.app.locations,
    selectedCategory: state.app.selectedCategory,
    selectedSubcategory: state.app.selectedSubcategory,
    cities: state.app.cities,
    comparisonOffers,
  };
};

const mapDispatchToProps = {
  getLocations,
  searchInfo,
  filterOffers,
  filterDesires,
  getCities,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavComponent);
