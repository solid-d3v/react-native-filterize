import React from 'react';
import { Switch, View } from 'react-native';

export default function CustomSwitch({ value, onChange }) {
    return (
        <View>
            <Switch value={value} onValueChange={onChange} />
        </View>
    );
}
