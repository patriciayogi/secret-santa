import React, { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";

export default function Assignments({ newEvent, resetEvent }) {
  const [assignments, setAssignments] = useState([]);
  const [showAssignments, setShowAssignments] = useState(false);

  useEffect(() => {
    handleAssignments();
  }, [newEvent]);

  const handleAssignments = () => {
    if (newEvent?.participants) {
      const shuffledParticipants = shuffle(newEvent.participants.length);

      const newAssignments = newEvent.participants.map(
        (participant, index) => ({
          giver: participant,
          receiver: newEvent.participants[shuffledParticipants[index]],
        })
      );

      setAssignments(newAssignments);
    }
  };

  const shuffle = (participants) => {
    let shuffled = [];
    for (let i = 0; i < participants; i++) {
      let j = -1;
      while (shuffled.includes(j) || j == -1 || j == i) {
        j = Math.floor(Math.random() * participants);
        if (i == participants - 1 && i == j) return shuffle(participants);
      }
      shuffled.push(j);
    }
    return shuffled;
  };

  const assign = (assignment) => {
    return `${assignment.giver}, seu amigo secreto eh: ${assignment.receiver}`;
  };

  const toggleAssignments = () => {
    setShowAssignments(!showAssignments);
  };

  return (
    <section id="assignments">
      <div className="d-flex justify-content-between mt-2 mb-3">
        {assignments.length > 0 && (
          <Button onClick={toggleAssignments}>
            {showAssignments ? "Hide Assignments" : "Show Assignments"}
          </Button>
        )}
      </div>
      {showAssignments && (
        <ListGroup>
          <h2>📜 Assignments 🎄</h2>
          {assignments.map((assignment, index) => (
            <ListGroup.Item
              key={index}
              className={`${
                assignment.receiver === assignment.giver && "bg-indigo-500"
              }`}
            >
              {assignment.giver}, seu amigo secreto: {assignment.receiver}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </section>
  );
}
