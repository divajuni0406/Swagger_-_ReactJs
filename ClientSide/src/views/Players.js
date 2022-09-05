import React, { useState, useEffect } from "react";
import PlayerModal from "../components/PlayerModal";
import { Container, Table, Button, InputGroup, Form } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { EventBus } from "../EventBus";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [dummyPlayers, setDummyPlayers] = useState([]);
  const [searches, setSearches] = useState("");

  useEffect(() => {
    search();
  }, [searches]);

  const search = () => {
    let results = [];
    let resultIndex = [];

    for (let i = 0; i < dummyPlayers.length; i++) {
      for (let key in dummyPlayers[i]) {
        let indexKey = dummyPlayers[i][key].toLowerCase();
        let searchValue = searches.toLowerCase();

        if (indexKey.indexOf(searchValue) !== -1 && !resultIndex.includes(i)) {
          resultIndex.push(i);
          results.push(dummyPlayers[i]);
        }
      }
    }

    setPlayers([...results]);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    EventBus.$emit("show-player-dialog");
  };

  // edit button
  const handleEdit = (index) => {
    EventBus.$emit("show-player-dialog", players[index], index);
  };

  // delete button
  const handleDelete = (index) => {
    confirmAlert({
      title: "Confirm Delete..!!!",
      message: "Are you sure delete this data ?.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            players.splice(index, 1);
            let dataPlayers = players;
            setPlayers([...dataPlayers]);
            setDummyPlayers([...dataPlayers]);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  // save button trigger
  EventBus.$on("save-player", (payload, index) => {
    if (index !== undefined) {
      players[index] = payload;
      setPlayers([...players]);
      setDummyPlayers([...players]);
    } else {
      setPlayers([...players, payload]);
      setDummyPlayers([...players, payload]);
    }
  });

  return (
    <Container className="pt-5">
      <PlayerModal />
      <div className="d-flex justify-content-between mb-3">
        <div>
          <Button variant="success" onClick={handleAdd} className="rounded-circle" style={{ width: "50px" }}>
            <i className="bi bi-plus-lg" style={{ color: "white", fontSize: "20px" }}></i>
          </Button>
        </div>
        <div>
          <InputGroup className="mb-3">
            <Form.Control placeholder="Search" value={searches} onChange={(e) => setSearches(e.target.value)} aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <Button variant="dark" id="button-addon2" onClick={search}>
              Search <i className="bi bi-search ms-1"></i>
            </Button>
          </InputGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12" id="width-table">
          <Table striped bordered hover variant="dark" className="text-center table">
            <thead>
              <tr>
                <th className="col">No</th>
                <th className="col">Username</th>
                <th className="col">Email</th>
                <th className="col">Experience</th>
                <th className="col">Level</th>
                <th colSpan={2} className="col-md-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {players.length === 0 && (
                <tr>
                  <td colSpan={6}> No Player Data</td>
                </tr>
              )}
              {players.map((player, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{player.username}</td>
                    <td>{player.email}</td>
                    <td>{player.experience}</td>
                    <td>{player.level}</td>
                    <td>
                      <Button variant="primary" onClick={() => handleEdit(index)} id="edit-btn">
                        Edit <i className="bi bi-pencil-fill ms-1 edit"></i>
                      </Button>
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => handleDelete(index)} id="delete-btn">
                        Delete <i className="bi bi-trash3-fill ms-1 delete"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <h3 id="hp-text">Landscape Position Required</h3>
        </div>
      </div>
    </Container>
  );
};

export default Players;
