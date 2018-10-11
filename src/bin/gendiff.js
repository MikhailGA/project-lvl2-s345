#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';
import pjson from '../../package.json';

const { version } = pjson;

program
  .version(version, '-v, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'diff')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
