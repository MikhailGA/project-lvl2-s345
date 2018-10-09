install-deps:
	npm install

install-flow-typed:
	npx flow-typed install

install:
	install-deps install-flow-typed

check-types:
	npx flow

start_json:
	npm run babel-node -- src/bin/gendiff.js "./__tests__/__fixtures__/json/before.json" "./__tests__/__fixtures__/json/after.json"

start_yaml:
	npm run babel-node -- src/bin/gendiff.js "./__tests__/__fixtures__/yaml/before.yaml" "./__tests__/__fixtures__/yaml/empty.yaml"

start_v:
	npx babel-node -- src/bin/gendiff.js -v

start_h:
	npx babel-node -- src/bin/gendiff.js -h

publish:
	npm publish

lint:
	npx eslint .
	
fix:
	eslint src/ --fix

build:
	rm -rf dist
	npm run build

test:
	npm test -s

patch:
	npm version patch

minor:
	npm version minor

major:
	npm version major