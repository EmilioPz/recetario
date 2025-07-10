import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles/Sidebar.module.css';
import UserInfo from './UserInfo';

const Sidebar = ({ userName }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    alert('Logout');
  };

  return (
    <div className={styles.sidebar}>
      <UserInfo
        userName={userName}
        avatarUrl="https://picsum.photos/50/50?grayscale"
        onLogout={handleLogout}
      />

      <nav className={styles.nav}>
        <NavItem to="/" icon="📋" label="Inicio" active={isActive('/')} />
        <NavItem
          to="/buscar"
          icon="🔍"
          label="Buscar por Ingredientes"
          active={isActive('/buscar')}
        />
        <NavItem
          to="/agregar"
          icon="➕"
          label="Agregar Receta"
          active={isActive('/agregar')}
        />
      </nav>
    </div>
  );
};

const NavItem = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`${styles.navLink} ${active ? styles.activeLink : ''}`}
  >
    <span className={styles.icon}>{icon}</span>
    {label}
  </Link>
);

export default Sidebar;