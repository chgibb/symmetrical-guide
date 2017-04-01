@echo off

call node_modules\.bin\tsc

call node_modules\.bin\browserify index.js --node --debug -o dist.js 

node_modules\nwsjs\nwsjs dist.js > tmp
del dist.js
rename tmp dist.js

del index.js

cd src
for /r %%x in (*.js) do del "%%x"
cd ../
