import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { IArticle } from '../../queries';
import { extensions } from './extensions';

interface IProps {
    type: string,
    props: string,
    article: IArticle,
    root: Element
}

const ExtensionHelper: React.FunctionComponent<IProps> = ({type, props, article}) => {
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
        return <SelectedExtension props={propsObj} article={article} />
    }
    else {
        console.error(`No article extension available for type ${type} (in Extension).`)
        return null;
    }
}



export const Extension: React.FunctionComponent<IProps> = (props) => {
    return ReactDOM.createPortal(<ExtensionHelper {...props} />, props.root);
}