import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';

const CalendarExample = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1></h1>
      <Calendar onClickDay={handleDateClick} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Event Modal"
      >
        <h2>Entrega Pedientes</h2>
        {selectedDate && (
          <p>
            Date: {selectedDate.toDateString()}
          </p>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default CalendarExample;
