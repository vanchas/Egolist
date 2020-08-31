import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import s from "./header.module.scss";
import Libra from "../../assets/header/libra.png";
import Heart from "../../assets/header/Heart.png";
import Router from "next/router";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
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
  showSidebar,
} from "../../redux/actions/appActions";
import Spinner from "../helpers/Spinner";
import ReportProblem from "../cabinet/ReportProblem";
import { badWordsChecker } from "../../utils/FieldsValidator";

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
  showSidebar,
  sidebar,
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
    if (Router.pathname !== "/") Router.push("/");
    setCityLoading(true);
    getCities(e.target.value);
    setRegionId(e.target.value);
    dispatch({ type: FILTER_DESIRES, payload: [] });
    dispatch({ type: FILTER_OFFERS, payload: [] });
    filterOffers("region_id", e.target.value);
    filterDesires("region_id", e.target.value);
  };

  const filterByCityHandler = (e) => {
    if (Router.pathname !== "/") Router.push("/");
    setCityId(e.target.value);
    dispatch({ type: FILTER_DESIRES, payload: [] });
    dispatch({ type: FILTER_OFFERS, payload: [] });
    filterOffers("region_id", e.target.value);
    filterDesires("region_id", e.target.value);
  };

  const searchByStringHandler = (e) => {
    e.preventDefault();
    if (Router.pathname !== "/") Router.push("/");
    dispatch({ type: SEARCH_INFO, payload: [] });
    const searchString =
      badWordsChecker(searchValue)
        ? !searchValue.length
            ? " "
            : searchValue.includes("/")
              ? searchValue.split("/").join("~slash~")
              : searchValue
        : ''
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
      <Navbar color="" dark expand="lg" className="">
        <NavbarToggler onClick={toggle} className={s.navbar_toggler} />
        <button
          onClick={() => showSidebar(!sidebar)}
          className={s.sidebar_toggler}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <Collapse isOpen={isOpen} navbar>
          <Nav className={s.navbar_content} navbar>
            <NavItem
              className={`${s.nav_item} ${
                router.pathname === "/" ? s.active_link : null
              } nav-item`}
            >
              <Link href={`/`}>
                <a onClick={reloadPage} className={`pr-3`}>
                  ЛЕНТА
                </a>
              </Link>
            </NavItem>
            {user && user.token ? (
              <NavItem
                className={`${s.nav_item} ${
                  router.pathname === "/my-desires" ? s.active_link : null
                } nav-item`}
              >
                <Link href={`/my-desires`}>
                  <a className={`pr-3`}>ХОЧУ КУПИТЬ</a>
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
                    <a className={s.tooltip}>
                      <img src={Libra} alt="" className={s.libra} />
                      {/*<small className={`text-danger ml-1`}>*/}
                      {/*  {comparisonOffers ? comparisonOffers : null}*/}
                      {/*</small>*/}
                      <span className={s.tooltiptext}>Сравнение</span>
                    </a>
                  </Link>
                  <Link href={`/favorites`}>
                    <a className={s.tooltip}>
                      <img src={Heart} alt="" className={s.libra} />
                      <span className={s.tooltiptext}>Избранное</span>
                    </a>
                  </Link>
                </NavItem>
              </>
            ) : null}
          </Nav>
        </Collapse>
      </Navbar>
      <form className={`${s.header_form} shadow-sm`}>
        <div className={s.input_holder} suppressHydrationWarning={true}>
          {/*<i className={`${s.search_icon} fas fa-search`} />*/}
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
              Вся Украина
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
          <div className={s.select_holder}>
            <span>&#x276F;</span>
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
          </div>
        ) : cityLoading ? (
          <div
            style={{ backgroundColor: "#3a3f46" }}
            className={`text-center pt-2 px-5 ${s.city_loader}`}
          >
            <Spinner color={`secondary`} />
          </div>
        ) : (
          <small />
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

const mapStateToProps = (state) => ({
  locations: state.app.locations,
  selectedCategory: state.app.selectedCategory,
  selectedSubcategory: state.app.selectedSubcategory,
  cities: state.app.cities,
  comparisonOffers: state.user.comparisonOffers.length,
  sidebar: state.app.sidebar,
});

const mapDispatchToProps = {
  getLocations,
  searchInfo,
  filterOffers,
  filterDesires,
  getCities,
  showSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavComponent);
