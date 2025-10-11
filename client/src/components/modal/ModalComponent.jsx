import React from 'react'
import { useState } from 'react';

const ModalComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <button onClick={openModal}>
        Open Mini Window
      </button>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>This is your mini window!</h2>
            <p>Content goes here.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
    
  )
}

export default ModalComponent