import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ModalReceta from '../components/ModalReceta';
import styles from './styles/BuscarRecetas.module.css';
import IngredienteInput from '../components/IngredienteInput';
import RecetaCard from '../components/RecetaCard';

const API_URL = `${process.env.REACT_APP_API_URL}/utils`;

export default function BuscarRecetas() {
    const [ingredienteInput, setIngredienteInput] = useState('');
    const [ingredientesUser, setIngredientesUser] = useState([]);
    const [recetas, setRecetas] = useState([]);
    const [resultados, setResultados] = useState([]);
    const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/recetas`)
            .then(res => res.json())
            .then(data => setRecetas(data))
            .catch(err => console.error('Error al cargar recetas:', err));
    }, []);

    const agregarIngrediente = () => {
        const ing = ingredienteInput.trim().toLowerCase();
        if (ing && !ingredientesUser.includes(ing)) {
            setIngredientesUser([...ingredientesUser, ing]);
            setIngredienteInput('');
        }
    };

    const eliminarIngrediente = (ing) => {
        setIngredientesUser(ingredientesUser.filter(i => i !== ing));
    };

    const colorPorcentaje = (p) => {
        if (p > 75) return '#4caf50';
        if (p >= 40) return '#ff9800';
        return '#f44336';
    };

useEffect(() => {
    if (ingredientesUser.length === 0) {
        setResultados([]);
        return;
    }

const res = recetas
    .filter(r => r.ingredientes)
    .map(receta => {
        const ingReceta = receta.ingredientes
            .split(',')
            .map(i => i.trim().toLowerCase())
            .filter(i => i.length > 0);

        if (ingReceta.length === 0) return null; // skip recetas vacías

        const encontrados = ingredientesUser.filter(i => ingReceta.includes(i));
        const faltantes = ingReceta.filter(i => !ingredientesUser.includes(i));
        const porcentaje = (encontrados.length / ingReceta.length) * 100;

        return {
            ...receta,
            porcentaje: Math.round(porcentaje),
            encontrados,
            faltantes,
        };
    })
    .filter(r => r && r.porcentaje > 0)
    .sort((a, b) => b.porcentaje - a.porcentaje);
    console.log(res)
    setResultados(res);
}, [ingredientesUser, recetas]);

    return (
        <div className={styles.container}>
            <Sidebar />
            <main className={styles.main}>
                <h2 style={{ marginBottom: 20 }}>Buscar recetas por ingredientes</h2>

                <div className={styles.inputGroup}>


<IngredienteInput
  value={ingredienteInput}
  onChange={setIngredienteInput}
  onAdd={agregarIngrediente}
/>
                </div>

                <div style={{ marginTop: 10 }}>
                    {ingredientesUser.map(ing => (
                        <span
                            key={ing}
                            className={styles.chip}
                            onClick={() => eliminarIngrediente(ing)}
                            title="Haz click para eliminar"
                        >
                            {ing} &times;
                        </span>
                    ))}
                </div>

                <div style={{ marginTop: 30 }}>
                    {resultados.length === 0 && <p>No hay recetas que coincidan.</p>}

{resultados.map(receta => (
  <RecetaCard
    key={receta.id}
    receta={receta}
    onView={(r) => setRecetaSeleccionada(r)}
    colorPorcentaje={colorPorcentaje}
  />
))}
                </div>
            </main>

            <ModalReceta receta={recetaSeleccionada} onClose={() => setRecetaSeleccionada(null)} />
        </div>
    );
}