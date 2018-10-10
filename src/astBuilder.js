import _ from 'lodash';
import Parametr from './nodes/Parametr';
import Group from './nodes/Group';

const isObject = item => typeof item === 'object';
const exist = item => item !== undefined;

const buildParametr = (key, beforeValue, afterValue) => {
  if (exist(beforeValue) && exist(afterValue)) {
    if (beforeValue === afterValue) {
      return new Parametr(key, 'same', afterValue);
    }
    return new Parametr(key, 'updated', { new: afterValue, old: beforeValue });
  }
  if (!exist(beforeValue) && exist(afterValue)) {
    return new Parametr(key, 'added', afterValue);
  }
  return new Parametr(key, 'deleted', beforeValue);
};

const getDiff = (before, after) => {
  const keys = Object.keys({ ...before, ...after });
  // console.log(keys);

  const ast = keys.reduce((acc, key) => {
    const valueBefore = _.has(before, key) ? before[key] : undefined;
    const valueAfter = _.has(after, key) ? after[key] : undefined;

    if (isObject(valueBefore) && isObject(valueAfter)) {
      return [...acc, new Group(key, 'same', getDiff(valueBefore, valueAfter))];
    }
    if (isObject(valueBefore) || isObject(valueAfter)) {
      return [...acc, buildParametr(key, valueBefore, valueAfter)];
    }
    return [...acc, buildParametr(key, valueBefore, valueAfter)];
  }, []);
  // console.log(ast);
  return ast;
};

export default (before, after) => ({
  name: 'root',
  children: getDiff(before, after),
});
