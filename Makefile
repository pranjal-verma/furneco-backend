# This target is used to generate a new migration file.
# It prompts the user to enter a name for the migration, then runs the TypeORM CLI's `migration:generate` command
# with the entered name. The `-d ormconfig.ts -p` options specify the location of the TypeORM configuration file.
migrate-generate:
	@read -p "Enter migration name: " migration_name; \
	ts-node ./node_modules/typeorm/cli.js migration:generate src/migrations/$$migration_name -d ormconfig.ts -p

migrate-up:
	ts-node ./node_modules/typeorm/cli.js migration:run  -d ormconfig.ts
	
# This target is used to rollback the last migration.
# It runs the TypeORM CLI's `migration:revert` command to rollback the last executed migration.
# The `-d ormconfig.ts` option specifies the location of the TypeORM configuration file.
migrate-down:
	ts-node ./node_modules/typeorm/cli.js migration:revert -d ormconfig.ts