import fs from 'fs';
import genDiff from '../src';

let beforePath;
let afterPath;
let diffPath;
let result;

const readFile = path => fs.readFileSync(path).toString();

test('Test1 relative path', () => {
  beforePath = './__tests__/__fixtures__/before.json';
  afterPath = './__tests__/__fixtures__/after.json';
  diffPath = './__tests__/__fixtures__/result1.txt';
  result = readFile(diffPath);

  expect(genDiff(beforePath, afterPath)).toBe(result);
});

test('Test2 empty file', () => {
  beforePath = './__tests__/__fixtures__/empty.json';
  afterPath = './__tests__/__fixtures__/after.json';
  diffPath = './__tests__/__fixtures__/result2.txt';
  result = readFile(diffPath);

  expect(genDiff(beforePath, afterPath)).toBe(result);
});

test('Test4 error path', () => {
  beforePath = './__tests__/__fixtures__/unknown.json';
  afterPath = './__tests__/__fixtures__/after.json';

  expect(() => genDiff(beforePath, afterPath)).toThrow();
});
