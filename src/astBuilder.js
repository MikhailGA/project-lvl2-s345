import _ from 'lodash';

const getUniqKeys = (obj1, obj2) => Object.keys({ ...obj1, ...obj2 });

const nodeType = [
  {
    name: 'nest',
    check: (key, before, after) => _.has(before, key) && _.has(after, key)
      && _.isObject(before[key]) && _.isObject(after[key]),
    action: (key, before, after, fn) => ({ name: key, type: 'nest', children: fn(before[key], after[key]) }),
  },
  {
    name: 'added',
    check: (key, before, after) => !_.has(before, key) && _.has(after, key),
    action: (key, before, after) => ({ name: key, type: 'added', valueAfter: after[key] }),
  },
  {
    name: 'deleted',
    check: (key, before, after) => _.has(before, key) && !_.has(after, key),
    action: (key, before) => ({ name: key, type: 'deleted', valueBefore: before[key] }),
  },
  {
    name: 'unchanged',
    check: (key, before, after) => _.has(before, key) && _.has(after, key)
      && before[key] === after[key],
    action: (key, after) => ({ name: key, type: 'unchanged', valueAfter: after[key] }),
  },
  {
    name: 'updated',
    check: (key, before, after) => _.has(before, key) && _.has(after, key)
      && before[key] !== after[key],
    action: (key, before, after) => ({
      name: key,
      type: 'updated',
      valueBefore: before[key],
      valueAfter: after[key],
    }),
  },
];

const getAST = (before, after) => {
  const keys = getUniqKeys(before, after);

  const ast = keys.map((key) => {
    const { action } = nodeType.find(({ check }) => check(key, before, after));
    return action(key, before, after, getAST);
  });
  return ast;
};

export default getAST;
