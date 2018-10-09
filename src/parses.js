import yaml from 'js-yaml';

const parseJson = file => JSON.parse(file);
const parseYaml = file => yaml.safeLoad(file);


export default {
  json: parseJson,
  yaml: parseYaml,
};
