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
    let element = <SessionFormModal />
    if (currentUser) {
      element = <button onClick={this.handleLogout}>Logout</button>
    }
    return (
      <div id='nav-bar'>
        {element}
      </div>
    )
  }
}

export default NavBar;
