import genDiff from '../../src/lib/index';

const path1 = '/config1';
const path2 = '/config2';
const options = { format: 'json' };

test('My first jest test', () => {
  expect(genDiff(path1, path2, options)).toBe(`Compare two files: 1-${path1}, 2-${path2}. Output format: ${options.format}`);
});
