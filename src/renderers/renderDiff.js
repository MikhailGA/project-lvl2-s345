import _ from 'lodash';

const isObject = item => typeof item === 'object';
const getTab = count => '  '.repeat(count);

const mapping = {
  same: n => `${getTab(n)} `,
  added: n => `${getTab(n)}+`,
  deleted: n => `${getTab(n)}-`,
};

const renderItem = (name, type, value, countTab) => {
  if (isObject(value)) {
    const items = Object.keys(value).map(key => renderItem(key, 'same', value[key], countTab + 2));
    const noNameitems = `{\n${items.join('\n')}\n${getTab(countTab + 1)}}`;
    return `${mapping[type](countTab)} ${name}: ${noNameitems}`;
  }
  return `${mapping[type](countTab)} ${name}: ${value}`;
};

const renderGroup = ({ name, type }, body, countTab) => (
  `${mapping[type](countTab)} ${name}: {\n${body}\n  ${getTab(countTab)}}`);


export default ({ children }) => {
  const iter = (item, tabCount) => {
    if (_.has(item, 'children')) {
      const body = item.children.map(child => iter(child, tabCount + 2));
      return renderGroup(item, body.join('\n'), tabCount);
    }
    if (item.type === 'updated') {
      const {
        name,
        valueBefore,
        valueAfter,
      } = item;
      const result = [
        renderItem(name, 'added', valueAfter, tabCount),
        renderItem(name, 'deleted', valueBefore, tabCount),
      ];
      return result.join('\n');
    }
    return renderItem(..._.values(item), tabCount);
  };

  return `{\n${children.map(node => iter(node, 1)).join('\n')}\n}`;
};
