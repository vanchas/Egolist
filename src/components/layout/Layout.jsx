import s from './layout.module.scss';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import MobSidebar from '../sidebar/MobSidebar';
import { useState } from 'react';

const Layout = ({ children }) => {
  const [isCollapsed, setCollapse] = useState(true);

  return (
    <div className={`layout ${s.layout}`}>
      <Header />
      <span className={s.sidebar_toggler} onClick={() => setCollapse(!isCollapsed)}>&gt;&gt;&gt;</span>
      {!isCollapsed && <MobSidebar />}
      <Sidebar />
      <main>
        {children}
      </main>
    </div>)
};

export default Layout;
