import { IExtensionProps } from '@stuyspec/article_extensions';
import { MediaExtension } from './MediaExtension';
import { IArticle } from '../../queries';

export const additionalExtensions = new Map([["MediaExtension", MediaExtension]])

export interface IAdditionalExtensionExtraProps {
    article: IArticle
}

export type IAdditionalExtensionProps = IExtensionProps & IAdditionalExtensionExtraProps;