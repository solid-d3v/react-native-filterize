import React from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

export default function CustomTextInput({ value, onChange, placeholder = '' }) {
    return (
        <View>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                placeholder={placeholder}
                onChangeText={onChange}
                value={value}
            />
        </View>
    );
}

CustomTextInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
};
