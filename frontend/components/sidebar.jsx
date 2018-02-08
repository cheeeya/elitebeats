import React from 'react';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <section className="sidebar">
        <div className="sidebar-wrapper">
          <div>Who to follow</div>
          <div>likes</div>
          <div>Listening history</div>
          <footer>
            <a>Legal</a>
            <a>Privacy</a>
            <a>Cookies</a>
            <a>Imprint</a>
            <a>Popular searches</a>
          </footer>
        </div>
      </section>
    );
  }

}

export default Sidebar;
