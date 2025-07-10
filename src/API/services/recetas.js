const API_URL = process.env.REACT_APP_API_URL;

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