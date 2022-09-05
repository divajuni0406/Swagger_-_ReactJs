import React, { useState } from "react";
import { Button, Modal, Row, Form, Col } from "react-bootstrap";
import { EventBus } from "../EventBus";

function PlayerModal() {
  // trigger open modal
  const [show, setShow] = useState(false);
  const [indexPlayer, setIndexPlayer] = useState();
  const [notifForm, setNotifForm] = useState("");
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [level, setLevel] = useState("");

  const resetForm = () => {
    setNotifForm("");
    setUsername("");
    setEmail("");
    setExperience("");
    setLevel("");
    setIndexPlayer();
  };

  const handleClose = () => {
    setNotifForm("");
    setShow(false);
    resetForm();
  };

  // edit btn & add btn
  EventBus.$on("show-player-dialog", (payload = "", index = "") => {
    // edit
    if (payload) {
      setTitle("Edit Players");
      setUsername(payload.username);
      setEmail(payload.email);
      setExperience(payload.experience);
      setLevel(payload.level);
      setIndexPlayer(index);
    } else {
      // add
      setTitle("New Players");
    }
    setShow(true);
    return;
  });

  // button save
  const save = (e) => {
    e.preventDefault();
    if (username === "" || email === "" || experience === "" || level === "") {
      return setNotifForm("Please Fill The Form Completly !!!");
    } else {
      EventBus.$emit(
        "save-player",
        {
          username: username,
          email: email,
          experience: experience,
          level: level,
        },
        indexPlayer
      );
      resetForm();
      handleClose();
      return;
    }
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false} className="bg-modal">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
          <Modal.Title className="ms-5" style={{ color: "red" }}>
            {notifForm}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-3 px-5">
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintexttext">
              <Form.Label column sm="2" className="text-form">
                Username
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintexttext">
              <Form.Label column sm="2" className="text-form">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintexttext">
              <Form.Label column sm="2" className="text-form">
                Experience
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintexttext">
              <Form.Label column sm="2" className="text-form">
                Level
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Level" value={level} onChange={(e) => setLevel(e.target.value)} />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={save}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PlayerModal;
