import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Assignments from "./Assignments";
import "./SecretSantaGenerator.css"; // Import CSS for custom styles

const SecretSantaGenerator = () => {
  const [participantsInput, setParticipantsInput] = useState(
    "Yumi,Massao,Celia,Yuri,Marcella,Haruki,Adriana Haruki,Isabelli,Selma,Taeco,Nando,Deise,Eigi,Adriana Eigi,Juju,Kiki"
  );
  const [event, setEvent] = useState(null);

  const handleParticipantChange = (e) => {
    setParticipantsInput(e.target.value);
  };

  const handleCreateEvent = () => {
    const participantsArray = participantsInput
      .split(",")
      .map((participant) => participant.trim());

    const newEvent = {
      participants: participantsArray,
    };

    setEvent(newEvent);
  };

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">🎅 Secret Santa Generator 🎁</h1>

      <Form.Group>
        <Form.Label>Enter Participants (comma-separated)</Form.Label>
        <Form.Control
          as="textarea"
          value={participantsInput}
          rows={5}
          onChange={handleParticipantChange}
        />
      </Form.Group>
      <div className="d-flex justify-content-between mt-2 mb-3">
        <Button onClick={handleCreateEvent}>Generate Assignments</Button>
      </div>
      <Assignments /* resetEvent={handleEventCreation}  */ newEvent={event} />
    </Container>
  );
};

export default SecretSantaGenerator;
