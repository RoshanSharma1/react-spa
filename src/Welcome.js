import React, { Component } from "react";
import { Link } from "@reach/router";

class WelCome extends Component {
  render() {
    const { userName, logoutUser } = this.props;
    return (
      <div className="text-center mt-4">
        <span className="text-secondary font-weight-bold pl-1">
          Welcome {userName}
        </span>
        ,
        <Link
          to="/"
          className="text-primary font-weight-bold pl-1"
          onClick={(e) => logoutUser(e)}
        >
          Log out
        </Link>
      </div>
    );
  }
}
export default WelCome;
