import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";  // Importando o arquivo de estilos globais
import App from "./App";

// Criando a raiz para o React
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderizando o componente principal
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
