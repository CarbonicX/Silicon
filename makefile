test: build copy run

build:
	npx tsc

copy:
	rmdir /s /q test\webpage\lib
	xcopy dist\lib test\webpage\lib /e /i /h
	xcopy lib\styles test\webpage\lib\styles /e /i /h

run:
	npx serve ./test/webpage

compiler:
	npx tsup
