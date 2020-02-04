import React from 'react';
import { Switch, View } from 'react-native';
import PropTypes from 'prop-types';

export default function CustomSwitch({ value, onChange }) {
    return (
        <View>
            <Switch value={value} onValueChange={onChange} />
        </View>
    );
}

CustomSwitch.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
};
