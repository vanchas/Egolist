import s from "./layout.module.scss";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import MobSidebar from "../sidebar/MobSidebar";
import { connect } from "react-redux";
import { showSidebar } from "../../redux/actions/actions";

const Layout = ({ children, showSidebar, sidebar }) => {
  return (
    <div className={`layout ${s.layout}`}>
      <Header />
      <span className={s.sidebar_toggler} onClick={() => showSidebar(!sidebar)}>
        &gt;&gt;&gt;
      </span>
      {sidebar && <MobSidebar showSidebar={showSidebar} />}
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sidebar: state.app.sidebar,
});
const mapDispatchToProps = {
  showSidebar,
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
