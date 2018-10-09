import yaml from 'js-yaml';
import _ from 'lodash';

const typeMapping = {
  json: data => JSON.parse(data),
  yaml: data => yaml.safeLoad(data),
};


export default (type, data) => {
  if (!_.has(typeMapping, type)) {
    throw new Error(`Incorrect file extname! ExtName: ${type}`);
  }
  return typeMapping[type](data);
};
