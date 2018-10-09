import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parsers from './parsers';

const getObjFromFile = (pathFile) => {
  const data = fs.readFileSync(pathFile).toString();

  const extName = path.extname(pathFile).slice(1);

  const result = parsers(extName, data);
  return result;
};

const renderItem = (marker, key, value) => `${marker} ${key}: ${value}`;

export default (pathToFile1, pathToFile2) => {
  const before = getObjFromFile(pathToFile1);
  const after = getObjFromFile(pathToFile2);

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

  return diffArr.join('\n');
};
