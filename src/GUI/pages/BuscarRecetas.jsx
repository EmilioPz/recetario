import React, { useState, useEffect } from 'react';
import { recetas } from '../../API/recetas';
import Sidebar from '../components/Sidebar';
import ModalReceta from '../components/ModalReceta';

export default function BuscarRecetas() {
    const [ingredienteInput, setIngredienteInput] = useState('');
    const [ingredientesUser, setIngredientesUser] = useState([]);
    const [resultados, setResultados] = useState([]);
    const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);

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

    // 👇 useEffect que actualiza resultados automáticamente
    useEffect(() => {
        if (ingredientesUser.length === 0) {
            setResultados([]);
            return;
        }

        const res = recetas
            .filter(r => Array.isArray(r.ingredientes) && r.ingredientes.length > 0)
            .map(receta => {
                const ingReceta = receta.ingredientes.map(i => i.toLowerCase());
                const encontrados = ingredientesUser.filter(i => ingReceta.includes(i));
                const faltantes = ingReceta.filter(i => !ingredientesUser.includes(i));
                const porcentaje = (encontrados.length / ingReceta.length) * 100;
                const tiempo = receta.tiempo;
                return {
                    ...receta,
                    porcentaje: Math.round(porcentaje),
                    encontrados,
                    faltantes,
                    tiempo,
                };
            })
            .filter(r => r.porcentaje > 0)
            .sort((a, b) => b.porcentaje - a.porcentaje);

        setResultados(res);
    }, [ingredientesUser]);

    return (
        <div style={styles.container}>
            <Sidebar userName="Emilio" />
            <main style={styles.main}>
                <h2 style={{ marginBottom: 20 }}>Buscar recetas por ingredientes</h2>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input
                        type="text"
                        value={ingredienteInput}
                        onChange={e => setIngredienteInput(e.target.value)}
                        placeholder="Agregar ingrediente"
                        onKeyDown={e => e.key === 'Enter' && agregarIngrediente()}
                        style={styles.input}
                    />
                    <button onClick={agregarIngrediente} style={styles.button}>
                        Añadir
                    </button>
                </div>

                <div style={{ marginTop: 10 }}>
                    {ingredientesUser.map(ing => (
                        <span
                            key={ing}
                            style={styles.chip}
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
                        <div key={receta.id} style={{ ...styles.card, animation: 'fadeIn 0.5s ease' }}>
                            <img src={receta.imagen} alt={receta.nombre} style={styles.cardImage} />
                            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ margin: 0 }}>{receta.nombre}</h3>

                                <div style={styles.progressBarBackground}>
                                    <div
                                        style={{
                                            ...styles.progressBarFill,
                                            width: `${receta.porcentaje}%`,
                                            backgroundColor: colorPorcentaje(receta.porcentaje),
                                        }}
                                    />
                                </div>
                                <p style={{ margin: '5px 0', fontWeight: '600', color: colorPorcentaje(receta.porcentaje) }}>
                                    Compatibilidad: {receta.porcentaje}%
                                </p>

                                <p style={styles.ingredientes}>
                                    ✅ <strong>Tienes:</strong> {receta.encontrados?.join(', ') || 'ninguno'}
                                </p>
                                <p style={styles.ingredientes}>
                                    ❌ <strong>Faltan:</strong> {receta.faltantes?.join(', ') || 'ninguno'}
                                </p>
                                <div style={styles.tiempo}>
                                    <span style={styles.relojIcono}>⏱️</span>
                                    <span>{receta.tiempo}</span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                                    <button
                                        style={styles.verBtn}
                                        onClick={() => setRecetaSeleccionada(receta)}
                                    >
                                        Ver receta
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <ModalReceta receta={recetaSeleccionada} onClose={() => setRecetaSeleccionada(null)} />

            <style>{`
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(10px);}
                  to { opacity: 1; transform: translateY(0);}
                }
            `}</style>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#fff',
        color: '#333',
    },
    main: {
        flexGrow: 1,
        padding: 30,
        overflowY: 'auto',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        flexGrow: 1,
        borderRadius: 5,
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 16px',
        backgroundColor: '#28a745',
        color: '#fff',
        fontWeight: '600',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
        userSelect: 'none',
    },
    chip: {
        display: 'inline-block',
        padding: '6px 14px',
        margin: '6px 6px 6px 0',
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        cursor: 'pointer',
        userSelect: 'none',
        fontSize: '0.9rem',
    },
    card: {
        border: '1px solid #ddd',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 15,
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    },
    cardImage: {
        width: 120,
        height: 90,
        objectFit: 'cover',
        borderRadius: 8,
    },
    ingredientes: {
        margin: '5px 0',
        fontSize: '0.9rem',
    },
    verBtn: {
        padding: '8px 16px',
        backgroundColor: '#17a2b8',
        color: '#fff',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
    },
    progressBarBackground: {
        width: '100%',
        height: 12,
        backgroundColor: '#eee',
        borderRadius: 6,
        overflow: 'hidden',
        marginTop: 8,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 6,
        transition: 'width 0.4s ease',
    },
    tiempo: {
        display: 'flex',
        alignItems: 'center',
        color: '#666',
        fontSize: '0.9rem',
        marginTop: 6,
        gap: 6,
    },
    relojIcono: {
        fontSize: '1rem',
    }
};