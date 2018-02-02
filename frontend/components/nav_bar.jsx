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
    let element = <SessionFormModal receiveFormType={this.props.receiveFormType} loc='nav-bar'/>
    if (currentUser) {
      element = (
        <div className="session-button-div">
          <button className="session-button" id='logout-btn' onClick={this.handleLogout}>Logout</button>
        </div>
      )
    }
    return (
      <header>
        <div id='nav-bar'>
          <div className="nav-logo">
            <Link to="/home" className="root-link"><img className="logo-blue" src="http://res.cloudinary.com/samueldchia/image/upload/v1517614712/LOGO-blue_v54gez.jpg"></img></Link>
          </div>
          <div className="left-nav">
            <ul>
              <li><Link to="/home" className="left-nav-link">Home</Link></li>
              <li><Link to="/collection" className="left-nav-link">Collection</Link></li>
            </ul>
          </div>
          {element}
        </div>
      </header>
    )
  }
}

export default NavBar;
