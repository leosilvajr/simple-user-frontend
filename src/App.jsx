import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importando os estilos de toast
import UserList from "./components/UserList";
import "./App.css"; // Importando o arquivo de estilos específicos do App

const App = () => {
  return (
    <div className="container">
      <h1>Gerenciamento de Usuários</h1>
      <UserList />
      <ToastContainer />
    </div>
  );
};

export default App;
