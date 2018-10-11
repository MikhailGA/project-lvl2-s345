import _ from 'lodash';

const isObject = item => typeof item === 'object';
const toString = value => (isObject(value) ? '[complex value]' : value);
const formatPath = path => (path ? `${path.slice(1)}.` : '');

const mappin = {
  updated: ({ name, valueBefore, valueAfter }, path) => (
    `Property '${formatPath(path)}${name}' was updated. From '${toString(valueBefore)}' to '${toString(valueAfter)}'`),
  deleted: ({ name }, path) => `Property '${formatPath(path)}${name}' was removed`,
  added: ({ name, value }, path) => `Property '${formatPath(path)}${name}' was added with value: ${toString(value)}`,
};

const itemType = [
  {
    type: 'same',
    check: item => _.has(item, 'children') && item.type === 'same',
    action: (item, path, fn) => fn(item, `${path}.${item.name}`),
  },
  {
    type: 'added',
    check: item => item.type === 'added',
    action: (item, path) => mappin.added(item, path),
  },
  {
    type: 'deleted',
    check: item => item.type === 'deleted',
    action: (item, path) => mappin.deleted(item, path),
  },
  {
    type: 'updated',
    check: item => item.type === 'updated',
    action: (item, path) => mappin.updated(item, path),
  },
  {
    type: 'sameProp',
    check: item => !_.has(item, 'children') && item.type === 'same',
    action: () => (''),
  },
];

export default (ast) => {
  const iter = (node, path) => {
    const { children } = node;
    const result = children.map((child) => {
      const type = itemType.find(({ check }) => check(child));
      return type.action(child, path, iter);
    });
    return result.filter(item => item).join('\n');
  };
  return iter(ast, '');
};
