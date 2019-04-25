import * as React from 'react';

import { IExtensionProps } from './extensions';
import { ArticleMedia } from '../ArticleMedia';

interface IParsedProps {
    mediumIds: string[]
}

export const MediaExtension: React.FunctionComponent<IExtensionProps> = ({ props, article }) => {
    const parsedProps = props as IParsedProps;

    //makes a copy so media filtering doesn't affect other components
    article = Object.assign({}, article);
    if (parsedProps.mediumIds && article.media) {
        article.media = article.media.filter(m => parsedProps.mediumIds.indexOf(m.id) >= 0);
        
        return <ArticleMedia article={article} media={article.media} />

    }
    else return null;
}