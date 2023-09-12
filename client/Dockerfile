# Build Production Files
FROM node:18-alpine AS production-build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN rm -rf node_modules
RUN yarn install --frozen-lockfile

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL ${VITE_API_URL}
ARG VITE_GOOGLE_ANALYTICS_ID
ENV VITE_GOOGLE_ANALYTICS_ID ${VITE_GOOGLE_ANALYTICS_ID}
RUN yarn build
# Runtime Production
FROM nginx:1.25.2-alpine as production-runtime
RUN mkdir /app
COPY --from=production-build /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
