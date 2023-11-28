import React, { useState, useEffect } from "react";
import { ListGroup, Button, Form } from "react-bootstrap";

export default function Assignments({ newEvent }) {
  const [assignments, setAssignments] = useState([]);
  const [showAssignments, setShowAssignments] = useState(false);
  const [participantEmails, setParticipantEmails] = useState([]);

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

  const handleEmailChange = (e, index) => {
    const emails = [...participantEmails];
    emails[index] = e.target.value;
    setParticipantEmails(emails);
  };

  const sendEmails = () => {
    console.log("Sending emails to:", participantEmails);
    alert("Update your settings: YOUR_SERVICE_ID");
    participantEmails.forEach((email, index) => {
      const templateParams = {
        to_email: email,
        assignment: assignments[index].receiver,
        // Add other template parameters if needed
      };

      // Go to EmailJS and sign up for an account.
      //Create an email service and a template in the EmailJS dashboard. Note down your USER_ID, SERVICE_ID, and TEMPLATE_ID
      emailjs
        .send(
          "YOUR_SERVICE_ID",
          "YOUR_TEMPLATE_ID",
          templateParams,
          "YOUR_USER_ID"
        )
        .then((response) => {
          console.log("Email sent!", response);
          alert("Emails sent successfully! (This is a simulation)");
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
    });
  };

  const toggleAssignments = () => {
    setShowAssignments(!showAssignments);
  };

  return (
    <section id="assignments">
      <Form.Group>
        <ListGroup>
          {assignments.length > 0 && <h2>📜 Assignments 🎄</h2>}
          {assignments.map((assignment, index) => (
            <ListGroup.Item
              key={index}
              className={`border-gray-700 bg-gray-900 ${
                assignment.receiver === assignment.giver && "bs-indigo-500"
              }`}
            >
              {assignment.giver}, here is your secret santa assignment{"  "}
              {!showAssignments && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-question-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                </svg>
              )}
              {showAssignments && assignment.receiver}
              <Form.Control
                key={index}
                type="email"
                placeholder={`Enter ${assignment.giver}s Email`}
                onChange={(e) => handleEmailChange(e, index)}
                className="border-gray-700 bg-gray-900 input textarea "
              />
              {/* {emails && assignment.receiver} */}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Form.Group>
      <div className="d-flex justify-content-between mt-2 mb-3 border-gray-700 bg-gray-900">
        {assignments.length > 0 && (
          <>
            <Button onClick={toggleAssignments}>
              {showAssignments ? "Hide Assignments" : "Show Assignments"}
            </Button>
            <Button variant="success" onClick={sendEmails}>
              Send Emails to Participants
            </Button>
            {/* <Button>Send e-mail</Button> */}
          </>
        )}
      </div>
    </section>
  );
}
