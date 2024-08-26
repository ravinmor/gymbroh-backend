ARG NODE_VERSION=19.5.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV development

WORKDIR /usr/src/app

# Copy the rest of the source files into the image.
COPY . .

# Run the application as a non-root user.
RUN  chown -R node /usr/src/app
USER node

# Expose the port that the application listens on.
EXPOSE 3333

# Run the application in dev mode to use with Compose watch feature
RUN yarn
# RUN yarn typeorm:migrate
# RUN yarn seed

CMD ["yarn", "dev"]