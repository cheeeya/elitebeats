import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: "",
      email: "",
      password: "",
      age: "",
      validEmail: false,
      formType: ""
    }
    this.processForm = this.props.login
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormReset = this.handleFormReset.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ formType: nextProps.formType });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.formType) {
      this.processForm(this.state);
    } else {
      this.props.getUser(this.state);
    }
  }

  update(field) {
    return (e) => {
      const emailFormatRegex = /\w+@\w+\.\w{2,}/;
      if (field === 'identifier') {
        if (emailFormatRegex.test(e.target.value)) {
          this.setState({ [field]: e.target.value, email: e.target.value, validEmail: true });
        } else {
          this.setState({ [field]: e.target.value, email: e.target.value, validEmail: false });
        }
      } else {
        this.setState({ [field]: e.target.value });
      }
    }
  }

  demoLogin(e) {
    e.preventDefault();
    this.props.login({ identifier: 'demo', password:'demopassword' });
  }

  handleFormReset(e) {
    e.preventDefault();
    this.props.receiveFormType("");
  }

  render() {
    const { formType, identifier } = this.state;
    const { errors } = this.props;

    let buttonText = "Continue";
    let inputForm = (
      <div className="session-form-input">
        <h2 className="signup-h2">Welcome to EliteBeats</h2>
        <label>
          <input type="text" onChange={this.update('identifier')} placeholder="Your email address or profile URL *" value={identifier} required="required"/>
        </label>

      </div>
    );

    let signupCheck = (
      <div>
        <h5 className="signup-h5">By signing in, you agree to our Terms of Use.</h5>
      </div>
    )

    const errorsList = (
      <ul className='errors-list'>
        {
          errors.map((error, idx) => <li key={idx} className="error">{error}</li>)
        }
      </ul>
    )

    const identifierDiv = (
      <div onClick={this.handleFormReset} className="form-id-div">
        <i className="fas fa-caret-left" id="form-id-caret"></i>
        {this.state.identifier}
      </div>
    )


    if (formType === 'login') {
      this.processForm = this.props.login;
      buttonText = "Sign in"
      inputForm = (
        <div className="login-form">
          <h2 className="signup-h2">Welcome back</h2>
          {identifierDiv}
          <div className="session-form-input">
            <label>
              <input type="password" placeholder="Your Password *" onChange={this.update('password')} required="required"/>
            </label>
          </div>
        </div>
      )
    } else if (formType === 'signup') {
      this.processForm = this.props.signup;
      signupCheck = (
        <div>
          <h3 className="signup-h3">Are you trying to sign in?</h3>
          <h4 className="signup-h4">The email address that you entered was not found.</h4>
          <h4 className="signup-h4">Double-check your email.</h4>
        </div>
      );
      inputForm = (
        <div className="signup-form">
          <h2 className="signup-h2">Create your EliteBeats account</h2>
          {identifierDiv}
          <div className="session-form-input">
            <label className="form-password-label">
              <span className="label-span">Choose a  password&nbsp;<strong className="asterick-wrapper">*</strong></span>
            <input type="password" onChange={this.update('password')} required="required"/>
            </label>
          </div>
          <div className="session-form-input">
            <label className="form-age-label">
              <span className="label-span">Tell us your age&nbsp;<strong className="asterick-wrapper">*</strong></span>
              <input type="text" onChange={this.update('age')} required="required"/>
            </label>
          </div>
        </div>
      );
    }
    return (
      <div className="session-form-wrapper">
        <form onSubmit={this.handleSubmit} className="session-form">
          {inputForm}
          {errorsList}
          <button className="session-button" id="continue-bttn">{buttonText}</button>
        </form>
        {signupCheck}
        <button onClick={this.demoLogin} id="demo-bttn">Demo</button>
      </div>
    )
  }
}

export default SessionForm;
