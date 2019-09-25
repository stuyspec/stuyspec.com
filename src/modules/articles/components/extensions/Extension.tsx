import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { extensions, IExtensionProps } from '@stuyspec/article_extensions';
import { additionalExtensions } from './additionalExtensions';
import { IArticle } from '../../queries';

export interface IExtensionProps {
    props: any,
}

type IHelperProps =  {
    type: string,
    props: string,
    article: IArticle
};

const ExtensionHelper: React.FC<IHelperProps> = ({type, props, ...rest}) => {
    let propsObj;
    try {
        propsObj = JSON.parse(props);
    }
    catch(e) {
        console.error(`Unable to parse props "${props}" in article extension of type ${type} (in Extension).`)
        return null;
    }

    const allExtensions = additionalExtensions ? new Map<string, any>([...extensions, ...additionalExtensions]) : new Map(extensions)
    const SelectedExtension = allExtensions.get(type);
    if (SelectedExtension) {
        return <SelectedExtension props={propsObj} {...rest} />
    }
    else {
        console.error(`No article extension available for type ${type} (in Extension).`)
        return null;
    }
}

type IProps =  {
    type: string,
    props: string,
    root: Element,
    article: IArticle
};

export function Extension({root, ...rest}: IProps)  {
    return ReactDOM.createPortal(<ExtensionHelper {...rest} />, root);
}