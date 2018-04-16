import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './modal_style';

class AboutModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
    };

    window.SessionOpenModal = () => {
      this.setState({openModal: true});
    };

    window.SessionOpenModal = window.SessionOpenModal.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ openModal: true });
    $('.open').css("display", "none");
    $('.close').css("display", "block");
  }

  closeModal() {
    this.setState({ openModal: false });
    $('.close').css("display", "none");
    $('.open').css("display", "block");
  }

  render() {
    return(
      <div className="about-container">
        <img className="open about-button"
          src="https://s3.amazonaws.com/genie-placeholder/about-butt.png"
          onClick={this.openModal} />
        <img className="close about-button"
          src="https://s3.amazonaws.com/genie-placeholder/about-exit-butt.png"
          onClick={this.closeModal} />
        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.closeModal}
          style={ModalStyle}
          contentLabel="About Modal"
          className="about-modal">
          <div className="about-header"></div>
          <div className="about-body">
            Genus Development is an integrated real estate investment,
            design and development company headquartered in New York City
            that focuses on innovative and synergistic multi-use projects
            in central areas of large multi-cultural cities throughout the Americas.
            Each project will integrate a workshare/cooperative element.
            Current geographical foci are New York City, Philadelphia, Bogota and Puerto Rico.
            Genus Development will host a portal where potential investors
            can analyze projects through a data-driven dashboard.
            Stakes in each each project may be purchased as blockchain ledgered tokens
            that are tradable on secondary markets.
          </div>
        </Modal>
      </div>
    );
  }
}

export default AboutModal;
