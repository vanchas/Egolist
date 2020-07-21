import s from "./layout.module.scss";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import MobSidebar from "../sidebar/MobSidebar";
import { connect } from "react-redux";
import { showSidebar } from "../../redux/actions/actions";

const Layout = ({ children, showSidebar, sidebar, error }) => {
  return (
    <div className={`layout ${s.layout}`}>
      {error && (
        <div className={`w-100 pb-2`}>
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      )}

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
  error: state.app.error,
});
const mapDispatchToProps = {
  showSidebar,
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
