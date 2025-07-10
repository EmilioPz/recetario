import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './styles/BuscadorRecetas.module.css';

const BuscadorRecetas = ({ value, onChange }) => {
  return (
    <Form.Control
      type="text"
      placeholder="🔎 Buscar receta..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${styles.input} mb-3`}
    />
  );
};

export default BuscadorRecetas;