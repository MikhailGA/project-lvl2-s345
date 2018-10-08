#!/usr/bin/env node
import program from 'commander';
import gendiff from '../lib';
import pjson from '../../package.json';

const { version } = pjson;

program
  .version(version, '-v, --version')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(gendiff)
  .parse(process.argv);
