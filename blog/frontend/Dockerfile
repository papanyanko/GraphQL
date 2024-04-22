FROM node:20.12.2-bookworm-slim AS base
WORKDIR /app

FROM base AS builder
ENV NODE_ENV=production
RUN npm i -g pnpm
ARG graphql_endpoint
ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT=${graphql_endpoint}
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm i
COPY . .
RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder next.config.mjs ./
COPY --from=builder /public ./public
COPY --from=builder /.next/static ./.next/static
COPY --from=builder /.next/standtalone ./
CMD [ "node", "server.js" ]