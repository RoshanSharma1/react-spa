import React, { Component } from "react";
import firebase from "./Firebase";
import AttendeesList from "./AttendeesList";
import { FaUndo, FaRandom } from "react-icons/fa";
class Attendees extends Component {
  constructor(props) {
    super();
    this.state = {
      displayAttendees: [],
      allAttendees: [],
      searchQuery: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.resetQuery = this.resetQuery.bind(this);
    this.chooseRandom = this.chooseRandom.bind(this);
  }
  chooseRandom(e) {
    e.preventDefault();
    const randomAtttendees = Math.floor(
      Math.random() * this.state.allAttendees.length
    );
    this.resetQuery(e);
    this.setState({
      displayAttendees: [this.state.allAttendees[randomAtttendees]],
    });
  }
  resetQuery(e) {
    e.preventDefault();
    this.setState({
      searchQuery: "",
    });
  }
  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({
      [itemName]: itemValue,
    });
  }
  componentDidMount() {
    const ref = firebase
      .database()
      .ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`);
    ref.on("value", (snapshot) => {
      let attendees = snapshot.val();

      let attendeelists = [];

      for (let item in attendees) {
        attendeelists.push({
          attendeeID: item,
          attendeeName: attendees[item].attendeeName,
          attendeeEmail: attendees[item].attendeeEmail,
          star: attendees[item].star,
        });
      }
      this.setState({
        displayAttendees: attendeelists,
        allAttendees: attendeelists,
      });
    });
  }

  render() {
    const dataFilter = (item) =>
      item.attendeeName
        .toLowerCase()
        .match(this.state.searchQuery.toLowerCase());
    const filteredAttendees = this.state.displayAttendees.filter(dataFilter);
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="font-weight-light text-center">Attendees</h1>

            <div className="card bg-light mb-4">
              <div className="card-body text-center">
                <div className="input-group  input-group-lg">
                  <input
                    type="text"
                    name="searchQuery"
                    value={this.state.searchQuery}
                    placeholder="Search Attendees"
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-sm btn-outline-info"
                      title="Reset Search"
                      onClick={this.resetQuery}
                    >
                      <FaUndo />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-info"
                      title="Pick a random attendee"
                      onClick={this.chooseRandom}
                    >
                      <FaRandom />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AttendeesList
          userID={this.props.userID}
          adminUser={this.props.adminUser}
          attendees={filteredAttendees}
          meetingID={this.props.meetingID}
        />
      </div>
    );
  }
}
export default Attendees;
