import _ from 'lodash';

const isObject = item => typeof item === 'object';

const typeActions = [
  {
    name: 'sameGroup',
    check: (key, before, after) => _.has(before, key) && _.has(after, key)
      && isObject(before[key]) && isObject(after[key]),
    action: (key, before, after, fn) => ({ name: key, type: 'same', children: fn(before[key], after[key]) }),
  },
  {
    name: 'added',
    check: (key, before, after) => !_.has(before, key) && _.has(after, key),
    action: (key, before, after) => ({ name: key, type: 'added', value: after[key] }),
  },
  {
    name: 'deleted',
    check: (key, before, after) => _.has(before, key) && !_.has(after, key),
    action: (key, before) => ({ name: key, type: 'deleted', value: before[key] }),
  },
  {
    name: 'sameProp',
    check: (key, before, after) => _.has(before, key) && _.has(after, key)
      && before[key] === after[key],
    action: (key, after) => ({ name: key, type: 'same', value: after[key] }),
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
  const keys = Object.keys({ ...before, ...after });

  const ast = keys.map((key) => {
    const { action } = typeActions.find(({ check }) => check(key, before, after));
    return action(key, before, after, getAST);
  });
  return ast;
};

export default (before, after) => ({
  name: 'root',
  children: getAST(before, after),
});
