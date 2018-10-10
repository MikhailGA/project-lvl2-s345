import _ from 'lodash';
import buildAst from './astBuilder';
import buildObj from './objBuilder';
import render from './render';

const renderItem = (marker, key, value) => `  ${marker} ${key}: ${value}`;

export default (pathToFile1, pathToFile2) => {
  const before = buildObj(pathToFile1);
  const after = buildObj(pathToFile2);
  const ast = buildAst(before, after);
  console.log(ast);
  console.log(render(ast));
  const keys = Object.keys({ ...before, ...after });

  const diffArr = keys.map((key) => {
    if (_.has(before, key) && _.has(after, key)) {
      if (before[key] === after[key]) {
        return renderItem(' ', key, after[key]);
      }
      return `${renderItem('+', key, after[key])}\n${renderItem('-', key, before[key])}`;
    }
    if (!_.has(before, key) && _.has(after, key)) {
      return renderItem('+', key, after[key]);
    }
    return renderItem('-', key, before[key]);
  });

  return `{\n${diffArr.join('\n')}\n}`;
};
