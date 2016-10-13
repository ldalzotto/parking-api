'use strict';
const assert = require('assert');
const stringify = require('..');

suite('convert to map with an object without replacer', function() {
    test('a empty map', function() {
        const map = new Map();
        const json = stringify(map);
        assert.strictEqual(json, '{}');
    });

    test('a map with a value', function() {
        const map = new Map([[1, 'test']]);
        const json = stringify(map);
        assert.strictEqual(json, '{"1":"test"}');
    });

    test('a map nested map in an object', function() {
        const map = new Map([[1, 'test']]);
        const json = stringify({ map: map });
        assert.strictEqual(json, '{"map":{"1":"test"}}');
    });

    test('a map nested map in an other map', function() {
        const mapNested = new Map([['test', 'value']]);
        const map = new Map([['map', mapNested]]);
        const json = stringify(map);
        assert.strictEqual(json, '{"map":{"test":"value"}}');
    });
});

suite('convert to map with an object with replacer', function() {
    test('a map with a value', function() {
        let replacerCalled = 0;
        const map = new Map([[1, 'test']]);
        const json = stringify(map, function(key, value) {
            replacerCalled++;
            return value;
        });
        assert.strictEqual(replacerCalled, 2);
        assert.strictEqual(json, '{"1":"test"}');
    });
});
