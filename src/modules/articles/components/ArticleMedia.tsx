import * as React from 'react';

import { Gallery } from '../../media/components';
import { Lightbox } from '../../core/components';
import ArticleMedium from './ArticleMedium';

import { IMedium, IArticle } from '../queries';

interface IProps {
    article: IArticle,
    media: Array<IMedium>
}

export const ArticleMedia: React.FunctionComponent<IProps> = ({article, media}) => {
    const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
    return (
        <>
        {media.length > 1 && (
            <Lightbox title={article.title} isVisible={isLightboxOpen} onClose={() => setIsLightboxOpen(false)}>
              <Gallery media={article.media} />
            </Lightbox>
          )}
          {article.media && article.media.length > 0 && (
            <ArticleMedium
              image={article.media[0]}
              isCarouselButtonVisible={media.length > 1}
              carouselImageCount={media.length}
              onCarouselButtonClick={() => setIsLightboxOpen(true)}
            />
          )}
        </>
    )
}
