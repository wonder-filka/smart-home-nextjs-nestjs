FROM node:18-alpine

RUN mkdir -p /app

WORKDIR /app

COPY / ./

ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build

# RUN npm prune --production

EXPOSE 80
EXPOSE 8080
ENV PORT=80
# RUN npm run db:migrate

# CMD [ "npm", "run", "start:prod" ]

ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]

