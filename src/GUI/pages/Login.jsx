import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './styles/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/utils/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userId', data.userId);
        toast.success('✅ Login exitoso');
        navigate('/');
      } else {
        toast.error(`❌ ${data.message || 'Error al iniciar sesión'}`);
      }
    } catch (err) {
      toast.error('❌ Error al conectar con el servidor');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.card}>
        <h2 className={styles.title}>🍳 Recetario</h2>
        <p className={styles.subtitle}>Inicia sesión para continuar</p>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Ingresar
        </button>
      </form>
    </div>
  );
}