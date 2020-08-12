import React, { useEffect } from "react";
import s from "./header.module.scss";
import NavComponent from "./Nav";
import { connect } from "react-redux";
import {
  getLocations,
} from "../../redux/actions/appActions";
import Categories from "../categories/Categories";

function Header(props) {
  useEffect(() => {
    props.getLocations();
  }, []);

  return (
    <header className={`header ${s.header}`}>
      <NavComponent  />
      <Categories />
    </header>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  getLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
