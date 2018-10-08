import fs from 'fs';
// import genDiff from '../src';
import genDiff from 'gendiffs345';

test('Test1 relative path', () => {
  const beforePath = './__tests__/__fixtures__/before.json';
  const afterPath = './__tests__/__fixtures__/after.json';
  const diffPath = './__tests__/__fixtures__/result1.txt';
  const diff = fs.readFileSync(diffPath, 'utf8');

  expect(genDiff(beforePath, afterPath)).toBe(diff);
});

test('Test2 empty file', () => {
  const beforePath = './__tests__/__fixtures__/empty.json';
  const afterPath = './__tests__/__fixtures__/after.json';
  const diffPath = './__tests__/__fixtures__/result2.txt';
  const diff = fs.readFileSync(diffPath, 'utf8');

  expect(genDiff(beforePath, afterPath)).toBe(diff);
});

test('Test3 absolute path', () => {
  const beforePath = '/home/mihail/nodeProject/project-lvl2-s345/__tests__/__fixtures__/before.json';
  const afterPath = '/home/mihail/nodeProject/project-lvl2-s345/__tests__/__fixtures__/after.json';
  const diffPath = '/home/mihail/nodeProject/project-lvl2-s345/__tests__/__fixtures__/result1.txt';

  const diff = fs.readFileSync(diffPath, 'utf8');

  expect(genDiff(beforePath, afterPath)).toBe(diff);
});

test('Test4 error path', () => {
  const beforePath = './__tests__/__fixtures__/unknown.json';
  const afterPath = './__tests__/__fixtures__/after.json';

  expect(() => genDiff(beforePath, afterPath)).toThrow();
});
