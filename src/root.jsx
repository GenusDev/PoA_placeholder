import React from 'react';
import { button1, button2 } from './buttons';
import { storeInfo } from  './storeinfo';
import AboutModal from './about_modal';

class Root extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      identity1: 'hidden-button',
      identity2: 'hidden-selection-form',
      role: '',
      button: 'button1',
      email_input_status: false,
      email_style: 'email-input-1',
      error: ''
    };

    this.openSelections = this.openSelections.bind(this);
    this.selectRole = this.selectRole.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  update(property) {
    return (e) => {
      e.preventDefault();
      this.setState({ [property]: e.currentTarget.value }, () => {
        if(this.state.email === '' && this.state.identity2 === 'selection-form') {
          this.setState({
            identity1: 'hidden-button',
            identity2: 'hidden-selection-form',
            button: 'button1',
            email_style: 'email-input-1'
          });
        } else if(this.state.email !== '') {
          this.setState({ identity1: 'button'});
        } else {
          this.setState({ identity1: 'hidden-button'});
        }
      });
    };
  }

  openSelections(e) {
    this.setState({
      button: 'button2',
      identity2: 'selection-form',
      email_style: 'email-input-2'
    });
  }

  selectRole(e) {
    this.setState({ role: e.currentTarget.value });
  }

  handleSubmit() {
    var user = {
      email: this.state.email.toLowerCase(),
      role: this.state.role
    };

    if(user.email && user.role !== '') {
      storeInfo(user).then(
        (res) => {
          console.log(res);
          this.setState({ error: '' });
          this.handlePostSubmit();
        }, err => {
          this.setState({ error: err.responseJSON.email });
        });
    }
  }

  renderError() {
    return(
      <div className="error">{this.state.error}</div>
    );
  }

  handlePostSubmit() {
    this.setState({
      email: 'submitted',
      identity1: 'hidden-button',
      identity2: 'hidden-selection-form',
      email_style: 'email-input-3',
      email_input_status: !this.state.email_input_status
    });
  }

  render() {

    let { email, identity1, identity2,
          email_input_status, email_style } = this.state;
    let { openSelections, selectRole, handleSubmit } = this;
    let renderedButton = '';

    if(this.state.button === 'button1') {
      renderedButton = button1(identity1, openSelections);
    } else if(this.state.button === 'button2') {
      renderedButton = button2(identity2, selectRole, handleSubmit);
    }

    return(
      <div className="background"
        onChange={this.buttonToggle}>
        <div className="opacity-layer">
          <div className="content">
            <div className="top">
              <img className="logo" src="https://res.cloudinary.com/genus-development/image/upload/v1504828805/logo_s9wj2d.png" alt="logo"/>
              <div className="header">
                <div>GENUS</div>
                <div>DEVELOPMENT</div>
                <div>PARTNERS</div>
              </div>
              <AboutModal/>
            </div>
            <div className="middle-1">
              <div className="sub-header">
                stay in touch
              </div>
            </div>
            <div className="middle-2">
              <div className="email-form">
                <input
                  className={ email_style }
                  name="email"
                  type="text"
                  placeholder= "submit email"
                  value={ email }
                  disabled={ email_input_status }
                  onChange={ this.update('email') }/>
                {renderedButton}
              </div>
            </div>
            <div className="middle-3">
              {this.renderError()}
            </div>
            <div className="bottom">
              <div>portal under</div>
              <div>construction</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Root;
