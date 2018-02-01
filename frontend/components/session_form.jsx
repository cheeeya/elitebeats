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
      if (field === 'identifier' && emailFormatRegex.test(e.target.value)) {
        this.setState({ [field]: e.target.value, email: e.target.value, validEmail: true });
      } else {
        this.setState({ [field]: e.target.value, validEmail: false });
      }
    }
  }

  demoLogin(e) {
    e.preventDefault();
    this.props.login({ identifier: 'demo', password:'demopassword' });
  }

  handleFormReset(e) {
    e.preventDefault();
    this.setState({ password: "", age: "", formType: "" })
  }

  render() {
    const { formType, identifier } = this.state;
    const { errors } = this.props;
    
    let inputForm = (
      <div>
        <label>
          <input type="text" onChange={this.update('identifier')} placeholder="Your email address or profile URL *" value={identifier} />
        </label>
      </div>
    );

    const errorsList = (
      <ul>
        {
          errors.map((error, idx) => <li key={idx}>{error}</li>)
        }
      </ul>
    )

    const identifierDiv = (
      <div onClick={this.handleFormReset}>
        {this.state.identifier}
      </div>
    )


    if (formType === 'login') {
      this.processForm = this.props.login;
      inputForm = (
        <div>
          {identifierDiv}
          <label>
            <input type="password" placeholder="Your Password *" onChange={this.update('password')}/>
          </label>
        </div>
      )
    } else if (formType === 'signup') {
      this.processForm = this.props.signup;
      inputForm = (
        <div>
          {identifierDiv}
          <label>
            Choose a  password *
            <input type="password" onChange={this.update('password')}/>
          </label>
          <label>
            Tell us your age *
            <input type="text" onChange={this.update('age')}/>
          </label>
        </div>
      )
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {inputForm}
          {errorsList}
          <button>Continue</button>
        </form>
        <button onClick={this.demoLogin}>Demo</button>
      </div>
    )
  }
}

export default SessionForm;