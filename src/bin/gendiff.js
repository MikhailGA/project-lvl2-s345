#!/usr/bin/env node
import program from 'commander';
import gendiff from '../lib';
import pjson from '../../package.json';

const { version } = pjson;

program
  .version(version, '-v, --version')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action(gendiff)
  .parse(process.argv);
