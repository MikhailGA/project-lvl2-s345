import fs from 'fs';
import path from 'path';
import parse from './parsers';

export default (pathFile) => {
  const data = fs.readFileSync(pathFile).toString();

  const extName = path.extname(pathFile).slice(1);

  const result = parse(extName, data);
  return result;
};
