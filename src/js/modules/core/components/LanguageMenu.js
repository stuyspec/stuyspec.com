// NOTE: since material-ui has been deprecated
//       from template, this Component
//       must be re-worked to be independent of
//       it before it can be used as an example!

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Tabs, Tab} from 'material-ui/Tabs'
import Menu, {MenuItem}from 'material-ui/Menu'
import IconButton      from 'material-ui/IconButton'
import customPropTypes from 'material-ui/utils/customPropTypes'
import strings,{menus}  from './../../../strings'
import Style  from './style/LanguageMenuStyle'
import { setLanguage } from '../actions'
import { connect } from 'react-redux'

class LanguageMenu extends Component
{
    constructor (props, context)
    {
        super(props, context);
        this.classes = context.styleManager.render(Style);
        this.state = { anchorEl : undefined, open : false }
    }
    onMenuClick = (event)=>
    {
        this.setState({ anchorEl : event.currentTarget, open : true  });
    };
    onRequestClose = ()=>
    {
        this.setState({ open : false });
    };
    render ()
    {
        const { onLanguageSelected } = this.props;
        return (
            <div className={this.classes.languageContainer}>
                <span className={this.classes.languageTextSpan}>
                    {menus.main.languageAbbr}
                </span>
                <IconButton
                    tooltip=
                    {strings.languageCodes.map((language)=>
                            (<p>{strings.global.selectLanguage[language]}</p>))
                    }
                    tooltipPosition={ 'bottom-left' }
                    className    ={this.classes.languageButtonContainer}
                    onClick={this.onMenuClick}
                ><i className={`mdi mdi-menu-down ${this.classes.languageButtonIcon}`}/>
                </IconButton>
                <Menu
                    id={'languageMenu'}
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.onRequestClose}
                >
                    {strings.languageCodes.map((language)=>
                    (
                        <MenuItem onClick={(e)=>
                        {
                            onLanguageSelected(language);
                            this.onRequestClose();
                        }}>{strings.global.languages[language]}
                        </MenuItem>
                    ))}
                </Menu>
            </div>);
    }
}

let VisibleLanguageMenu = connect(
    (state,ownProps)=>
    ({
        language : state.core.language
    }),
    (dispatch)=>
    ({ onLanguageSelected : (language)=>
    {
        dispatch(setLanguage(language));
    }})
)(LanguageMenu);

export default VisibleLanguageMenu