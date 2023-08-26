# Build Production Files
FROM node:20-alpine AS production-build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN rm -rf node_modules
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build
# Runtime Production
FROM nginx:1.25.2-alpine as production-runtime
RUN mkdir /app
COPY --from=production-build /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf