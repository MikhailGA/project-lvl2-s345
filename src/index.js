import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildAst from './astBuilder';
import render from './renderers';

const buildObj = (pathFile) => {
  const data = fs.readFileSync(pathFile).toString();

  const extName = path.extname(pathFile).slice(1);

  const result = parse(extName, data);
  return result;
};

export default (pathToFile1, pathToFile2, format) => {
  const before = buildObj(pathToFile1);
  const after = buildObj(pathToFile2);

  const ast = buildAst(before, after);

  return render(ast, format);
};
