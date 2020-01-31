import React, { useReducer } from 'react';
import { View, Text } from 'react-native';
import _ from 'lodash';
import CustomSwitch from './CustomSwitch';
import CustomTextInput from './CustomTextInput';
import { evaluateFilters } from '../utils/utils';

export default function Form({ onChange, array, initFilterDeclaration }) {
    function filterReducer(state, action) {
        switch (action.type) {
            case 'UPDATE_FILTER':
                return { ...state, ...action.payload };
            default:
                return {};
        }
    }

    const [filterDeclaration, dispatchFilter] = useReducer(filterReducer, initFilterDeclaration);

    const handleChange = (key, value) => {
        _.set(filterDeclaration, key, value);
        dispatchFilter({ type: 'UPDATE_FILTER', payload: filterDeclaration });

        if (_.isFunction(onChange)) onChange(evaluateFilters(array, filterDeclaration));
    };

    const renderItems = () => {
        return Object.keys(filterDeclaration).map(filterKey => {
            let values = filterDeclaration[filterKey];
            let path = `${filterKey}.value`;
            let { type, placeholder, value } = values;

            if (type === 'switch') return <CustomSwitch value={value} onChange={value => handleChange(path, value)} />;
            if (type === 'text')
                return (
                    <CustomTextInput
                        placeholder={placeholder}
                        value={value}
                        onChange={value => handleChange(path, value)}
                    />
                );
            else return <Text>asdf</Text>;
        });
    };

    return <View>{renderItems()}</View>;
}
