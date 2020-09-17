welcome:
	@echo "Hello from Makefile =)"

lint:
	hadolint ./front-end/Dockerfile
	hadolint ./todo-service/Dockerfile
	hadolint ./todo-service-db/Dockerfile