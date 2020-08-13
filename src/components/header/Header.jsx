import React, { useEffect } from "react";
import s from "./header.module.scss";
import NavComponent from "./Nav";
import { connect } from "react-redux";
import {
  getLocations,
} from "../../redux/actions/appActions";
import Categories from "../categories/Categories";
import { useRouter } from "next/router";

function Header(props) {
  const router = useRouter()

  useEffect(() => {
    props.getLocations();
  }, []);

  return (
    <header className={`header ${s.header}`}>
      <NavComponent  />
      {router.pathname === '/' && <Categories/>}
    </header>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  getLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
