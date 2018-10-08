import fs from 'fs';
import _ from 'lodash';

const getObjFromFile = (path) => {
  const file = fs.readFileSync(path).toString();
  return file.length ? JSON.parse(file) : {};
};

const getKeys = (obj1, obj2) => Object.keys({ ...obj1, ...obj2 });

const renderItem = (marker, key, value) => `${marker} ${key}: ${value}`;

const getKeyType = (beforeHasKey, afterHasKey) => {
  if (beforeHasKey && afterHasKey) {
    return 'same';
  }
  if (!beforeHasKey && afterHasKey) {
    return 'added';
  }
  return 'removed';
};

const mapping = {
  same: (key, { valueBefore, valueAfter }) => {
    if (valueBefore === valueAfter) {
      return renderItem(' ', key, valueAfter);
    }
    return `${renderItem('+', key, valueAfter)}\n${renderItem('-', key, valueBefore)}`;
  },
  added: (key, { valueAfter }) => renderItem('+', key, valueAfter),
  removed: (key, { valueBefore }) => renderItem('-', key, valueBefore),
};

export default (pathToFile1, pathToFile2) => {
  const before = getObjFromFile(pathToFile1);
  const after = getObjFromFile(pathToFile2);

  const keys = getKeys(before, after).map(key => (
    {
      key,
      type: getKeyType(_.has(before, key), _.has(after, key)),
    }));

  const diffArr = keys.map((item) => {
    const { key, type } = item;
    const values = {
      valueAfter: after[key],
      valueBefore: before[key],
    };
    return mapping[type](key, values);
  }, []);

  return diffArr.join('\n');
};
