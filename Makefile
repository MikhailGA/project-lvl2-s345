install: 
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js -f json "file1" "file2"

start_v:
	npm run babel-node -- src/bin/gendiff.js -v

start_f:
	npm run babel-node -- src/bin/gendiff.js -f

start_h:
	npm run babel-node -- src/bin/gendiff.js -h

start_s:
	npm run babel-node -- src/bin/gendiff.js -s

publish:
	npm publish

lint:
	eslint src/
	
fix:
	eslint src/ --fix

build:
	npm run build

test:
	npm test -s