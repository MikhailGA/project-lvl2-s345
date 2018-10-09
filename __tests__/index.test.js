import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const beforeJSONPath = './__tests__/__fixtures__/json/before.json';
const afterJSONPath = './__tests__/__fixtures__/json/after.json';
const emptyJSONPath = './__tests__/__fixtures__/json/empty.json';

const result1 = './__tests__/__fixtures__/result1.txt';
const result2 = './__tests__/__fixtures__/result2.txt';

test('Test JSON file', () => {
  expect(genDiff(beforeJSONPath, afterJSONPath)).toBe(fs.readFileSync(result1, 'utf8'));
});

test('Test JSON empty file', () => {
  expect(genDiff(emptyJSONPath, afterJSONPath)).toBe(fs.readFileSync(result2, 'utf8'));
});


const beforeYAMLPath = './__tests__/__fixtures__/yaml/before.yaml';
const afterYAMLPath = './__tests__/__fixtures__/yaml/after.yaml';
const emptyYAMLPath = './__tests__/__fixtures__/yaml/empty.yaml';

test('Test YAML file', () => {
  expect(genDiff(beforeYAMLPath, afterYAMLPath)).toBe(fs.readFileSync(result1, 'utf8'));
});

test('Test YAML empty file', () => {
  expect(genDiff(emptyYAMLPath, afterYAMLPath)).toBe(fs.readFileSync(result2, 'utf8'));
});

// test('Test YAML error file', () => {
//   const errorYamlPath = './__tests__/__fixtures__/yaml/error.yaml';
//   expect(() => genDiff(errorYamlPath, afterYAMLPath)).toThrow(/error.yaml/);
// });


const beforeINIPath = './__tests__/__fixtures__/ini/before.ini';
const afterINIPath = './__tests__/__fixtures__/ini/after.ini';
const emptyINIPath = './__tests__/__fixtures__/ini/empty.ini';

test('Test INI file', () => {
  expect(genDiff(beforeINIPath, afterINIPath)).toBe(fs.readFileSync(result1, 'utf8'));
});

test('Test INI empty file', () => {
  expect(genDiff(emptyINIPath, afterINIPath)).toBe(fs.readFileSync(result2, 'utf8'));
});

// test('Test INI error file', () => {
//   const errorINIPath = './__tests__/__fixtures__/ini/error.ini';
//   expect(() => genDiff(errorINIPath, afterINIPath)).toThrow(/error.ini/);
// });


test('Test error path', () => {
  const unknownPath = './__tests__/__fixtures__/unknown.json';
  expect(() => genDiff(unknownPath, afterJSONPath)).toThrow();
});

test('Test extname error', () => {
  const extNameErrorPath = './__tests__/__fixtures__/extNameError.yason';
  const extName = path.extname(extNameErrorPath).slice(1);
  const errorMessage = `Incorrect file extname! Extname: ${extName}`;
  expect(() => genDiff(extNameErrorPath, afterJSONPath)).toThrow(errorMessage);
});
