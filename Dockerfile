FROM node:16-alpine3.11 as base

WORKDIR /Last_respects

COPY package*.json ./

FROM base AS release

RUN npm install --only=production

COPY . .

RUN sed -i 's/http:\/\//https:\/\//g' /etc/apk/repositories && \
    apk add curl && \
    adduser -u 502 -h /Last_respects -D -H gcc && chown -R gcc /Last_respects && npm run build

USER gcc
EXPOSE 3200
CMD npm run serve
