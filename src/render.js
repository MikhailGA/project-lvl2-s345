import _ from 'lodash';

const getTab = n => '  '.repeat(n);
const isObject = item => typeof item === 'object';

const renderObject = obj => Object.keys(obj).map(key => `${key}: ${obj[key]}`);


const mapping = {
  same: (item, n) => `${getTab(n)}  ${item.name}: ${item.value}`,
  added: (item, n) => `${getTab(n)}+ ${item.name}: ${item.value}`,
  deleted: (item, n) => `${getTab(n)}- ${item.name}: ${item.value}`,
  updated: (item, n) => `${getTab(n)}+ ${item.name}: ${item.value.new}\n${getTab(n)}- ${item.name}: ${item.value.old}`,
};
// `${renderItem('+', key, after[key])}\n${renderItem('-', key, before[key])}`
const render = ({ children }) => {

  const iter = (item, tabCount) => {
    return mapping[item.type](item, tabCount);
  };
  // if (_.has(ast, 'children')) {
  //   const { children } = ast;

  //   const result = children.map(item => mapping[item.type](item, 1));
  //   return `{\n${result.join('\n')}\n}`;
  // }
  const arr = children.map((item) => {
    if (isObject(item)) {
      return `{\n${renderObject(item.value).join('\n')}\n}`;
    }
    return iter(item, 1);
  });
  return `{\n${arr.join('\n')}\n}`;
};

export default render;
