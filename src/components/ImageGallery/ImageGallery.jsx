import { Component } from 'react';
import { fetchImg } from '../api';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import Loader from '../Loader/Loader';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    photos: [],
    photoTag: '',
    page: 1,
    loading: false,
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.photoTag;
    const nextSearch = this.props.photoTag;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch) {
      this.setState({ photoTag: nextSearch, photos: [], page: 1 });
    }

    if (
      (prevSearch !== nextSearch && nextPage === 1) ||
      prevPage !== nextPage
    ) {
      this.setState({ loading: true });

      fetchImg(nextSearch, nextPage).then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          alert(`Sorry, there is no photo at your request `);
          this.setState({ loading: false });
          return;
        }

        if (hits.length === 0 && totalHits !== 0) {
          alert(`End of search results`);
          this.setState({ loading: false });
          return;
        }

        const newPhotos = hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        this.setState(({ photos }) => ({
          photos: [...photos, ...newPhotos],
          loading: false,
        }));
      });
    }
  }

  render() {
    const { photos, loading, photoTag } = this.state;

    return (
      <div>
        {photoTag && (
          <ul className={css.gallery}>
            {photos.map(({ id, webformatURL, tags }) => (
              <ImageGalleryItem
                onClick={this.props.onPhotoClick}
                key={id}
                id={id}
                src={webformatURL}
                alt={tags}
              />
            ))}
          </ul>
        )}

        {(loading && Loader) ||
          (photos.length > 0 && <Button onClick={this.loadMore}></Button>)}
      </div>
    );
  }
}
