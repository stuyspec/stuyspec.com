import LocalizedStrings from 'react-localization'
import localizationSetter from './../tools/localizationSetter'

import en from './en'
import es from './es'
import global from './global'


let strings = new LocalizedStrings({ en, es });
strings.global = global;

strings.languageCodes = [ 'en', 'es' ];
localizationSetter.addLocalizedStrings(strings);
export default strings