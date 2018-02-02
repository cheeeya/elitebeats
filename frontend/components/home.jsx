import React from 'react';
import NavBarContainer from './nav_bar_container';


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <header>
          <NavBarContainer />
        </header>
      </div>
    );
  }
}

export default Home;
