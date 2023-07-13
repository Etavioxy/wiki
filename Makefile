# A makefile for processing changed markdown files

INPUT_DIR = assets
OUTPUT_DIR = dist/client/wiki

# Define variables
MD_FILES = $(wildcard $(INPUT_DIR)/*.md)
HTML_FILES = $(patsubst $(INPUT_DIR)/%.md,$(OUTPUT_DIR)/%/index.html,$(MD_FILES))

# Define default target
all: $(HTML_FILES)
	@(pnpm run build && $(MAKE) clean-on-error) || $(MAKE) clean-on-error

# Define pattern rule for generating html files from md files
$(OUTPUT_DIR)/%/index.html: $(INPUT_DIR)/%.md
	echo $< >> $(INPUT_DIR)/needUpdate.txt

# Define phony targets for cleaning up
.PHONY: clean clean-on-error

clean: clean-on-error
	rm -rf dist/

clean-on-error:
	echo|set /p= > $(INPUT_DIR)/needUpdate.txt

# Set 'all' as the default target
.DEFAULT_GOAL := all
