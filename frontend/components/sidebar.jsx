import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleFollow = this.toggleFollow.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  toggleFollow(userId, userUrl) {
    return e => {
      const { currentUser, follow, unfollow } = this.props;
      e.preventDefault();
      if (currentUser.user_followings.indexOf(userId) >= 0) {
        unfollow(userId, userUrl, "");
      } else {
        follow(userId, userUrl, "");
      }
    }
  }

  clickExternalLogo (site) {
    return (e) => {
      if (site === "github") {
        window.open("https://github.com/cheeeya/elitebeats");
      } else {
        window.open("https://www.linkedin.com/in/samuel-chia-3422b8118/");
      }
    }
  }

  render() {
    const { userList, currentUser } = this.props;
    let suggestionList = Object.keys(userList).map(el => userList[el]).slice(1,4), tracksTitle = "",
        followersTitle ="";

    return(
      <section className="sidebar">
        <div className="sidebar-wrapper">
          <div className="sidebar-follow sidebar-header">
            <div id="sidebar-icon-follow" />
            Who to follow
          </div>
          <div className="sidebar-content">
            <ul className="sidebar-follow-user-list">
              {
                suggestionList.map(user => {
                  let followText = "Follow";
                  if (currentUser.user_followings.indexOf(user.id) >= 0) {
                    followText = "Following";
                  }
                  tracksTitle = `${user.user_sounds} track`;
                  if (user.user_sounds === 0 || user.user_sounds > 1) {
                    tracksTitle += "s";
                  }
                  followersTitle = `${user.user_followers.length} follower`;
                  if (user.user_followers.length === 0 || user.user_followers.length > 1) {
                    followersTitle += "s";
                  }
                  return (
                    <li className="sidebar-follow-user-item" key={user.id}>
                      <div className="follow-list-user-avatar">
                        <Link to={`/${user.profile_url}`}>
                          <div
                            className="follow-list-user-avatar-image"
                            style={{ backgroundImage: `url(${user.profile_picture_url})` }}
                          />
                        </Link>
                      </div>
                      <div className="follow-list-user-info">
                        <div className="follow-list-username">
                          <Link
                            to={`/${user.profile_url}`}
                            title={`Visit ${user.display_name}'s profile`}
                          >
                            <span>{user.display_name}</span>
                          </Link>
                        </div>
                        <div className="follow-list-extra">
                          <div className="follow-list-user-data">
                            <div className="user-details" title={followersTitle}>
                              <div className="icon-followers" />
                              <span>{user.user_followers.length}</span>
                            </div>
                            <div className="user-details" title={tracksTitle}>
                              <div className="icon-sounds" />
                              <span>{user.user_sounds}</span>
                            </div>
                          </div>
                          <button
                            className={`follow-button ${followText.toLowerCase()}`}
                            type="button"
                            title={followText === "Follow" ? followText : "Unfollow"}
                            onClick={this.toggleFollow(user.id, user.profile_url)}
                          >
                            {followText}
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="sidebar-likes sidebar-header">
            <div id="sidebar-icon-likes" />
            likes
          </div>
          <div className="sidebar-content">

          </div>
          <div className="sidebar-history sidebar-header">
            <div id="sidebar-icon-history" />
            Listening history
          </div>
          <div className="sidebar-content">

          </div>
          <footer className="sidebar-footer">
            <a>Legal</a> - <a>Privacy</a> - <a>Cookies</a> - <a>Imprint</a> - <a>Popular searches</a>
            <div className="sidebar-external-links">
              <div className="sidebar-external-buttons-wrap">
                <button
                  className="external-link-button-small"
                  title="Github"
                  type="button"
                  onClick={this.clickExternalLogo("github")}
                  >
                  <div className="github-mark-small external-link-small" />
                </button>
                <button
                  className="external-link-button-small"
                  title="LinkedIn"
                  type="button"
                  onClick={this.clickExternalLogo("linkedin")}
                  >
                  <div className="linkedin-mark-small external-link-small" />
                </button>
              </div>
            </div>
          </footer>
        </div>
      </section>
    );
  }

}

export default Sidebar;
