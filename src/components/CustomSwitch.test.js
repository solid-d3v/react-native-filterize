import React from 'react';
import { Switch } from 'react-native';
import TestRenderer from 'react-test-renderer';
import CustomSwitch from './CustomSwitch.js';

let testSwitch, initValueMock, changeValueMock, onChangeMock;

describe('CustomSwitch', () => {
    beforeEach(() => {
        initValueMock = false;
        changeValueMock = true;
        onChangeMock = jest.fn().mockReturnValue(changeValueMock);
        testSwitch = TestRenderer.create(<CustomSwitch value={initValueMock} onChange={onChangeMock} />);
    });

    test('to be rendered', () => {
        let mySwitch = testSwitch.root.findByType(Switch);
        expect(mySwitch).toBeTruthy();
    });
    test('to pass prop (value) to Switch', () => {
        let props = testSwitch.root.findByType(Switch).props;
        expect(props.value).toBe(initValueMock);
    });

    test('to pass prop (onChange) to Switch', () => {
        let props = testSwitch.root.findByType(Switch).props;
        expect(props.onValueChange).toBe(onChangeMock);
    });

    test('to trigger onChange', () => {
        let mySwitch = testSwitch.root.findByType(Switch);
        mySwitch.props.onValueChange(changeValueMock);
        expect(onChangeMock).toHaveBeenCalled();
        expect(onChangeMock).toHaveBeenCalledWith(changeValueMock);
    });
});
