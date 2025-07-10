const API_URL = 'http://localhost:3001/api';

export async function getRecetas() {
  const res = await fetch(`${API_URL}/recetas`);
  if (!res.ok) throw new Error('Error al obtener recetas');
  return res.json();
}

export async function getRecetaById(id) {
  const res = await fetch(`${API_URL}/recetas/${id}`);
  if (!res.ok) throw new Error('Error al obtener receta');
  return res.json();
}