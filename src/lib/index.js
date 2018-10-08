export default (firstConfig, secondConfig, options) => {
  console.log('Run lib');
  console.log(`Compare two files: 1-${firstConfig}, 2-${secondConfig}.`);
  // console.log(options);
  return `Compare two files: 1-${firstConfig}, 2-${secondConfig}. Output format: ${options.format}`;
};
