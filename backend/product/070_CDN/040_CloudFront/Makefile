# Makefile for deploying ACM Certificate stack in us-east-1

# Variables
TEMPLATE_FILE := cognito-app-cdn.yaml
CFDEPLOY_SCRIPT := ../../../cicd/scripts/cfdeploy
REGION := eu-west-1

# CloudFormation parameters
TOP_LEVEL_DOMAIN ?= bluecoast.co.za
SUB_DOMAIN ?= cognito-app
PRODUCT_NAME ?= cognito-app

CertificateArn = $(shell aws cloudformation --region us-east-1 list-exports --query 'Exports[?Name==`$(PRODUCT_NAME)-certificate`].Value' --output text)
# WebACLArn =    $(shell aws cloudformation --region us-east-1 list-exports --query 'Exports[?Name==`CognitoTestWebsiteCDNWAFArn`].Value' --output text)
# DomainName =	 $(shell aws cloudformation list-exports --query 'Exports[?Name==`CognitoTestWebsiteDomainName`].Value' --output text)

# Default target
.PHONY: deploy
deploy:
	@echo "Deploying Hosted Zone stack..."
	@$(CFDEPLOY_SCRIPT) $(TEMPLATE_FILE) \
		--region $(REGION) \
		--parameter ProductName=$(PRODUCT_NAME),TopLevelDomainName=$(TOP_LEVEL_DOMAIN),SubDomainName=$(SUB_DOMAIN),AcmCertificateArn=$(CertificateArn)

# Clean up target (optional, implement if needed)
.PHONY: clean
clean:
	@echo "Cleaning up stack..."
	# Add cleanup commands if necessary

# Echo CertificateArn target
.PHONY: echo-certificate-arn
echo-certificate-arn:
	@echo "CertificateArn: $(CertificateArn)"

# Help target
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  deploy              - Deploy the Hosted Zone stack"
	@echo "  clean               - Clean up resources (if implemented)"
	@echo "  echo-certificate-arn - Echo the CertificateArn"
	@echo "  help                - Show this help message"
	@echo ""
	@echo "Parameters:"
	@echo "  TOP_LEVEL_DOMAIN - The top-level domain (default: example.com)"
	@echo "  SUB_DOMAIN       - The subdomain (default: app)"
	@echo "  PRODUCT_NAME     - The product"
	@echo ""
	@echo "Example usage:"
	@echo "  make deploy TOP_LEVEL_DOMAIN=mydomain.com SUB_DOMAIN=myapp PRODUCT_NAME=myproduct"
	@echo "  make echo-certificate-arn"
