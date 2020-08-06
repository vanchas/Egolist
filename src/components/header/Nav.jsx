import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import s from "./header.module.scss";
import MainLogo from "../../assets/main-logo.png";
import Libra from "../../assets/header/libra.png";
import Heart from "../../assets/header/Heart.png";
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
import { filterDesires, filterOffers, getCities, getLocations, searchInfo } from "../../redux/actions/appActions";

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
  const [regionId, setRegionId] = useState(false);
  const [cityId, setCityId] = useState(false);
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
    searchInfo(
      searchValue.split("/").join("~slash~"),
      regionId,
      cityId,
      [selectedCategory],
      [selectedSubcategory]
    );
    setSearchValue("");
  };

  return (
    <div className={s.navbar_nav}>
      <Link href="/">
        <a className={`${s.navbar_brand}`}>
          <img
            src={MainLogo}
            alt="EGOLIST"
            className={`mx-auto ${s.main_logo}`}
          />
        </a>
      </Link>

      <Navbar color="" light expand="md" className="py-0">
        <NavbarToggler onClick={toggle} className={s.navbar_toggler} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className={`mr-auto pb-2`} navbar>
            <NavItem
              className={`${s.nav_item} ${
                router.pathname === "/" ? s.active_yellow : null
              } nav-item`}
            >
              <Link href={`/`}>
                <a className="font-weight-bold">ЛЕНТА</a>
              </Link>
            </NavItem>
            {user && user.token ? (
              <NavItem
                className={`${s.nav_item} ${
                  router.pathname === "/my-desires" ? s.active_red : null
                } nav-item`}
              >
                <Link href={`/my-desires`}>
                  <a className="font-weight-bold">ХОЧУ КУПИТЬ</a>
                </Link>
              </NavItem>
            ) : null}
            {user && user.token ? (
              <>
                <NavItem
                  className={`${s.nav_item} ${
                    router.pathname === "/my-offers" ? s.active_blue : null
                  } nav-item`}
                >
                  <Link href={`/my-offers`}>
                    <a className="font-weight-bold">МОИ ПРЕДЛОЖЕНИЯ</a>
                  </Link>
                </NavItem>
                <NavItem className={`${s.nav_item}`}>
                  <Link href={`/comparison`}>
                    <a>
                      <img src={Libra} alt="" className={s.libra} />
                      <small className={`text-danger ml-1`}>
                        {comparisonOffers ? comparisonOffers : null}
                      </small>
                    </a>
                  </Link>
                </NavItem>
                <NavItem className={`${s.nav_item}`}>
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
        <input
          className={`font-weight-bold border-0 form-control text-dark ${s.search_input}`}
          type="search"
          placeholder="Начните вводить поисковый запрос"
          aria-label="Search"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <select
          className={`font-weight-bold ${s.search_select} border-0 form-control text-dark`}
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
        {cities && cities.length && !cityLoading ? (
          <select
            className={`font-weight-bold ${s.search_select} border-0 form-control text-dark`}
            onChange={(e) => filterByCityHandler(e)}
          >
            <option value="default" hidden>
              Город
            </option>
            {cities && cities.length
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
          className={`font-weight-bold btn text-dark ${s.search_btn}`}
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
  const comparisonOffers = state.user.comparisonOffers.length
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
