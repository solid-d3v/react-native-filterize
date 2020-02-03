import { evaluateFilters } from './utils.js';

let initFilterDeclaration, initArray;

describe('evaluateFilters', () => {
    beforeEach(() => {
        initFilterDeclaration = {
            something: {
                value: 'asdf',
                validate: (e, v) => (e ? e && e.title && e.title.includes(v.toLowerCase()) : true),
            },
        };
        initArray = [{ title: 'asdf' }, { title: '123' }, { title: 'xyz12' }];
    });
    test('should handle undefined array', () => {
        expect(evaluateFilters(undefined, initFilterDeclaration)).toBeArrayOfSize(0);
    });
    test('should handle empty array', () => {
        expect(evaluateFilters([], initFilterDeclaration)).toBeArrayOfSize(0);
    });
    test('should handle undefined initFilterDeclaration', () => {
        expect(evaluateFilters(initArray)).toIncludeSameMembers(initArray);
    });
    test('should handle empty initFilterDeclaration', () => {
        expect(evaluateFilters(initArray, {})).toIncludeSameMembers(initArray);
    });
    test('should handle array initFilterDeclaration', () => {
        expect(evaluateFilters(initArray, [])).toIncludeSameMembers(initArray);
    });
    test('should handle filterDeclaration without validate function', () => {
        expect(evaluateFilters(initArray, { something: {} })).toIncludeSameMembers(initArray);
    });
    test('should handle filterDeclaration with invalid validate function', () => {
        expect(evaluateFilters(initArray, { something: { validate: {} } })).toIncludeSameMembers(initArray);
    });
    test('should pass parameters to validate function', () => {
        const validationMock = jest.fn().mockReturnValue(false);
        const mockValue = 'asdf';
        evaluateFilters(initArray, { something: { validate: validationMock, value: mockValue } });
        expect(validationMock).toHaveBeenCalled();
        expect(validationMock).toHaveBeenCalledWith(initArray[0], mockValue);
    });

    test('should filter array by validate function #1', () => {
        expect(
            evaluateFilters(initArray, {
                something: {
                    validate: () => false,
                },
            }),
        ).toBeArrayOfSize(0);
    });
    test('should filter array by validate function #2', () => {
        expect(
            evaluateFilters(initArray, {
                something: {
                    validate: () => true,
                },
            }),
        ).toBeArrayOfSize(3);
    });
    test('should filter array by validate function #3', () => {
        expect(evaluateFilters(initArray, initFilterDeclaration)).toIncludeSameMembers([{ title: 'asdf' }]);
    });
    test('should filter array element if one filter fails #1', () => {
        let multiFilterDeclaration = {
            something: {
                validate: () => false,
            },
            else: {
                validate: () => true,
            },
        };
        expect(evaluateFilters(initArray, multiFilterDeclaration)).toBeArrayOfSize(0);
    });
    test('should filter array element if one filter fails #2', () => {
        let multiFilterDeclaration = {
            something: {
                value: '12',
                validate: (e, v) => (e ? e && e.title && e.title.includes(v.toLowerCase()) : true),
            },
            else: {
                validate: () => true,
            },
        };
        expect(evaluateFilters(initArray, multiFilterDeclaration)).toIncludeSameMembers([
            { title: '123' },
            { title: 'xyz12' },
        ]);
    });
    test('should not ref to array parameter', () => {
        evaluateFilters(initArray, initFilterDeclaration);
        expect(initArray).toBeArrayOfSize(3);
    });
});
