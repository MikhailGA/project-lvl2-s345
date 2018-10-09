import yaml from 'js-yaml';

const typeMapping = {
  json: data => JSON.parse(data),
  yaml: data => yaml.safeLoad(data),
};


export default (type, data) => typeMapping[type](data);
