import React from 'react';

class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);
    let { profile } = props;
    this.oldUrl = profile.profile_url;
    this.changed = false;
    this.usedUrls = [];
    this.pLinkErrorDisabled = "disabled";
    this.validationError = "";
    this.errorMessage = "";
    this.saveButtonDisabled = "disabled-save-button";
    this.reservedLinks = ["stream", "home", "collection", "upload",
      "charts", "discover", "search"];
    this.state = {
      bio: profile.bio,
      city: profile.city,
      country: profile.country,
      display_name: profile.display_name,
      first_name: profile.first_name,
      last_name: profile.last_name,
      profile_url: profile.profile_url,
      profile_picture_url: profile.profile_picture_url,
      newError: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkRedirect = this.checkRedirect.bind(this);
  }

  handleInput(field) {
    return e => {
      let input = e.target.value;
      if (this.state[field] !== input) {
        this.resetErrors();
        this.changed = true;
        this.setState({ [field]: input, newError: false })
      }
    }
  }

  cancelEdit(e) {
    e.preventDefault();
    window.closeProfileEdit();
  }

  checkRedirect() {
    if (this.oldUrl !== this.state.profile_url) {
      this.props.history.push(`/${this.state.profile_url}`)
    }
  }

  resetErrors() {
    this.pLinkErrorDisabled = "disabled";
    this.validationError = "";
    this.errorMessage = "";
    this.saveButtonDisabled = "disabled-save-button";
  }

  setErrorMessage(message) {
    this.pLinkErrorDisabled = "";
    this.validationError = "validation-error"
    this.errorMessage = message;
    this.saveButtonDisabled = "disabled-save-button";
  }

  clickUrlEdit(e) {
    e.preventDefault();
    document.getElementById("pf-profile-url").select();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { bio, city, country, display_name, first_name, last_name, profile_url } = this.state;
    const formData = new FormData();
    formData.append("user[bio]", bio);
    formData.append("user[city]", city);
    formData.append("user[country]", country);
    formData.append("user[display_name]", display_name);
    formData.append("user[first_name]", first_name);
    formData.append("user[last_name]", last_name);
    formData.append("user[profile_url]", profile_url);
    this.props.update(formData, this.props.currentUserId)
      .then(
        window.closeProfileEdit,
        errors => {
          this.usedUrls.push(profile_url);
          this.setState({ newError: true })
        }).then(this.checkRedirect);
  }

  render() {
    let { bio, city, country, display_name, first_name,
      last_name, profile_url, profile_picture_url, newError } = this.state;
    const permalinkRegex = /^[a-z0-9_-]*$/;
    if (this.changed) {
      this.saveButtonDisabled = "";
    }
    if (this.reservedLinks.includes(profile_url)) {
      this.setErrorMessage("This permalink is reserved. Enter another one.");
    }
    if (this.props.errors.includes("Profile url has already been taken") && (this.usedUrls.includes(profile_url) || newError)) {
      this.setErrorMessage("This profile URL is already in use. Try a different one.");
    }
    if (!profile_url) {
      this.setErrorMessage("Enter a profile URL");
    }else if (!permalinkRegex.test(profile_url)) {
      this.setErrorMessage("Use only numbers, lowercase letters, underscores, or hyphens.");
    }
    return (
      <form className="profile-form" onSubmit={this.handleSubmit}>
        <h2 className="pf-h2">Edit your Profile</h2>
        <div className="pf-main">
          <div className="pf-image" style={{ backgroundImage: `url(${profile_picture_url})` }}/>
          <div className="pf-settings">
            <div className="profile-form-field-div">
              <label htmlFor="pf-display-name">
                <span className="label-span">
                  Display name&nbsp;<strong className="asterick-wrapper">*</strong>
                </span>
              </label>
              <div className="pf-input-div">
                <input id="pf-display-name" type="text" value={display_name}
                  required="required" onChange={this.handleInput("display_name")} />
              </div>
            </div>
            <div className="profile-form-field-div profile-form-permalink-div">
              <label htmlFor="pf-profile-url">
                <span className="label-span">
                  Profile URL&nbsp;<strong className="asterick-wrapper">*</strong>
                </span>
                <div className="pf-input-div pf-permalink-input-div">
                  <div className="pf-span-wrapper">
                    <span className="form-permalink-span">elitebeats.herokuapp.com/#/</span>
                  </div>
                  <input id="pf-profile-url" className={`url-input ${this.validationError}`}
                    type="text" value={profile_url} required="required"
                    onChange={this.handleInput("profile_url")} onClick={this.clickUrlEdit}/>
                  <button type="button" className="permalink-edit-button"
                    onClick={this.clickUrlEdit}>
                    <i className="fas fa-pencil-alt link-edit-pencil" />
                  </button>
                </div>
                <div className={`permalink-validation ${this.pLinkErrorDisabled}`}>
                  {this.errorMessage}
                </div>
              </label>
            </div>
            <div className="profile-form-field-div">
              <label htmlFor="pf-first-name">First name</label>
              <div className="pf-input-div">
                <input className="pf-form-input" id="pf-first-name" type="text"
                  value={first_name} onChange={this.handleInput("first_name")} />
              </div>
            </div>
            <div className="profile-form-field-div">
              <label htmlFor="pf-last-name">Last name</label>
              <div className="pf-input-div">
                <input className="pf-form-input" id="pf-last-name" type="text"
                  value={last_name} onChange={this.handleInput("last_name")} />
              </div>
            </div>
            <div className="profile-form-field-div">
              <label htmlFor="pf-city">City</label>
              <div className="pf-input-div">
                <input className="pf-form-input" id="pf-city"type="text"
                  value={city} onChange={this.handleInput("city")} />
              </div>
            </div>
            <div className="profile-form-field-div">
              <label htmlFor="pf-country">Country</label>
              <div className="pf-input-div">
                <input className="pf-form-input" id="pf-country" type="text"
                  value={country} onChange={this.handleInput("country")} />
              </div>
            </div>
            <div className="profile-form-field-div">
              <label htmlFor="pf-bio">Bio</label>
              <div className="pf-input-div">
                <textarea className="pf-form-input" id="pf-bio"
                  placeholder="Tell the world a little bit about yourself. The shorter the better."
                  value={bio} onChange={this.handleInput("bio")} />
              </div>
            </div>
          </div>
        </div>
        <div className="form-footer">
          <div className="pf-buttons">
            <button type="button" className="form-cancel-button" onClick={this.cancelEdit}>
              <span>Cancel</span>
            </button>
            <button type="submit" disabled={this.saveButtonDisabled}
              className={`form-save-button ${this.saveButtonDisabled}`}>
              <span>Save changes</span>
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default EditProfileForm;
