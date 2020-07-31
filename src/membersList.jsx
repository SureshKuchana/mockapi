import React, { Component, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css";

export default class MembersList extends Component {
  state = { members: [] };
  componentDidMount() {
    axios
      .get(
        `https://my-json-server.typicode.com/SureshKuchana/reactmock/members`
      )
      .then(res => {
        const members = res.data;
        this.setState({ members })
      });
  }

  render() {
    const users = this.state.members;
    return (
      <React.Fragment>
        <div className='jumbotron text-center'>
        <h1 className="display-2 pb-3">Users List</h1>
            <Mem data={users} />
      </div>
      </React.Fragment>
    );
  }
}
Modal.setAppElement("#root")
function Mem({ data }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userIndex, setIndex] = useState({
    name: "",
    activity_periods: []
  });

  const sendData = user => {
    setIndex({
      name: user.real_name,
      tzCountry: user.tz,
      tzState: user.tz,
      activity_periods: user.activity_periods,
    });
    
  };
  return (
    <div>
      {data.map(user => (
        <Button
        variant="outline-primary"
          key={user.id}
          onClick={() => {
            setModalIsOpen(true)
            sendData(user)
          }}
        >
          <h1>{user.real_name}</h1>
        </Button>
      ))}
      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div className='text-center'>
        <Button variant="outline-success">{userIndex.name}</Button>{' '}
        <h1 className="display-4">Country {userIndex.tzCountry}</h1>
        {userIndex.activity_periods.map((activity, index) => (
          <h3 key={index}>
            Start time {activity.start_time} End time {activity.end_time}
          </h3>
        ))}
        {/* <button className="close-btn" onClick={() => setModalIsOpen(false)}>Close</button> */}
        <Button variant="danger" onClick={() => setModalIsOpen(false)}>Close</Button> 
        </div>

      </Modal>
    </div>
  );
}
