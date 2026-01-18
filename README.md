📦 Proyecto 6 – Backend con Autenticación y Autorización

🧠 Descripción

Este proyecto corresponde al Proyecto 6: Aplicación Backend con Autenticación, cuyo objetivo es desarrollar una API REST utilizando Node.js, Express y MongoDB, implementando un sistema de autenticación y autorización mediante JWT.

La aplicación permite:
	•	Registro e inicio de sesión de usuarios
	•	Protección de rutas mediante middleware
	•	Gestión de un modelo de Producto relacionado con el usuario
	•	Operaciones CRUD completas sobre los productos

⸻

🚀 Tecnologías utilizadas
	•	Node.js
	•	Express.js
	•	MongoDB
	•	Mongoose
	•	JSON Web Tokens (JWT)
	•	bcryptjs
	•	dotenv
	•	cors
	•	Postman (para pruebas)
📁 Estructura del proyecto
Proyecto6_UDD
├─ controllers
│  ├─ userController.js
│  └─ productController.js
├─ middleware
│  └─ authMiddleware.js
├─ models
│  ├─ userModel.js
│  └─ productModel.js
├─ routes
│  ├─ userRoutes.js
│  └─ productRoutes.js
├─ .env
├─ .gitignore
├─ package.json
├─ README.md
└─ server.js
🔐 Autenticación y autorización

La autenticación se implementa utilizando JWT (JSON Web Tokens).
	•	Al iniciar sesión, el servidor genera un token JWT.
	•	Las rutas protegidas requieren el envío del token mediante el header:
    Authorization: Bearer <token>
    •	Un middleware (protect) valida el token antes de permitir el acceso.
🧪 Pruebas

Las pruebas de los endpoints se realizaron utilizando Postman, verificando:
	•	Registro de usuarios
	•	Login y generación de token
	•	Acceso a rutas protegidas con token válido
	•	Restricción de acceso sin token
	•	CRUD completo de productos

⸻

⚙️ Variables de entorno

Crear un archivo .env en la raíz del proyecto con las siguientes variables:
PORT=5050
MONGO_URI=mongodb://localhost:27017/proyecto6
JWT_SECRET=tu_clave_secreta

▶️ Ejecución del proyecto
	1.	Instalar dependencias:
    npm install 
    2.	Ejecutar servidor:
    node server.js
    3.	El servidor se ejecutará en:
    http://localhost:5050
