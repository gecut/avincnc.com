# syntax=docker/dockerfile:1.7

FROM node:24.16.0-alpine3.22 AS build

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.18.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM ghcr.io/gecut/nginx/cdn:2.0.0

COPY --chown=nginx:nginx --from=build /app/out/ /data/
