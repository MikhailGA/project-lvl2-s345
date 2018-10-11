import _ from 'lodash';

const getTab = count => '  '.repeat(count);
const isArray = item => item instanceof Array;

const mapping = {
  same: n => `${getTab(n)} `,
  added: n => `${getTab(n)}+`,
  deleted: n => `${getTab(n)}-`,
};

const renderGroup = ({ name, type }, body, countTab) => (
  `${mapping[type](countTab)} ${name}: {\n${body}\n  ${getTab(countTab)}}`);

const renderItem = ({ name, type, value }, countTab) => (
  `${mapping[type](countTab)} ${name}: ${value}`);


const render = ({ children }) => {
  const iter = (item, tabCount) => {
    if (isArray(item)) {
      const items = item.map(node => iter(node, tabCount));
      return items.join('\n');
    }
    if (_.has(item, 'children')) {
      const body = item.children.map(child => iter(child, tabCount + 2));
      return renderGroup(item, body.join('\n'), tabCount);
    }
    return renderItem(item, tabCount);
  };

  return `{\n${children.map(node => iter(node, 1)).join('\n')}\n}`;
};

export default render;
