./node_modules/.bin/tsc

./node_modules/.bin/browserify index.js --node --debug -o dist.js

./node_modules/.bin/bundle-collapser dist.js > tmp
mv tmp dist.js

./node_modules/.bin/optimize-js dist.js > tmp
mv tmp dist.js

./node_modules/.bin/semi add dist.js --silent


./node_modules/nwsjs/nwsjs dist.js > tmp
mv tmp dist.js

for f in $(find src -name '*.ts'); 
do
    artifact=$(echo $f | awk '{gsub("\\.ts",".js");print}')
	rm $artifact
done 