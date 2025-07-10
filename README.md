🍳 Recetario App

Aplicación web de recetas, con login, CRUD de recetas, ingredientes y dashboard, desarrollada en React y conectada a backend Node.js + MySQL.

⸻

🚀 Tecnologías
	•	Frontend: React (Create React App)
	•	Backend: Node.js + Express (Railway)
	•	Base de datos: MySQL (Railway)
	•	Despliegue Frontend: Vercel

⸻

📂 Estructura del proyecto

/frontend  → React app
/backend   → Node.js API


⸻

🛠 Configuración local

1️⃣ Clonar el repo:

git clone https://github.com/tu-usuario/recetario-app.git
cd recetario-app/frontend

2️⃣ Instalar dependencias:

npm install

3️⃣ Crear archivo .env.local:

REACT_APP_API_URL=http://localhost:3001

4️⃣ Iniciar local:

npm start


⸻

🌍 Despliegue en Vercel

1️⃣ Subir frontend a GitHub.

2️⃣ En Vercel:
	•	Importar proyecto desde GitHub.
	•	Configurar en Settings → Environment Variables:

REACT_APP_API_URL=https://recetario-api-production.up.railway.app

3️⃣ Hacer Deploy.

✅ URL final:

https://tu-recetario-frontend.vercel.app


⸻

⚡ Funcionalidades

✅ Login de usuarios
✅ Listado y búsqueda de recetas
✅ CRUD de recetas e ingredientes
✅ Dashboard con estadísticas
✅ Cierre de sesión

⸻

💡 Notas importantes
	•	Backend en Railway: https://recetario-api-production.up.railway.app
	•	Base de datos: MySQL con recetas y usuarios de prueba.

⸻

✨ Créditos

Desarrollado por Emilio Pérez.
