FROM node:lts-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app/
COPY . .
RUN npm install
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD npm run start:prod
