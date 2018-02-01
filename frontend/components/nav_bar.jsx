import React from 'react';
import { Link } from 'react-router-dom';
import SessionFormModal from './session_form_modal';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault;
    this.props.logout();
  }

  render () {
    const { currentUser } = this.props;
    let element = <SessionFormModal receiveFormType={this.props.receiveFormType}/>
    if (currentUser) {
      element = (
        <div className="session-button-div">
          <button className="session-button" id='logout-btn' onClick={this.handleLogout}>Logout</button>
        </div>
      )
    }
    return (
      <div id='nav-bar'>
        <div className="splash-logo">
          <h1>ELITEBEATS</h1>
        </div>
        {element}
      </div>
    )
  }
}

export default NavBar;
