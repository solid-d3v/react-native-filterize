export const evaluateFilters = (array, filterDeclaration) =>
    array.filter(element => !Object.values(filterDeclaration).some(({ validate, value }) => !validate(element, value)));