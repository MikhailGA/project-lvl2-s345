import fs from 'fs';
import genDiff from '../src';

const beforePath = './__tests__/__fixtures__/before.json';
const afterPath = './__tests__/__fixtures__/after.json';
const result1 = './__tests__/__fixtures__/result1.txt';
const result2 = './__tests__/__fixtures__/result2.txt';


const readFile = path => fs.readFileSync(path).toString();

test('Test1 relative path', () => {
  expect(genDiff(beforePath, afterPath)).toBe(readFile(result1));
});

test('Test2 empty file', () => {
  const emptyPath = './__tests__/__fixtures__/empty.json';
  expect(genDiff(emptyPath, afterPath)).toBe(readFile(result2));
});

test('Test4 error path', () => {
  const unknownPath = './__tests__/__fixtures__/unknown.json';
  expect(() => genDiff(unknownPath, afterPath)).toThrow();
});
