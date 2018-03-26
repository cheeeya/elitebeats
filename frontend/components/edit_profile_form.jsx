import React from 'react';

class EditProfileForm extends React.Component {


  render() {
    return (
      <form className="profile-form">
        <h2 className="pf-h2">Edit your Profile</h2>
        <div className="pf-main">
          <div className="pf-image"/>
          <div className="pf-settings">
            <div className="profile-form-field-div">
              <label htmlFor="pf-display-name">
                <span className="label-span">
                  Display name&nbsp;<strong className="asterick-wrapper">*</strong>
                </span>
              </label>
              <div className="pf-input-div">
                <input id="pf-display-name" type="text" />
              </div>
            </div>
            <div className="profile-form-field-div">
              <label htmlFor="pf-profile-url">
                Profile URL
                <div className="pf-input-div">
                  <span className="form-permalink-span">elitebeats.herokuapp.com/#/</span>
                  <input className="pf-form-input" id="pf-profile-url" type="text" />
                </div>
              </label>
            </div>
            <div className="profile-form-field-div">
              <label htmlFor="pf-first-name">First name</label>
              <div className="pf-input-div">
                <input className="pf-form-input" id="pf-first-name" type="text" />
              </div>
            </div>
            <div className="profile-form-field-div">
              <label htmlFor="pf-last-name">Last name</label>
              <div className="pf-input-div">
                <input className="pf-form-input" id="pf-last-name" type="text" />
              </div>
            </div>
            <div className="profile-form-field-div">
              <label htmlFor="pf-city">City</label>
              <div className="pf-input-div">
                <input className="pf-form-input" id="pf-city"type="text" />
              </div>
            </div>
            <div className="profile-form-field-div">
              <label htmlFor="pf-country">Country</label>
              <div className="pf-input-div">
                <input className="pf-form-input" id="pf-country" type="text" />
              </div>
            </div>
            <div className="profile-form-field-div">
              <label htmlFor="pf-bio">Bio</label>
              <div className="pf-input-div">
                <textarea className="pf-form-input" id="pf-bio" placeholder="Tell the world a little bit about yourself. The shorter the better."/>
              </div>
            </div>
          </div>
        </div>
        <div className="pf-footer">
          <div className="pf-buttons">
            <button className="form-cancel-button"><span>Cancel</span></button>
            <button className="form-save-button"><span>Save changes</span></button>
          </div>
        </div>
      </form>
    )
  }
}

export default EditProfileForm;
