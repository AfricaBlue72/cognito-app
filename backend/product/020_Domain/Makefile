# Makefile for deploying Hosted Zone CloudFormation stack

# Variables
TEMPLATE_FILE := cognito-app-hosting-domain.yaml
CFDEPLOY_SCRIPT := ../../cicd/scripts/cfdeploy
REGION := eu-west-1

# CloudFormation parameters
TOP_LEVEL_DOMAIN ?= bluecoast.co.za
SUB_DOMAIN ?= cognito-app
PRODUCT_NAME ?= cognito-app

# Default target
.PHONY: deploy
deploy:
	@echo "Deploying Hosted Zone stack..."
	@$(CFDEPLOY_SCRIPT) $(TEMPLATE_FILE) \
		--region $(REGION) \
		--parameter ProductName=$(PRODUCT_NAME),TopLevelDomainName=$(TOP_LEVEL_DOMAIN),SubDomainName=$(SUB_DOMAIN)

# Clean up target (optional, implement if needed)
.PHONY: clean
clean:
	@echo "Cleaning up stack..."
	# Add cleanup commands if necessary

# Help target
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  deploy  - Deploy the Hosted Zone stack"
	@echo "  clean   - Clean up resources (if implemented)"
	@echo "  help    - Show this help message"
	@echo ""
	@echo "Parameters:"
	@echo "  TOP_LEVEL_DOMAIN - The top-level domain (default: example.com)"
	@echo "  SUB_DOMAIN       - The subdomain (default: app)"
	@echo ""
	@echo "Example usage:"
	@echo "  make deploy TOP_LEVEL_DOMAIN=mydomain.com SUB_DOMAIN=myapp"
