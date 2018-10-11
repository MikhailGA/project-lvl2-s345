import _ from 'lodash';
import Parametr from './nodes/Parametr';
import Group from './nodes/Group';

const isObject = item => typeof item === 'object';

const exist = item => item !== undefined;

const getNode = (name, type, argument) => {
  if (isObject(argument)) {
    const children = Object.keys(argument).map(key => (
      getNode(key, 'same', argument[key])));
    return new Group(name, type, children);
  }
  return new Parametr(name, type, argument);
};

const buildNode = (key, beforeValue, afterValue) => {
  if (exist(beforeValue) && exist(afterValue)) {
    if (beforeValue === afterValue) {
      return getNode(key, 'same', afterValue);
    }
    return [getNode(key, 'added', afterValue), getNode(key, 'deleted', beforeValue)];
  }
  if (!exist(beforeValue) && exist(afterValue)) {
    return getNode(key, 'added', afterValue);
  }
  return getNode(key, 'deleted', beforeValue);
};

const getAST = (before, after) => {
  const keys = Object.keys({ ...before, ...after });

  const ast = keys.reduce((acc, key) => {
    const valueBefore = _.has(before, key) ? before[key] : undefined;
    const valueAfter = _.has(after, key) ? after[key] : undefined;

    if (isObject(valueBefore) && isObject(valueAfter)) {
      return [...acc, new Group(key, 'same', getAST(valueBefore, valueAfter))];
    }
    if (isObject(valueBefore) || isObject(valueAfter)) {
      return [...acc, buildNode(key, valueBefore, valueAfter)];
    }
    return [...acc, buildNode(key, valueBefore, valueAfter)];
  }, []);
  return ast;
};

export default (before, after) => ({
  name: 'root',
  children: getAST(before, after),
});
