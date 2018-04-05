import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { userList } = this.props;
    // let suggestionList = Array.new(3);
    let suggestionList = Object.values(userList).slice(1, 4);

    return(
      <section className="sidebar">
        <div className="sidebar-wrapper">
          <div className="sidebar-follow sidebar-header"><div id="sidebar-icon-follow"/>Who to follow</div>
          <div className="sidebar-content">
            <ul className="sidebar-follow-user-list">
              {
                suggestionList.map(user => (
                  <li className="sidebar-follow-user-item" key={user.id}>
                    <div className="follow-list-user-avatar">
                      <Link to={`/${user.profile_url}`}>
                        <div className="follow-list-user-avatar-image" style={{ backgroundImage: `url(${user.profile_picture_url})` }}/>
                      </Link>
                    </div>
                    <div className="follow-list-user-info">
                      <div className="follow-list-username">
                        <Link to={`/${user.profile_url}`} title={`Visit ${user.display_name}'s profile`}>
                          <span>{user.display_name}</span>
                        </Link>
                      </div>
                      <div className="follow-list-extra">
                        <div className="follow-list-user-data">
                          <div className="icon-followers"/>
                          <span>{user.user_followers}</span>
                          <div className="icon-sounds"/>
                          <span>{user.user_sounds}</span>
                        </div>
                        <button className="follow-button" type="button">Follow</button>
                      </div>
                    </div>
                  </li>
                  )
                )
              }
            </ul>
          </div>
          <div className="sidebar-likes sidebar-header"><div id="sidebar-icon-likes"/>likes</div>
          <div className="sidebar-content">
          </div>
          <div className="sidebar-history sidebar-header"><div id="sidebar-icon-history"/>Listening history</div>
          <div className="sidebar-content">
          </div>
          <footer className="sidebar-footer">
            <a>Legal</a> - <a>Privacy</a> - <a>Cookies</a> - <a>Imprint</a> - <a>Popular searches</a>
          </footer>
        </div>
      </section>
    );
  }

}

export default Sidebar;
