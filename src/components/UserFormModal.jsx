import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import api from "../api";
import { toast } from "react-toastify";

const UserFormModal = ({ isOpen, onClose, user, onUserUpdated }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  // Defina o appElement para melhorar a acessibilidade
  useEffect(() => {
    Modal.setAppElement('#root'); // Definindo o appElement como o id "root"
  }, []);

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
      setSenha(user.senha);
      setTelefone(user.telefone);
      setEndereco(user.endereco);
      setDataNascimento(user.dataNascimento);
    } else {
      setNome('');
      setEmail('');
      setSenha('');
      setTelefone('');
      setEndereco('');
      setDataNascimento('');
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      if (user) {
        await api.put(`/usuarios/${user.id}`, {
          nome,
          email,
          senha,
          telefone,
          endereco,
          dataNascimento,
        });
        toast.success("Usuário atualizado com sucesso!");
      } else {
        await api.post("/usuarios", {
          nome,
          email,
          senha,
          telefone,
          endereco,
          dataNascimento,
        });
        toast.success("Usuário criado com sucesso!");
      }
      onUserUpdated(); // Atualizar a lista de usuários
      onClose();
    } catch (error) {
      toast.error("Erro ao salvar o usuário");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="User Form"
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      <h2>{user ? "Editar Usuário" : "Adicionar Usuário"}</h2>
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />
        <input
          type="date"
          className="form-control"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary mt-3">
        {user ? "Salvar Alterações" : "Adicionar Usuário"}
      </button>
      <button onClick={onClose} className="btn btn-secondary mt-3 ml-2">
        Cancelar
      </button>
    </Modal>
  );
};

export default UserFormModal;
