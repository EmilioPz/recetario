import { useMemo } from 'react';

export function useTiempoPromedio(recetas) {
  return useMemo(() => {
    if (!Array.isArray(recetas) || recetas.length === 0) return 0;
    const total = recetas.reduce((acc, r) => {
      const matchH = r.tiempo.match(/(\d+)\s*h/);
      const matchM = r.tiempo.match(/(\d+)\s*min/);
      const horas = matchH ? parseInt(matchH[1], 10) * 60 : 0;
      const minutos = matchM ? parseInt(matchM[1], 10) : 0;
      return acc + horas + minutos;
    }, 0);
    return Math.round(total / recetas.length);
  }, [recetas]);
}