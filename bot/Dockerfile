FROM node:8.11.3 AS node
WORKDIR /chunky
COPY . .
RUN npm install

FROM gcr.io/distroless/nodejs
COPY --from=node /chunky /chunky
WORKDIR /chunky

EXPOSE 8000
CMD ["start.js"]
