import _ from 'lodash';
import renderPlain from './renderPlain';
import renderDiff from './renderDiff';

const replace = (key, value) => (_.isObject(value) ? value : `${value}`);

export default (ast, format) => {
  switch (format) {
    case 'json':
      return JSON.stringify(ast, replace, 2);
    case 'plain':
      return renderPlain(ast);
    default:
      return renderDiff(ast);
  }
};
