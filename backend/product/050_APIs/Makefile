SHELL := /bin/bash
.DEFAULT_GOAL := deploy

PRODUCT_NAME := cognito-app
ENVIRONMENT := $(shell aws ssm get-parameter --name Environment --query 'Parameter.Value' --output text)
REGION := $(shell aws configure get region)
ACCOUNT_ID := $(shell aws sts get-caller-identity --query 'Account' --output text)
LAMBDA_BUCKET := $(PRODUCT_NAME)-$(ENVIRONMENT)-lambda-artifacts-$(REGION)-$(ACCOUNT_ID)
LAMBDA_KEY := dummy-data/lambda.zip
CFDEPLOY_SCRIPT := ../../cicd/scripts/cfdeploy

# Stack names
API_STACK := $(PRODUCT_NAME)-api
DUMMY_DATA_STACK := $(PRODUCT_NAME)-dummy-data
DEPLOYMENT_STACK := $(PRODUCT_NAME)-api-deployment

.PHONY: validate-api
validate-api:
	aws cloudformation validate-template \
		--template-body file://api.yaml

.PHONY: validate-dummy-data
validate-dummy-data:
	aws cloudformation validate-template \
		--template-body file://dummy-data-function.yaml

.PHONY: validate-deployment
validate-deployment:
	aws cloudformation validate-template \
		--template-body file://deployment.yaml

.PHONY: validate
validate: validate-api validate-dummy-data validate-deployment

.PHONY: package-lambda
package-lambda:
	zip lambda.zip lambda_function.py

.PHONY: upload-lambda
upload-lambda: package-lambda
	aws s3 cp lambda.zip s3://$(LAMBDA_BUCKET)/$(LAMBDA_KEY)

.PHONY: deploy-api
deploy-api: validate-api
	@$(CFDEPLOY_SCRIPT) api.yaml --region $(REGION) \
		--stack-name $(API_STACK) \
		--parameter ProductName=$(PRODUCT_NAME),DomainName=api.bluecoast.co.za

.PHONY: deploy-dummy-data
deploy-dummy-data: deploy-api validate-dummy-data
	$(eval REST_API_ID := $(shell aws cloudformation describe-stacks --stack-name $(API_STACK) --query 'Stacks[0].Outputs[?OutputKey==`RestApiId`].OutputValue' --output text))
	$(eval ROOT_RESOURCE_ID := $(shell aws cloudformation describe-stacks --stack-name $(API_STACK) --query 'Stacks[0].Outputs[?OutputKey==`RestApiRootResourceId`].OutputValue' --output text))
	@$(CFDEPLOY_SCRIPT) dummy-data-function.yaml --region $(REGION) \
		--stack-name $(DUMMY_DATA_STACK) \
		--parameter ProductName=$(PRODUCT_NAME),RestApiId=$(REST_API_ID),RootResourceId=$(ROOT_RESOURCE_ID)

.PHONY: deploy-deployment
deploy-deployment: deploy-dummy-data validate-deployment
	$(eval REST_API_ID := $(shell aws cloudformation describe-stacks --stack-name $(API_STACK) --query 'Stacks[0].Outputs[?OutputKey==`RestApiId`].OutputValue' --output text))
	@$(CFDEPLOY_SCRIPT) deployment.yaml --region $(REGION) \
		--stack-name $(DEPLOYMENT_STACK) \
		--parameter DomainName=api.bluecoast.co.za,RestApiId=$(REST_API_ID)

.PHONY: deploy
deploy: upload-lambda deploy-deployment

.PHONY: delete-deployment
delete-deployment:
	aws cloudformation delete-stack --stack-name $(DEPLOYMENT_STACK)
	@echo "Waiting for deployment stack deletion..."
	@aws cloudformation wait stack-delete-complete --stack-name $(DEPLOYMENT_STACK)

.PHONY: delete-dummy-data
delete-dummy-data: delete-deployment
	aws cloudformation delete-stack --stack-name $(DUMMY_DATA_STACK)
	@echo "Waiting for dummy data stack deletion..."
	@aws cloudformation wait stack-delete-complete --stack-name $(DUMMY_DATA_STACK)

.PHONY: delete-api
delete-api: delete-dummy-data
	aws cloudformation delete-stack --stack-name $(API_STACK)

.PHONY: delete
delete: delete-api

.PHONY: describe
describe:
	@echo "API Stack:"
	@aws cloudformation describe-stacks --stack-name $(API_STACK)
	@echo "\nDummy Data Stack:"
	@aws cloudformation describe-stacks --stack-name $(DUMMY_DATA_STACK)
	@echo "\nDeployment Stack:"
	@aws cloudformation describe-stacks --stack-name $(DEPLOYMENT_STACK)

.PHONY: outputs
outputs:
	@echo "API Stack Outputs:"
	@aws cloudformation describe-stacks --stack-name $(API_STACK) \
		--query 'Stacks[0].Outputs' --output table
	@echo "\nDummy Data Stack Outputs:"
	@aws cloudformation describe-stacks --stack-name $(DUMMY_DATA_STACK) \
		--query 'Stacks[0].Outputs' --output table
	@echo "\nDeployment Stack Outputs:"
	@aws cloudformation describe-stacks --stack-name $(DEPLOYMENT_STACK) \
		--query 'Stacks[0].Outputs' --output table

.PHONY: clean
clean:
	rm -f lambda.zip
