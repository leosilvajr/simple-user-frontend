import React from "react";
import Modal from "react-modal";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  // Defina o appElement para melhorar a acessibilidade
  React.useEffect(() => {
    Modal.setAppElement('#root'); // Definindo o appElement como o id "root"
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirmar Exclusão"
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      <h3>Tem certeza de que deseja excluir este usuário?</h3>
      <button onClick={onConfirm} className="btn btn-danger">
        Confirmar
      </button>
      <button onClick={onClose} className="btn btn-secondary ml-2">
        Cancelar
      </button>
    </Modal>
  );
};

export default ConfirmationModal;
