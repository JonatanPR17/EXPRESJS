// Carga la configuración de las variables de entorno
require("dotenv").config();

// Trae la instancia de Neon
const { neon } = require("@neondatabase/serverless"); 

// Importar el módulo express (trae la instancia de express)
const express = require('express');

// Crear una aplicación de Express (configura Express)
const app = express();

// Definir un puerto
const PORT = process.env.PORT || 3000;

// Se crea la conexión con Neon
const sql = neon(process.env.DATABASE_URL);

// Definir una ruta básica
app.get('/', async (req, res) => {

  // Ejecuta la consulta SQL
  const result = await sql`SELECT * FROM tareas`;

  // Genera la tabla HTML con los resultados
  let html = `
    <html>
      <head>
        <title>Lista de Tareas</title>
        <style>
          body {
            font-family: 'Verdana', sans-serif;
            background-color: #2c3e50;
            color: #ecf0f1;
            margin: 0;
            padding: 20px;
          }
          h1 {
            text-align: center;
            color: #e74c3c;
          }
          table {
            width: 70%;
            margin: 0 auto;
            border-collapse: collapse;
            background-color: #34495e;
            border-radius: 8px;
            box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
          }
          th, td {
            padding: 14px;
            text-align: center;
            border: 1px solid #7f8c8d;
          }
          th {
            background-color: #e74c3c;
            color: #fff;
          }
          tr:nth-child(even) {
            background-color: #95a5a6;
          }
          tr:nth-child(odd) {
            background-color: #7f8c8d;
          }
          tr:hover {
            background-color: #16a085;
            color: white;
          }
          td {
            color: #ecf0f1;
          }
        </style>
      </head>
      <body>
        <h1>Lista de Tareas</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>`;

  // Añadir las tareas a la tabla
  result.forEach(tarea => {
    html += `
      <tr>
        <td>${tarea.id}</td>
        <td>${tarea.titulo}</td>
        <td>${tarea.descripcion}</td>
      </tr>`;
  });

  html += `
          </tbody>
        </table>
      </body>
    </html>`;

  // Enviar la respuesta HTML
  res.send(html);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
