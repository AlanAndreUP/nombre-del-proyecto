import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import './css/calendario.css';

const customModalStyles = {
  content: {
    width: '300px', // Ajusta el ancho del modal según tus necesidades
    height: '200px', // Ajusta la altura del modal según tus necesidades
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

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
    <div className="calendar-container">
      <h1 className="calendar-title">Calendario</h1>
      <Calendar onClickDay={handleDateClick} className="custom-calendar" />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Event Modal"
        style={customModalStyles}
      >
        <h2>Entrega Pendientes</h2>
        {selectedDate && <p>Fecha: {selectedDate.toDateString()}</p>}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default CalendarExample;
