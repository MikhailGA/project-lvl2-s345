import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const testPath = './__tests__/__fixtures__';

const beforeJSONPath = `${testPath}/json/before.json`;
const afterJSONPath = `${testPath}/json/after.json`;
const beforeJSONPath2 = `${testPath}/json/beforeComplicated.json`;
const afterJSONPath2 = `${testPath}/json/afterComplicated.json`;

const diff = () => fs.readFileSync(`${testPath}/results/diff.txt`, 'utf8');
const diffComlicated = () => fs.readFileSync(`${testPath}/results/diffComplicated.txt`, 'utf8');
const plain = () => fs.readFileSync(`${testPath}/results/plain.txt`, 'utf8');
const plainComplicated = () => fs.readFileSync(`${testPath}/results/plainComplicated.txt`, 'utf8');

test('Test JSON file', () => {
  expect(genDiff(beforeJSONPath, afterJSONPath)).toBe(diff());
});

test('Test JSON file options -f plain', () => {
  expect(genDiff(beforeJSONPath, afterJSONPath, 'plain')).toBe(plain());
});

test('Test JSON complicated file', () => {
  expect(genDiff(beforeJSONPath2, afterJSONPath2)).toBe(diffComlicated());
});

test('Test JSON complicated file options -f plain', () => {
  expect(genDiff(beforeJSONPath2, afterJSONPath2, 'plain')).toBe(plainComplicated());
});


const beforeYAMLPath = `${testPath}/yaml/before.yaml`;
const afterYAMLPath = `${testPath}/yaml/after.yaml`;
const beforeYAMLPath2 = `${testPath}/yaml/beforeComplicated.yaml`;
const afterYAMLPath2 = `${testPath}/yaml/afterComplicated.yaml`;

test('Test YAML file', () => {
  expect(genDiff(beforeYAMLPath, afterYAMLPath)).toBe(diff());
});

test('Test YAML complicated file', () => {
  expect(genDiff(beforeYAMLPath2, afterYAMLPath2)).toBe(diffComlicated());
});

test('Test YAML file options -f plain', () => {
  expect(genDiff(beforeYAMLPath, afterYAMLPath, 'plain')).toBe(plain());
});

test('Test YAML complicated file options -f plain', () => {
  expect(genDiff(beforeYAMLPath2, afterYAMLPath2, 'plain')).toBe(plainComplicated());
});


const beforeINIPath = `${testPath}/ini/before.ini`;
const afterINIPath = `${testPath}/ini/after.ini`;
const beforeINIPath2 = `${testPath}/ini/beforeComplicated.ini`;
const afterINIPath2 = `${testPath}/ini/afterComplicated.ini`;


test('Test INI file', () => {
  expect(genDiff(beforeINIPath, afterINIPath)).toBe(diff());
});

test('Test INI complicated file', () => {
  expect(genDiff(beforeINIPath2, afterINIPath2)).toBe(diffComlicated());
});

test('Test INI file -f plain', () => {
  expect(genDiff(beforeINIPath, afterINIPath, 'plain')).toBe(plain());
});

test('Test INI complicated file -f plain', () => {
  expect(genDiff(beforeINIPath2, afterINIPath2, 'plain')).toBe(plainComplicated());
});


test('Test error path', () => {
  const unknownPath = `${testPath}/unknown.json`;
  expect(() => genDiff(unknownPath, afterJSONPath)).toThrow();
});

test('Test extname error', () => {
  const extNameErrorPath = `${testPath}/extNameError.yason`;
  const extName = path.extname(extNameErrorPath).slice(1);
  const errorMessage = `Incorrect file extname! Extname: ${extName}`;
  expect(() => genDiff(extNameErrorPath, afterJSONPath)).toThrow(errorMessage);
});
