import React from 'react';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let profile_url = this.props.location.pathname.split("/")[1];
    console.log(profile_url);
    this.props.fetchUserProfile(profile_url);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.fetchUserProfile(profile_url);
    }
  }

  render () {
    if (this.props.profile) {
      return (
        <section className="profile-page">
          {this.props.profile.display_name}
        </section>
      );
    } else {
      return null;
    }
  }
}

export default UserProfile;
