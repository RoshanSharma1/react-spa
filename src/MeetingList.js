import { navigate } from "@reach/router";
import React, { Component } from "react";
import { GoListUnordered, GoTrashcan } from "react-icons/go";
import { FaLink } from "react-icons/fa";
import firebase from "./Firebase";

class MeetingList extends Component {
  constructor(props) {
    super();
    this.deleteMeetings = this.deleteMeetings.bind(this);
  }
  deleteMeetings(e, id) {
    e.preventDefault();
    const ref = firebase.database().ref(`meetings/${this.props.userID}/${id}`);
    ref.remove();
  }
  render() {
    const { meetings } = this.props;
    const myMeetings = meetings.map((item) => {
      return (
        <div className="list-group-item d-flex" key={item.meetingID}>
          <section
            className="btn-group align-self-center"
            role="group"
            aria-label="Meeting Options"
          >
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Delete Meeting"
              onClick={(e) => {
                this.deleteMeetings(e, item.meetingID);
              }}
            >
              <GoTrashcan />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Check In"
              onClick={(e) => {
                navigate(`/checkin/${this.props.userID}/${item.meetingID}`);
              }}
            >
              <FaLink />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Attendees List"
              onClick={(e) => {
                navigate(`/attendees/${this.props.userID}/${item.meetingID}`);
              }}
            >
              <GoListUnordered />
            </button>
          </section>
          <section className="pl-3 text-left align-self-center">
            {item.meetName}
          </section>
        </div>
      );
    });
    return <div>{myMeetings}</div>;
  }
}
export default MeetingList;
