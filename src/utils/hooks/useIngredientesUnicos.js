import { useMemo } from 'react';

export function useIngredientesUnicos(recetas) {
  return useMemo(() => {
    if (!Array.isArray(recetas)) return [];
    const all = recetas.flatMap(r =>
      typeof r.ingredientes === 'string'
        ? r.ingredientes.split(',').map(i => i.trim().toLowerCase())
        : Array.isArray(r.ingredientes)
        ? r.ingredientes.map(i => i.trim().toLowerCase())
        : []
    );
    return [...new Set(all)];
  }, [recetas]);
}