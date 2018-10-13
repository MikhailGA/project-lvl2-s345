import fs from 'fs';
import genDiff from '../src';

const testPath = './__tests__/__fixtures__';

const beforeJSONPath = `${testPath}/json/before.json`;
const afterJSONPath = `${testPath}/json/after.json`;

const diff = () => fs.readFileSync(`${testPath}/results/diff.txt`, 'utf8');
const plain = () => fs.readFileSync(`${testPath}/results/plain.txt`, 'utf8');
const json = () => fs.readFileSync(`${testPath}/results/json.json`, 'utf8');

test('Test JSON file', () => {
  expect(genDiff(beforeJSONPath, afterJSONPath, 'diff')).toBe(diff());
});

test('Test JSON file options -f plain', () => {
  expect(genDiff(beforeJSONPath, afterJSONPath, 'plain')).toBe(plain());
});

test('Test JSON file options -f json', () => {
  expect(genDiff(beforeJSONPath, afterJSONPath, 'json')).toBe(json());
});


const beforeYAMLPath = `${testPath}/yaml/before.yaml`;
const afterYAMLPath = `${testPath}/yaml/after.yaml`;

test('Test YAML file', () => {
  expect(genDiff(beforeYAMLPath, afterYAMLPath, 'diff')).toBe(diff());
});

test('Test YAML file options -f plain', () => {
  expect(genDiff(beforeYAMLPath, afterYAMLPath, 'plain')).toBe(plain());
});

test('Test YAML file options -f json', () => {
  expect(genDiff(beforeYAMLPath, afterYAMLPath, 'json')).toBe(json());
});

const beforeINIPath = `${testPath}/ini/before.ini`;
const afterINIPath = `${testPath}/ini/after.ini`;


test('Test INI file', () => {
  expect(genDiff(beforeINIPath, afterINIPath, 'diff')).toBe(diff());
});


test('Test INI file -f plain', () => {
  expect(genDiff(beforeINIPath, afterINIPath, 'plain')).toBe(plain());
});

test('Test INI file options -f json', () => {
  expect(genDiff(beforeINIPath, afterINIPath, 'json')).toBe(json());
});
