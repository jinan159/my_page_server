FROM node:14.16.1

CMD ["bash"]

ENV NODE_ENV development

RUN npm install -g pm2 \
&& mkdir /app

COPY ./ /app

EXPOSE 3000

CMD ["node"]