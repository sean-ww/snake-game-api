.PHONY: all

info: intro commands

intro:
	@echo "\nSnake Game API️\n"

commands:
	@echo "  make info          Show the make commands you can run."
	@echo "  make init          Initialise the project for development."
	@echo "  make start         Start the project for development."
	@echo "  make stop          Stop the project for development."
	@echo "  make restart       Restart the project for development."
	@echo "  make update        Update the project."
	@echo "  make shell         Open shell in the app container."
	@echo "  make lint          Run eslint."


# ===========================
# Commands
# ===========================
init: intro do_build_container do_prepare_app do_start_container
start: intro do_start_container
stop: intro do_stop_container
restart: intro do_stop_container do_start_container
update: intro do_prepare_app
app-shell: intro do_run_app_shell
db-shell: intro do_run_db_shell
lint: intro do_fix_eslint


# ===========================
# Recipes
# ===========================

do_build_container:
	@echo "\n=== Building project container ===\n"
	docker-compose build

do_start_container:
	@echo "\n=== Starting project container ===\n"
	docker-compose up -d --remove-orphans
	@echo 'The project is now running on http://localhost:4040'

do_stop_container:
	@echo "\n=== Stopping project container ===\n"
	docker-compose stop

do_prepare_app:
	@echo "\n=== Preparing application ===\n"
	docker-compose run --rm app npm ci

do_run_app_shell:
	@echo "\n=== Opening shell in the app container ==="
	@echo "Type exit to return\n"
	docker exec -it snake-game-api_app_1 /bin/bash

do_run_db_shell:
	@echo "\n=== Opening shell in the db container ==="
	@echo "Type exit to return\n"
	docker exec -it snake-game-api_mongodb_1 /bin/bash

do_fix_eslint:
	@echo "\n=== Fixing ESLint errors where possible ===\n"
	@(docker-compose run --rm app node_modules/.bin/eslint --fix . && echo "Code style is cleaned ❤️") ||\
    echo "\nNot everything could be fixed automatically, please check the errors above."
