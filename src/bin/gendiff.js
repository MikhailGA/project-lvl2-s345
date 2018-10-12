#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';
import pjson from '../../package.json';

const { version, description } = pjson;

program
  .version(version, '-v, --version')
  .description(description)
  .option('-f, --format [type]', 'output format', 'diff')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
