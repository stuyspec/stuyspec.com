import EventEmitter from 'events'

// simple interface to
// aggregate various sets of 'localized-strings'
// (npm package) and set the language across
// multiple different ones at once

class LocalizationSetter extends EventEmitter
{
    addLocalizedStrings = (localizedStrings)=>
    {
        this.on('setLanguage', function(language)
        {
            localizedStrings.setLanguage(language);
        });
    };
    setLanguage = (language)=>
    {
        this.emit('setLanguage', language);
    };
}

// export an instance
let localizationSetter = new LocalizationSetter();
export default localizationSetter