##BUILD
FROM node:12.7-alpine as build
WORKDIR /app
copy package.json ./
run npm install
COPY . .
RUN npm run build --prod

##RUN
FROM nginx:1.17.1-alpine as prod-stage
COPY --from=build /app/dist/DesafioBCP /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]