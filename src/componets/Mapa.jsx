import React, { useState } from "react";
import Calendar from "react-calendar";
import {
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
  Input,
} from "reactstrap";

const CalendarExample = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [ventanaFlotante, setVentanaFlotante] = useState(false);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const toggleVentanaFlotante = () => {
    setVentanaFlotante(!ventanaFlotante);
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
        <ModalHeader>
          <div>
            <h3>Entrega Pedientes</h3>
            {selectedDate && <p>Date: {selectedDate.toDateString()}</p>}
          </div>
        </ModalHeader>
        <ModalBody>
          <Button
            color="dark"
            onClick={toggleVentanaFlotante}
            className="w-100"
          >
            *producto*
          </Button>

          {ventanaFlotante && (
            <div
              className="ventana-flotante"
              style={{ backgroundColor: "#212529", color: "white" }}
            >
              <br />
              <br />
              <FormGroup style={{ display: "flex" }}>
                <label>Tienda: </label>
                <input className="form-control" readOnly type="text" />
                <Button color="warning">Ver Nota</Button>
              </FormGroup>
              <br />

              <FormGroup>
                <label>Descripcion</label>
                <input className="form-control" readOnly type="text" />
              </FormGroup>
              <br />
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CalendarExample;