import React from 'react';
import { View, TextInput } from 'react-native';

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
