import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const beforeJSONPath = './__tests__/__fixtures__/json/before.json';
const afterJSONPath = './__tests__/__fixtures__/json/after.json';
const emptyPath = './__tests__/__fixtures__/empty.txt';
const result1 = './__tests__/__fixtures__/result1.txt';
const result2 = './__tests__/__fixtures__/result2.txt';


const readFile = pathFile => fs.readFileSync(pathFile).toString();

test('Test1 JSON file', () => {
  expect(genDiff(beforeJSONPath, afterJSONPath)).toBe(readFile(result1));
});

test('Test2 JSON empty file', () => {
  // const emptyPath = './__tests__/__fixtures__/empty.txt';
  expect(genDiff(emptyPath, afterJSONPath)).toBe(readFile(result2));
});

const beforeYAMLPath = './__tests__/__fixtures__/yaml/before.yaml';
const afterYAMLPath = './__tests__/__fixtures__/yaml/after.yaml';

test('Test3 YAML file', () => {
  expect(genDiff(beforeYAMLPath, afterYAMLPath)).toBe(readFile(result1));
});

test('Test4 YAML empty file', () => {
  expect(genDiff(emptyPath, afterYAMLPath)).toBe(readFile(result2));
});

test('Test5 error path', () => {
  const unknownPath = './__tests__/__fixtures__/unknown.json';
  expect(() => genDiff(unknownPath, afterJSONPath)).toThrow();
});

test('Test6 extname error', () => {
  const extNameErrorPath = './__tests__/__fixtures__/extNameError.yason';

  const extName = path.extname(extNameErrorPath).slice(1);
  const errorMessage = `Incorrect file extName: ${extName}`;

  expect(() => genDiff(extNameErrorPath, afterJSONPath)).toThrow(errorMessage);
});
