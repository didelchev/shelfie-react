import React from "react";
import { useState } from "react";
import "./SelectShelfComponent.css";
import { addBookToShelf } from "../../api/books-api";

const SelectShelfComponent = ({ bookId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const selectShelfHandler = async ( e ) => {
      e.preventDefault();
      try {

        const shelf = e.target.value

        await addBookToShelf(bookId, { shelf })
        
        closeModal();

        
      } catch (error) {
        console.log(error)
      }

    }

  return (
    <div className="trigger-and-modal-container">
      <button onClick={openModal} className="contextual-trigger-button">
        Add to Library
      </button>

      {isModalOpen && (
        <>
          <div className="invisible-close-area" onClick={closeModal} />

          <div
            className="contextual-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Choose a shelf for this book</h3>
              <span className="close-x" onClick={closeModal}>
                &times;
              </span>
            </div>

            <div className="option-group">
              <button
                className="popover-option-button primary"
                value='toRead'
                onClick={selectShelfHandler}
              >
                Want to read
              </button>
              <button
                className="popover-option-button primary"
                onClick={selectShelfHandler}
                value="currReading"
              >
                Currently reading
              </button>
              <button
                className="popover-option-button primary"
                value='read'
                onClick={selectShelfHandler}
              >
                Read
              </button>
            </div>

            <button
              className="popover-continue-button"
              onClick={() => closeModal()}
            >
              Continue to tags
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectShelfComponent;
