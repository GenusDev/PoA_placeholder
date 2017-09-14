import React from 'react';
import { button1, button2 } from './buttons';
import { storeInfo } from  './storeinfo';

class Root extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      identity1: 'hidden-button',
      identity2: 'hidden-selection-form',
      role: '',
      button: 'button1'
    };

    this.handleClick = this.handleClick.bind(this);
    this.openSelections = this.openSelections.bind(this);
    this.selectRole = this.selectRole.bind(this);
    this.validEmail = this.validEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property) {
    return (e) => {
      e.preventDefault();
      this.setState({ [property]: e.currentTarget.value });
    };
  }

  handleClick(e) {
    if(e.target.className === 'email-input') {
      this.setState({ identity1: 'button' });
    } else if(e.target.className !== 'email-input' && this.state.email !== ''){
      this.setState({ identity1: 'button' });
    } else if(e.target.className === 'button' || e.target.className === 'submit-icon' && this.state.email !== '') {
      this.setState({ identity1: 'button' });
    } else {
      this.setState({
        identity1: 'hidden-button',
        identity2: 'hidden-selection-form',
        button: 'button1'
      });
    }
  }

  validEmail(input) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(input);
  }

  openSelections(e) {
    this.setState({
      button: 'button2',
      identity2: 'selection-form'
    });
  }

  selectRole(e) {
    this.setState({ role: e.currentTarget.value });
  }

  handleSubmit() {
    var { email, role } = this.state;
    var user = {
      email: this.state.email,
      role: this.state.role
    };

    if(this.validEmail(email) && role !== '') {
      storeInfo(user);
      window.location.reload();
    }
  }

  render() {

    let { email, identity1, identity2 } = this.state;
    let { openSelections, selectRole, handleSubmit } = this;
    let renderedButton = '';

    if(this.state.button === 'button1') {
      renderedButton = button1(identity1, openSelections);
    } else if(this.state.button === 'button2') {
      renderedButton = button2(identity2, selectRole, handleSubmit);
    }

    return(
      <div className="background"
        onClick={this.handleClick}>
        <div className="opacity-layer">
          <div className="content">
            <div className="top">
              <img className="logo" src="http://res.cloudinary.com/genus-development/image/upload/v1504828805/logo_s9wj2d.png" alt="logo"/>
              <div className="header">
                <div>GENUS</div>
                <div>DEVELOPMENT</div>
                <div>PARTNERS</div>
              </div>
            </div>
            <div className="middle">
              <div className="sub-header">
                stay in touch
              </div>
              <div className="email-form">
                <input
                  className="email-input"
                  name="email"
                  type="text"
                  placeholder="submit email"
                  value={email}
                  onChange={this.update('email')}/>
                {renderedButton}
              </div>
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
