.PHONY: help install dev build test clean docker-up docker-down migrate seed

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	npm install

dev: ## Start development servers
	npm run dev

build: ## Build all apps
	npm run build

test: ## Run all tests
	npm run test

clean: ## Clean build artifacts and dependencies
	npm run clean
	rm -rf node_modules apps/*/node_modules packages/*/node_modules

docker-up: ## Start Docker containers
	docker-compose up -d

docker-down: ## Stop Docker containers
	docker-compose down

docker-logs: ## View Docker logs
	docker-compose logs -f

migrate: ## Run database migrations
	cd apps/api && npx prisma migrate dev

migrate-deploy: ## Deploy database migrations
	cd apps/api && npx prisma migrate deploy

seed: ## Seed database
	cd apps/api && npm run seed

prisma-studio: ## Open Prisma Studio
	cd apps/api && npx prisma studio

contracts-compile: ## Compile smart contracts
	cd apps/contracts && npx hardhat compile

contracts-test: ## Test smart contracts
	cd apps/contracts && npx hardhat test

contracts-deploy: ## Deploy smart contracts
	cd apps/contracts && npx hardhat run scripts/deploy.ts

format: ## Format code
	npm run format

lint: ## Lint code
	npm run lint

typecheck: ## Type check
	npm run typecheck
