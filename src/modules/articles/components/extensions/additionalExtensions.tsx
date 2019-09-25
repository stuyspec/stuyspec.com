import * as React from 'react';

import { IExtensionProps } from '@stuyspec/article_extensions';
import { MediaExtension } from './MediaExtension';
import { IArticle } from '../../queries';

export const additionalExtensions: Array<[string, React.ComponentType<IAdditionalExtensionProps>]> = [
    ["MediaExtension", MediaExtension]
];

export interface IAdditionalExtensionExtraProps {
    article: IArticle
}

export type IAdditionalExtensionProps = IExtensionProps & IAdditionalExtensionExtraProps;