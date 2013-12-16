BROWSERIFY = node ./node_modules/browserify/bin/cmd.js
WIPS_CURRENT = node ./node_modules/bin/wisp.js
FLAGS =

ifdef verbose
	FLAGS = --verbose
endif

ifdef current
	WISP = $(WIPS_CURRENT)
else
	WISP = ./node_modules/wisp/bin/wisp.js
endif


all: main bundle clean

clean:
	rm ./main.js

main:
	cat ./src/main.wisp | $(WISP) --source-uri try-wisp/main.wisp --output-uri main.js --no-map > ./main.js


bundle:
	$(BROWSERIFY) --debug \
                --exports require \
                --entry ./main.js > ./build/app.js
