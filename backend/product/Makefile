# Makefile for building and deploying the project

# Phony targets
.PHONY: build deploy

# Get sorted list of subdirectories
SUBDIRS := $(sort $(dir $(wildcard */)))

# Build target
build:
	@echo "Building project..."
	@for dir in $(SUBDIRS); do \
		if [ -f $$dir/Makefile ]; then \
			echo "Building in $$dir"; \
			$(MAKE) -C $$dir build; \
		fi; \
	done

# Deploy target
deploy:
	@echo "Deploying project..."
	@for dir in $(SUBDIRS); do \
		if [ -f $$dir/Makefile ]; then \
			echo "Deploying in $$dir"; \
			$(MAKE) -C $$dir deploy; \
		fi; \
	done

# Default target
all: build deploy
