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
      errors: []
    };

    this.openSelections = this.openSelections.bind(this);
    this.selectRole = this.selectRole.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidMount() {
    /* D3 code to append elements to this.svg */
    var data = [
      { "x_axis": 300, "y_axis": 200},
      { "x_axis": 275, "y_axis": 270},
      { "x_axis": 310, "y_axis": 100},
      { "x_axis": 230, "y_axis": 350},
      { "x_axis": 300, "y_axis": 120},
      { "x_axis": 295, "y_axis": 128}];

    var svg = d3.select("#root")
      .append("svg")
      .classed("city-points", true)
      .attr("viewBox", "0 0 800 600" )
      .attr("preserveAspectRatio", "xMidYMid slice");

    var points = svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("viewBox", "0 0 800 600" )
      .attr("preserveAspectRatio", "xMidYMid slice")
      .attr("cx", function (d) { return d.x_axis; })
      .attr("cy", function (d) { return d.y_axis; })
      .attr("r", function (d) { return 2; })
      .attr("fill", "white")
      .on("mouseover", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("stroke", "rgba(56, 71, 120, 0.9)")
          .attr("stroke-width", "1")
          .attr("fill-opacity", "0.05")
          .attr("r", function(d) {
            return 30;
          })
        d3.select(".opacity-layer")
          .style("background", "rgba(0, 0, 0, 0)")
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(2500)
          .attr("r", function(d) {
            return 2;
          })
          .attr("fill", "white")
          .attr("stroke-width", "0")
          .attr("fill-opacity", "1.0")
        d3.select(".opacity-layer")
          .transition()
          .duration(2000)
          .style("background", "rgba(56, 71, 120, 0.7)")
      });
  }


  // Not sure if this should be commented out

  // shouldComponentUpdate() {
  //   return false; // This prevents future re-renders of this component
  // }

  update(property) {
    return (e) => {
      e.preventDefault();
      this.setState({ [property]: e.currentTarget.value }, () => {
        if(this.state.email === '' && this.state.identity2 === 'selection-form') {
          this.setState({
            identity1: 'hidden-button',
            identity2: 'hidden-selection-form',
            button: 'button1',
            email_style: 'email-input-1',
            errors: ''
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

    // if(user.email && user.role !== '') {
      storeInfo(user).then(
        (res) => {
          console.log(res);
          this.setState({ errors: '' });
          this.handlePostSubmit();
        }, err => {
          console.log(err.responseJSON);
          this.setState({
            errors: err.responseJSON.email.concat(err.responseJSON.role)
          });
        });
    // }
  }

  renderErrors() {

    if(this.state.errors.length > 0) {
      return(
        <div className="errors">
          {this.state.errors.map((error, i) => (
            <p key={`error-${i}`}>
              {error}
            </p>
          ))}
        </div>
      );
    }
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

    if (this.state.button === 'button1') {
      renderedButton = button1(identity1, openSelections);
    } else if(this.state.button === 'button2') {
      renderedButton = button2(identity2, selectRole, handleSubmit);
    }

    return(
      <div className="background"
        id="background"
        onChange={this.buttonToggle}>
        <div className="opacity-layer">
          <div className="content">
            <div className="top">
              <img className="logo" src="https://s3.amazonaws.com/genie-placeholder/logo.png" alt="logo"/>
              <div className="header">
                <div>GENUS</div>
                <div>DEVELOPMENT</div>
                <div>PARTNERS</div>
              </div>
              <div className="about-container">
                <AboutModal/>
              </div>
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
              {this.renderErrors()}
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
