@echo off

call node_modules\.bin\tsc

call node_modules\.bin\browserify index.js --node --debug -o dist.js 

rem node_modules\nwsjs\nwsjs dist.js > tmp
rem del dist.js
rem rename tmp dist.js

del index.js

cd src
for /r %%x in (*.js) do del "%%x"
cd ../
