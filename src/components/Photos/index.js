import React, { useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import PhotoComponent from '../Photo';
import { sizes } from '../../style/util';

const Photos = ({ items, onScrollToLoad, ...others }) => {
  const handleResizeOrScroll = () => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document && document.documentElement
          ? document.documentElement.offsetHeight
          : 0;
    const body = document.body;
    const html = document.documentElement;
    let docHeight = 0;
    if (
      html &&
      body &&
      body.scrollHeight &&
      body.offsetHeigh &&
      html.offsetHeight &&
      html.scrollHeight
    ) {
      docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
    }
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      onScrollToLoad();
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResizeOrScroll)
    window.addEventListener('scroll', handleResizeOrScroll)

    return () => {
      window.removeEventListener('resize', handleResizeOrScroll)
      window.removeEventListener('scroll', handleResizeOrScroll)
    }
  }, [])

  return (
    <div {...others}>
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          [sizes.tablet - 34]: 1,
          [sizes.tablet - 33]: 2,
          '900': 3,
        }}>
        <Masonry>
          {Object.keys(items).map((key, index) => (
            <PhotoComponent key={`${items[key].id}-${index}`} photo={items[key]} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Photos;
