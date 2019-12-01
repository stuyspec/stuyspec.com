import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { extensions } from '@stuyspec/article_extensions';
import { IArticle, IMedium } from '../../queries';

type IHelperProps =  {
    type: string,
    props: string,
    media?: IMedium[]
};

export const ExtensionHelper: React.FC<IHelperProps> = ({type, props, media}) => {
    let propsObj;
    try {
        propsObj = JSON.parse(props);
    }
    catch(e) {
        console.error(`Unable to parse props "${props}" in article extension of type ${type} (in Extension).`)
        return null;
    }

    const SelectedExtension = extensions.get(type);
    if (SelectedExtension) {
        return <SelectedExtension props={propsObj} media={media} />
    }
    else {
        console.error(`No article extension available for type ${type} (in Extension).`)
        return null;
    }
}

type IProps =  {
    type: string,
    props: string,
    media?: string,
    article: IArticle
    root: Element,
};

export function Extension({root, media, article, type, ...rest}: IProps)  {
    let mediaIds: string[];
    try {
        mediaIds = media ? JSON.parse(media) : [];
    }
    catch(e) {
        console.error(`Unable to parse media "${media}" in article extension of type ${type} (in Extension).`)
        return null;
    }

    const mediaObjs = mediaIds.includes && article.media ? article.media.filter(m => mediaIds.includes(m.id)) : undefined

    return ReactDOM.createPortal(<ExtensionHelper media={mediaObjs} type={type} {...rest} />, root);
}