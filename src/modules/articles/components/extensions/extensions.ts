import * as React from 'react';
import { IArticle } from '../../queries';

import { MediaExtension } from './MediaExtension';

//The props are parsed from the json-encoded props field in an article-extension.
export interface IExtensionProps {
    props: any,
    article: IArticle
}

export const extensions: Map<string, React.ComponentType<IExtensionProps>> = new Map([["MediaExtension", MediaExtension]]);