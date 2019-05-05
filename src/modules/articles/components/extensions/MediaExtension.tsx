import * as React from 'react';

import { IExtensionProps } from './extensions';
import { ArticleMedia } from '../ArticleMedia';

interface IParsedProps {
    mediumIds: string[]
}

export const MediaExtension: React.FunctionComponent<IExtensionProps> = ({ props, article }) => {
    const parsedProps = props as IParsedProps;

    //makes a copy so media filtering doesn't affect other components
    article = {...article};
    if (parsedProps.mediumIds && parsedProps.mediumIds.filter && article.media) {
        //Set used in case many media present to avoid quadratic complexity.
        const selectedMedia = new Set(parsedProps.mediumIds);
        article.media = article.media.filter(m => selectedMedia.has(m.id));
        
        return <ArticleMedia article={article} media={article.media} />

    }
    else return null;
}