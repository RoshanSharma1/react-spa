import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import firebase from "./Firebase";

import Home from "./Home";
import Navigation from "./Navigation";
import WelCome from "./Welcome";
import Login from "./Login";
import Register from "./Register";
import Meetings from "./Meetings";
import Checkin from "./Checkin";
import Attendees from "./Attendees";


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userId: null,
      meetings: [],
      total: 0,
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((FBUser) => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userId: FBUser.uid,
        });
        const meetingref = firebase.database().ref("meetings/" + FBUser.uid);
        meetingref.on("value", (snapshot) => {
          let meets = snapshot.val();
          let meetingLists = [];
          for (let item in meets) {
            meetingLists.push({
              meetingID: item,
              meetName: meets[item].meetName,
            });
          }
          this.setState({
            meetings: meetingLists,
            total: meetingLists.length,
          });
        });
      } else {
        this.setState({
          user: null,
        });
      }
    });
  }

  registerUser = (userName) => {
    firebase.auth().onAuthStateChanged((FBUser) => {
      FBUser.updateProfile({
        displayName: userName,
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userId: FBUser.uid,
        });
        navigate("/meetings");
      });
    });
  };

  logoutUser = (e) => {
    e.preventDefault();
    this.setState({
      user: null,
      displayName: null,
      userId: null,
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };

  addMeetings = (meetName) => {
    const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);
    ref.push({ meetName: meetName });
  };

  render() {
    return (
      <div>
        <Navigation user={this.state.user} logoutUser={this.logoutUser} />
        {this.state.user && (
          <WelCome
            userName={this.state.displayName}
            logoutUser={this.logoutUser}
          />
        )}
        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" />
          <Meetings
            path="/meetings"
            meetings={this.state.meetings}
            addMeetings={this.addMeetings}
            userID={this.state.userId}
          />
          <Checkin path="/checkin/:userID/:meetingID" />
          <Attendees path="/attendees/:userID/:meetingID" adminUser ={this.state.userId} />
          <Register path="/register" registerUser={this.registerUser} />
        </Router>
      </div>
    );
  }
}

export default App;
