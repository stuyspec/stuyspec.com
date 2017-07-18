import localizationSetter from 'tools/localizationSetter'
import { SET_LANGUAGE } from 'modules/core/actionTypes'

const localizer = store => next => action =>
{
    if (action.type == SET_LANGUAGE)
    {
        // now apply language localization to all
        // registered localization components
        localizationSetter.setLanguage(action.payload.language);
    }
    return next(action);
};

export default localizer