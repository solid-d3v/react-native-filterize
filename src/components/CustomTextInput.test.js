import React from 'react';
import { TextInput } from 'react-native';
import TestRenderer from 'react-test-renderer';
import CustomTextInput from './CustomTextInput';

let testTextInput, initValueMock, changeValueMock, placeholder, onChangeMock;

describe('CustomTextInput', () => {
    beforeEach(() => {
        placeholder = 'asdf';

        initValueMock = 'Hallo';
        changeValueMock = 'Halloo';
        onChangeMock = jest.fn().mockReturnValue(changeValueMock);
        testTextInput = TestRenderer.create(
            <CustomTextInput value={initValueMock} onChange={onChangeMock} placeholder={placeholder} />,
        );
    });
    test('to be rendered', () => {
        let mySwitch = testTextInput.root.findByType(TextInput);
        expect(mySwitch).toBeTruthy();
    });
    test('to pass prop (value) to TextInput', () => {
        let props = testTextInput.root.findByType(TextInput).props;
        expect(props.value).toBe(initValueMock);
    });
    test('to pass prop (onChange) to TextInput', () => {
        let props = testTextInput.root.findByType(TextInput).props;
        expect(props.onChangeText).toBe(onChangeMock);
    });
    test('to pass prop (placeholder) to TextInput', () => {
        let props = testTextInput.root.findByType(TextInput).props;
        expect(props.placeholder).toBe(placeholder);
    });

    test('to trigger onChange', () => {
        let mySwitch = testTextInput.root.findByType(TextInput);
        mySwitch.props.onChangeText(changeValueMock);
        expect(onChangeMock).toHaveBeenCalled();
        expect(onChangeMock).toHaveBeenCalledWith(changeValueMock);
    });
});
