import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const typeMapping = {
  json: data => JSON.parse(data),
  yaml: data => yaml.safeLoad(data),
  ini: data => ini.parse(data),
};


export default (extName, data) => {
  if (!_.has(typeMapping, extName)) {
    throw new Error(`Incorrect file extname! Extname: ${extName}`);
  }
  return typeMapping[extName](data);
};
