import React from 'react';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <section className="sidebar">
        <div className="wrapper-sidebar">
          <div className="sidebar-follow">Who to follow</div>
          <div className="sidebar-likes">likes</div>
          <div className="sidebar-history">Listening history</div>
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
