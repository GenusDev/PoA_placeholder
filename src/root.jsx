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
      button: 'button1',
      email_input_status: false,
      email_style: 'email-input-1'
    };

    this.handleClick = this.handleClick.bind(this);
    this.openSelections = this.openSelections.bind(this);
    this.selectRole = this.selectRole.bind(this);
    this.validEmail = this.validEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
  }

  componentDidMount() {    
    /* D3 code to append elements to this.svg */
    var data = [
      { "x_axis": 300, "y_axis": 200},
      { "x_axis": 275, "y_axis": 270},
      { "x_axis": 350, "y_axis": 100}];

    // var bg = d3.select("body")
    //   .style("background-size", "cover")
    //   .classed("background1", true);

    var svg = d3.select("body")
      .append("svg")
     // .style("background-size", "cover")
      .classed("city-points", true)
      .attr("viewBox", "0 0 800 600" )
      .attr("preserveAspectRatio", "xMidYMid slice");

    var points = svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      // .style("background-size", "cover")
      // .style("background-color", "green")
      .attr("cx", function (d) { return d.x_axis; })
      .attr("cy", function (d) { return d.y_axis; })
      .attr("r", function (d) { return 2; })
      .attr("fill", "red")
      .on("mouseover", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("stroke", "rgba(158, 54, 31, 0.8)")
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
          .attr("fill", "red")
          .attr("stroke-width", "0")
          .attr("fill-opacity", "1.0")
        d3.select(".opacity-layer")
          .transition()
          .duration(2000)
          .style("background", "rgba(0, 0, 0, 0.6)")
      });
  }
  

  // Not sure if this should be commented out

  // shouldComponentUpdate() {
  //   return false; // This prevents future re-renders of this component
  // }

  update(property) {
    return (e) => {
      e.preventDefault();
      this.setState({ [property]: e.currentTarget.value });
    };
  }

  handleClick(e) {
    if(e.target.className === 'email-input-1') {
      this.setState({ identity1: 'button' });
    } else if(e.target.className !== 'email-input-1' && this.state.email !== ''){
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
      identity2: 'selection-form',
      email_style: 'email-input-2'
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
      this.handlePostSubmit();
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
