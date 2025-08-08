import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";
import { FaEdit, FaTrash } from "react-icons/fa";  // Ícones de edição e lixeira
import UserFormModal from "./UserFormModal";
import ConfirmationModal from "./ConfirmationModal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await api.get(`/usuarios?page=${currentPage}&pageSize=10`);
      setUsers(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error("Erro ao carregar os usuários");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const handleDelete = async () => {
    if (selectedUser) {  // Verifique se o usuário foi selecionado
      try {
        await api.delete(`/usuarios/${selectedUser.id}`);
        toast.success("Usuário excluído com sucesso!");
        fetchUsers();
        setIsConfirmDeleteOpen(false);
      } catch (error) {
        toast.error("Erro ao excluir o usuário");
      }
    } else {
      toast.error("Nenhum usuário selecionado para exclusão");
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <button onClick={handleAdd} className="btn btn-primary">Adicionar Usuário</button>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => handleEdit(user)}
                  className="edit-btn"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => {
                    setSelectedUser(user);  // Define o usuário selecionado antes de abrir o modal de exclusão
                    setIsConfirmDeleteOpen(true);  // Abre o modal de confirmação
                  }}
                  className="delete-btn"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="pagination-container">
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className="page-link"
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próximo
        </button>
      </div>

      <UserFormModal
        isOpen={isModalOpen}
        user={selectedUser}
        onClose={() => setIsModalOpen(false)}
        onUserUpdated={fetchUsers}
      />
      <ConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleDelete}  // Passa a função handleDelete para o modal de confirmação
      />
    </div>
  );
};

export default UserList;
