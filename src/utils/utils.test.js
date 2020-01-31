import { evaluateFilters } from './utils';

describe('evaluateFilters', () => {
    test('should handle empty array', () => {
        expect(evaluateFilters([], {})).toBeArray();
    });
});
