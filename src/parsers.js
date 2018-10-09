import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const typeMapping = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};


export default (extName, data) => {
  if (!_.has(typeMapping, extName)) {
    throw new Error(`Incorrect file extname! Extname: ${extName}`);
  }
  return typeMapping[extName](data);
};
