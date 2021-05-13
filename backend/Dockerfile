FROM node:slim

COPY package.json /app/
COPY dist /app/
WORKDIR /app
RUN npm install --only=production
EXPOSE 3000
CMD ["node", "index.js"]