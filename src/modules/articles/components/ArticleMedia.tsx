import * as React from 'react';

import { ExtensionHelper } from './extensions/Extension';

import { IMedium, IArticle } from '../queries';

interface IProps {
    article: IArticle,
    media: Array<IMedium>
}

export const ArticleMedia: React.FunctionComponent<IProps> = ({article, media}) => {
    return (
      <ExtensionHelper type="MediaExtension" props="{}" media={media} />
    )
}
