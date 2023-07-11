# A makefile for processing changed markdown files

# Define variables
MD_FILES = $(wildcard tmp/*.md)
JS_FILES = $(patsubst tmp/%.md,tmp/%.md.html,$(MD_FILES))

# Define default target
all: $(JS_FILES)

# Define pattern rule for generating js files from md files
%.md.html: %.md
	echo $< >> needUpdate.txt

# Define phony targets for cleaning up
.PHONY: clean

clean:
	rm -f $(JS_FILES)

# Define a target to generate all md.html files after echo step
generate: all
	node build.js

# Set 'generate' as the default target
.DEFAULT_GOAL := generate
