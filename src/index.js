import buildAst from './astBuilder';
import buildObj from './objBuilder';
import render from './render';

export default (pathToFile1, pathToFile2) => {
  const before = buildObj(pathToFile1);
  const after = buildObj(pathToFile2);

  const ast = buildAst(before, after);

  return render(ast);
};
