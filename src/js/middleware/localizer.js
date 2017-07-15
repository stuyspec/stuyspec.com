import localizationSetter from 'tools/localizationSetter'

const localizer = store => next => action =>
{
    return next(action);
};

export default localizer