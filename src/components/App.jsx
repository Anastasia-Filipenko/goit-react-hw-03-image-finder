import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
export class App extends Component {
  state = {
    photoTag: '',
    showModal: false,
    src: '',
    alt: '',
  };

  handleFormSubmit = photoTag => {
    this.setState({ photoTag });
  };

  handlePhotoClick = e => {
    this.setState({
      showModal: true,
      src: e.target.src,
      alt: e.target.alt,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal, photoTag, alt, src } = this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery
          photoTag={photoTag}
          onPhotoClick={this.handlePhotoClick}
        />
        {showModal && <Modal src={src} alt={alt} onClose={this.toggleModal} />}
      </div>
    );
  }
}
