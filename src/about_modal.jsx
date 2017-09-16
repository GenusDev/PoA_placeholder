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
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  render() {
    return(
      <div>
        <img
          className="about-button"
          src="https://res.cloudinary.com/genus-development/image/upload/v1505432507/ABOUT_BUTTON-01_ike3mn.png"
          onClick={this.openModal}/>
        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.closeModal}
          style={ModalStyle}
          contentLabel="About Modal"
          className="about-container">
          <div className="about-header">
            <div>GENUS</div>
            <div>DEVELOPMENT</div>
            <div>PARTNERS</div>
          </div>
          <img
            className="about-close-button"
            src="https://res.cloudinary.com/genus-development/image/upload/v1505432515/ABOUT_EXIT_BUTTON-01_hyrgnv.png"
            onClick={this.closeModal}/>
          <div className="about-body">
            Genus Development is an integrated real estate investment,
            design and development company headquartered in New York City
            that focuses on innovative and synergistic multi-use projects
            in central areas of large multi-cultural cities throughout the Americas.
            Each project will integrate a workshare/cooperative element.
            Current geographical foci are New York City, Philadelphia, Bogota and Puerto Rico. Genus Development will host a portal where potential investors
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
