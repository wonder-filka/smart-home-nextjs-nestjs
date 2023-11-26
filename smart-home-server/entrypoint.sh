#!/bin/sh
npm run db:drop
# Выполнить миграции базы данных
npm run db:migrate

# # Выполнить сидирование базы данных
# npx sequelize-cli db:seed:all

# Запустить сервер
npm run start:prod