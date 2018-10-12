# GenDiff

[![Maintainability](https://api.codeclimate.com/v1/badges/92f6d5cc7766b89f347f/maintainability)](https://codeclimate.com/github/MikhailGA/project-lvl2-s345/maintainability)

[![Build Status](https://travis-ci.org/MikhailGA/project-lvl2-s345.svg?branch=master)](https://travis-ci.org/MikhailGA/project-lvl2-s345)

## Asciinema

* [Step1](https://asciinema.org/a/I9GCoWO50dhf3HK5kW6e8j8tR)
* [Step2](https://asciinema.org/a/e8TsMxe4ccasiGtWdmkIJn0kI)
* [Step3](https://asciinema.org/a/REpmiwK8HrLM9mXZzRs42DqkR)
* [Step4](https://asciinema.org/a/wfE4hB1QVVJzqY32fJccKVjAh)
* [Step5](https://asciinema.org/a/hIncfnqiwO0q0evMlNyv5nulo)
* [Step6](https://asciinema.org/a/VBLSByManGwBpp5Eys9uvUGBu)
* [Step7](https://asciinema.org/a/NWM1RnMlASPwk5H0Xckc5V4A4)

## ABOUT gendiff 
Compares two configuration files and shows a difference.

## INSTALLATION

```
$ npm install gengiffs345
```

## USAGE

```
$ gendiff [options] <firstConfig> <secondConfig>
```
### Support options

```
-v, --version        output the version number
-f, --format [type]  output format (default: diff)
-h, --help           output usage information
```
### Support configuration file
```
*.json
*.yaml
*.ini
```
### Support output format type
```
plain
json
diff(default)
```

## EXAMPLE
```
$ npm install -g gendiffs345
$ gendiff -f plain before.json after.json

Property 'common.setting2' was removed
Property 'common.setting3' was updated. From 'true' to '[complex value]'
Property 'common.setting6.ops' was added with value: vops
Property 'common.follow' was added with value: false
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From '[complex value]' to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```