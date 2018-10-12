import _ from 'lodash';

const getDeep = deeplvl => '  '.repeat(deeplvl);
const getType = value => (_.isObject(value) ? 'complex' : 'simple');

const valueTypeMappin = {
  simple: value => value,
  complex: (obj, deepLvl) => {
    const items = Object.keys(obj).map(key => `${getDeep(deepLvl + 2)}  ${key}: ${obj[key]}`);
    return `{\n${items.join('\n')}\n${getDeep(deepLvl + 1)}}`;
  },
};

const renderItem = (name, value, deepLvl, sign) => {
  const type = getType(value);
  const result = valueTypeMappin[type](value, deepLvl);
  return `${getDeep(deepLvl)}${sign || ' '} ${name}: ${result}`;
};

const nodeTypeMappin = {
  updated: ({ name, valueBefore, valueAfter }, deepLvl) => {
    const result = [
      renderItem(name, valueAfter, deepLvl, '+'),
      renderItem(name, valueBefore, deepLvl, '-')];
    return result.join('\n');
  },

  deleted: ({ name, valueBefore }, deepLvl) => renderItem(name, valueBefore, deepLvl, '-'),

  added: ({ name, valueAfter }, deepLvl) => renderItem(name, valueAfter, deepLvl, '+'),

  nest: ({ name, children }, deepLvl, fn) => {
    const deep = getDeep(deepLvl + 1);
    const body = fn(children, deepLvl + 2);
    return `${deep}${name}: {\n${body}\n${deep}}`;
  },

  unchanged: ({ name, valueAfter }, deepLvl) => renderItem(name, valueAfter, deepLvl),
};

export default (ast) => {
  const iter = (node, deepLvl) => {
    const result = node.map(child => nodeTypeMappin[child.type](child, deepLvl, iter));
    return result.join('\n');
  };
  return `{\n${iter(ast, 1)}\n}`;
};
