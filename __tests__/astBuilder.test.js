import buildAst from '../src/astBuilder';
import buildObj from '../src/objBuilder';

const result1 = {
  name: 'root',
  children: [
    { name: 'host', value: 'hexlet.io', type: 'same' },
    [
      { name: 'timeout', value: 20, type: 'added' },
      { name: 'timeout', value: 50, type: 'deleted' },
    ],
    { name: 'proxy', value: '123.234.53.22', type: 'deleted' },
    { name: 'follow', value: false, type: 'deleted' },
    { name: 'verbose', value: true, type: 'added' },
  ],
};

const result2 = {
  name: 'root',
  children: [
    {
      name: 'common',
      type: 'same',
      children: [
        { name: 'setting1', value: 'Value 1', type: 'same' },
        { name: 'setting2', value: '200', type: 'deleted' },
        [
          { name: 'setting3', children: [{ name: 'key', value: 'value', type: 'same' }], type: 'added' },
          { name: 'setting3', value: true, type: 'deleted' },
        ],
        {
          name: 'setting6',
          type: 'same',
          children: [
            { name: 'key', value: 'value', type: 'same' },
            { name: 'ops', value: 'vops', type: 'added' },
          ],
        },
        { name: 'follow', value: false, type: 'added' },
        { name: 'setting4', value: 'blah blah', type: 'added' },
        { name: 'setting5', type: 'added', children: [{ name: 'key5', value: 'value5', type: 'same' }] },
      ],
    },
    {
      name: 'group1',
      type: 'same',
      children: [
        [
          { name: 'baz', value: 'bars', type: 'added' },
          { name: 'baz', value: 'bas', type: 'deleted' },
        ],
        { name: 'foo', value: 'bar', type: 'same' },
        [
          { name: 'nest', value: 'str', type: 'added' },
          { name: 'nest', children: [{ name: 'key', value: 'value', type: 'same' }], type: 'deleted' },
        ],
      ],
    },
    { name: 'group2', type: 'deleted', children: [{ name: 'abc', value: '12345', type: 'same' }] },
    { name: 'group3', type: 'added', children: [{ name: 'fee', value: '100500', type: 'same' }] },
  ],
};

const beforeJSONPath = './__tests__/__fixtures__/json/before.json';
const afterJSONPath = './__tests__/__fixtures__/json/after.json';

const beforeJSONPath2 = './__tests__/__fixtures__/json/before2.json';
const afterJSONPath2 = './__tests__/__fixtures__/json/after2.json';

test('Test astBuilder', () => {
  const before = buildObj(beforeJSONPath);
  const after = buildObj(afterJSONPath);
  expect(buildAst(before, after)).toEqual(result1);

  const before2 = buildObj(beforeJSONPath2);
  const after2 = buildObj(afterJSONPath2);
  expect(buildAst(before2, after2)).toEqual(result2);
});

/* {
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
} */
