import renderPlain from './renderPlain';
import renderDiff from './renderDiff';

export default (ast, format) => {
  switch (format) {
    case 'plain':
      return renderPlain(ast);
    default:
      return renderDiff(ast);
  }
};
