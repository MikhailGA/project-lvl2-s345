import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const beforeJSONPath = './__tests__/__fixtures__/json/before.json';
const afterJSONPath = './__tests__/__fixtures__/json/after.json';
const beforeJSONPath2 = './__tests__/__fixtures__/json/before2.json';
const afterJSONPath2 = './__tests__/__fixtures__/json/after2.json';

const result1 = () => fs.readFileSync('./__tests__/__fixtures__/result1.txt', 'utf8');
const result2 = () => fs.readFileSync('./__tests__/__fixtures__/result2.txt', 'utf8');

test('Test JSON file', () => {
  expect(genDiff(beforeJSONPath, afterJSONPath)).toBe(result1());
});

test('Test JSON complicated file', () => {
  expect(genDiff(beforeJSONPath2, afterJSONPath2)).toBe(result2());
});


const beforeYAMLPath = './__tests__/__fixtures__/yaml/before.yaml';
const afterYAMLPath = './__tests__/__fixtures__/yaml/after.yaml';
const beforeYAMLPath2 = './__tests__/__fixtures__/yaml/before2.yaml';
const afterYAMLPath2 = './__tests__/__fixtures__/yaml/after2.yaml';

test('Test YAML file', () => {
  expect(genDiff(beforeYAMLPath, afterYAMLPath)).toBe(result1());
});

test('Test YAML complicated file', () => {
  expect(genDiff(beforeYAMLPath2, afterYAMLPath2)).toBe(result2());
});


const beforeINIPath = './__tests__/__fixtures__/ini/before.ini';
const afterINIPath = './__tests__/__fixtures__/ini/after.ini';
const beforeINIPath2 = './__tests__/__fixtures__/ini/before2.ini';
const afterINIPath2 = './__tests__/__fixtures__/ini/after2.ini';


test('Test INI file', () => {
  expect(genDiff(beforeINIPath, afterINIPath)).toBe(result1());
});

test('Test INI complicated file', () => {
  expect(genDiff(beforeINIPath2, afterINIPath2)).toBe(result2());
});


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
