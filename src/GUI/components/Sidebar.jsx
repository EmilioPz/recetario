import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ userName }) => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.userInfo}>
        <img
          src="https://picsum.photos/50/50?grayscale"
          alt="User"
          style={styles.avatar}
        />
        <span style={styles.userName}>{userName || 'Usuario'}</span>
      </div>
      <nav style={styles.nav}>
        <Link to="/" style={styles.navLink}>
          📋 Inicio
        </Link>
        <Link to="/buscar" style={styles.navLink}>
          🔍 Buscar por Ingredientes
        </Link>
        <Link to="/agregar" style={styles.navLink}>
          ➕ Agregar Receta
        </Link>
      </nav>
      <button style={styles.logoutBtn} onClick={() => alert('Logout')}>
        🔒 Cerrar sesión
      </button>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '220px',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRight: '1px solid #ddd',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '40px',
  },
  avatar: {
    borderRadius: '50%',
    marginRight: '15px',
  },
  userName: {
    fontWeight: '600',
    color: '#333',
    fontSize: '1.1rem',
  },
  nav: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  navLink: {
    color: '#555',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
    transition: 'color 0.3s',
  },
  logoutBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#d9534f',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '10px 0',
    textAlign: 'left',
  },
};

export default Sidebar;