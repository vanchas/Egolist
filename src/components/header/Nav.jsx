import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import s from "./header.module.scss";
import MainLogo from "../../assets/main-logo.png";
import Libra from "../../assets/header/libra.png";
import Heart from "../../assets/header/Heart.png";
import { authenticationService } from "../../_services";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useDispatch } from "react-redux";
import {FILTER_DESIRES, FILTER_OFFERS, SEARCH_INFO} from "../../redux/actions/types";

const NavComponent = ({
  locations,
  searchInfo,
  filterOffers,
  filterDesires,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setUser(authenticationService.currentUserValue);
  }, []);

  const logout = () => {
    toggle();
    authenticationService.logout();
  };

  const filterByLocationHandler = (e) => {
    dispatch({ type: FILTER_DESIRES, payload: [] });
    dispatch({ type: FILTER_OFFERS, payload: [] });
    filterOffers("region_id", e.target.value);
    filterDesires("region_id", e.target.value);
  };

  const searchByStringHandler = (e) => {
    e.preventDefault();
    dispatch({type: SEARCH_INFO, payload: []})
    searchInfo(searchValue.split("/").join("~slash~"))
    setSearchValue('')
  }

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
                  router.pathname === "/myDesires" ? s.active_red : null
                } nav-item`}
              >
                <Link href={`/myDesires`}>
                  <a className="font-weight-bold">ХОЧУ КУПИТЬ</a>
                </Link>
              </NavItem>
            ) : null}
            {user && user.token ? (
              <>
                <NavItem
                  className={`${s.nav_item} ${
                    router.pathname === "/myOffers" ? s.active_blue : null
                  } nav-item`}
                >
                  <Link href={`/myOffers`}>
                    <a className="font-weight-bold">МОИ ПРЕДЛОЖЕНИЯ</a>
                  </Link>
                </NavItem>
                <NavItem className={`${s.nav_item}`}>
                  <Link href={`/`}>
                    <a>
                      <img src={Libra} alt="" className={s.libra} />
                    </a>
                  </Link>
                </NavItem>
                <NavItem className={`${s.nav_item}`}>
                  <Link href={`/favorites`}>
                    <img src={Heart} alt="" className={s.libra} />
                  </Link>
                </NavItem>
              </>
            ) : null}
          </Nav>
        </Collapse>
      </Navbar>
      <form className={`${s.header_form} form-inline my-2 my-lg-0`}>
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
        <button
          className={`font-weight-bold btn text-dark my-2 my-sm-0 px-3 ${s.search_btn}`}
          type="submit"
          onClick={(e) => searchByStringHandler(e)}>
          Поиск
        </button>
      </form>
    </div>
  );
};

NavComponent.getInitialProps = async ({ Component, ctx }) => {
  return {};
};

export default NavComponent;
