import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Photos from '../../components/Photos';
import { onGetPhotos, onClearPhotos } from '../../actions/photoAction';
import NotFound from '../NotFound';

const Title = styled.h2`
  margin: 40px 0;
  text-align: center;
`;

const Wrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const Home = (props) => {
  const { onClearPhotos, onGetPhotos } = props;

  useEffect(() => {
    onClearPhotos();
    onGetPhotos({query: '', page: 1, per_page: 3, url: 'photos'});
  }, [])

  const { photos, isLoading, page } = props.photos;
  const isPhotoAvailable = photos && photos.length > 0;

  return (
    <Wrapper>
      <Helmet>
        <title>Home - Default Photos</title>
      </Helmet>
      <Title>Photo List</Title>
      {!isPhotoAvailable && <NotFound />}
      {photos && 
        <Photos
          items={photos}
          onScrollToLoad={() =>
            isLoading ? console.log('Loading') : onGetPhotos({query: '', page: page, per_page: 3, url: 'photos'})
          }
        />
      }
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  photos: state.photos
})

export default connect(mapStateToProps, {
  onGetPhotos,
  onClearPhotos
})(Home);
