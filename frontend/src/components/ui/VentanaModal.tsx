import React, { useState } from 'react';
import Modal from 'react-modal';
export const VentanaModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Alerta</h2>
        <p>Por favor complete todos los campos.</p>
        <button onClick={() => setModalIsOpen(false)}>Cerrar</button>
    </Modal>
  )
}
