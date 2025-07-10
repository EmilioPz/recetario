import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import { FaUtensils, FaCarrot, FaClock } from 'react-icons/fa';
import TablaRecetas from '../components/TablaRecetas';
import { useFetch } from '../../API/hooks/useFetch';
import { useIngredientesUnicos } from '../../API/hooks/useIngredientesUnicos';
import { useTiempoPromedio } from '../../API/hooks/useTiempoPromedio';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/Home.module.css';

export default function Home() {
  const { data: recetas, loading, error, refetch } = useFetch('http://localhost:3001/api/recetas');
  const ingredientesUnicos = useIngredientesUnicos(recetas);
  const tiempoPromedio = useTiempoPromedio(recetas);

  if (loading) return <p className={styles.loading}>Cargando recetas...</p>;
  if (error) return <p className={styles.error}>Error al cargar recetas.</p>;

  return (
    <>
          <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

   
    <div className={styles.container}>

      <Sidebar />
      <div className={styles.content}>
        <h2 className={styles.heading}>Dashboard</h2>

        <div className={styles.cardGrid}>
          <StatCard icon={<FaUtensils size={28} />} title="Recetas Disponibles" value={recetas.length} />
          <StatCard icon={<FaCarrot size={28} />} title="Ingredientes" value={ingredientesUnicos.length} />
          <StatCard icon={<FaClock size={28} />} title="Tiempo Promedio" value={`${tiempoPromedio} min`} />
        </div>
        <br />

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Todas las Recetas</h4>
          <TablaRecetas recetas={recetas} onRefresh={refetch} />
        </div>
      </div>
    </div>
     </>
  );
}