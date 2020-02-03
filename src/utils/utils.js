import { isEmpty, isPlainObject, isFunction, get } from 'lodash';

export const evaluateFilters = (array = [], filterDeclaration) => {
    if (isEmpty(filterDeclaration) || !isPlainObject(filterDeclaration)) filterDeclaration = {};
    return array.filter(
        element =>
            !Object.keys(filterDeclaration).some(filterKey => {
                let { validate, value } = get(filterDeclaration, filterKey, {});
                if (isFunction(validate)) return !validate(element, value);
                else {
                    console.warn(`Missing/Wrong validate function for filterKey: ${filterKey}`);
                    return false;
                }
            }),
    );
};
