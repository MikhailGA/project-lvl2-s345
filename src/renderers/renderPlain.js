import _ from 'lodash';

const valueAdded = value => (_.isObject(value) ? '[complex value]' : value);
const renderPath = path => (path ? `${path.slice(1)}.` : '');

const nodeTypeMappin = {
  updated: ({ name, valueBefore, valueAfter }, path) => (
    `Property '${renderPath(path)}${name}' was updated. From '${valueAdded(valueBefore)}' to '${valueAdded(valueAfter)}'`),

  deleted: ({ name }, path) => `Property '${renderPath(path)}${name}' was removed`,

  added: ({ name, valueAfter }, path) => `Property '${renderPath(path)}${name}' was added with value: ${valueAdded(valueAfter)}`,

  nest: (item, path, fn) => fn(item.children, `${path}.${item.name}`),

  unchanged: () => '',
};

export default (ast) => {
  const iter = (node, path) => {
    const result = node.map(child => nodeTypeMappin[child.type](child, path, iter));
    return _.without(result, '').join('\n');
  };
  return iter(ast, '');
};
