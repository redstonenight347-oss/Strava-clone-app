# ─── Stage 1: Install dependencies ────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy manifests first (layer-cache friendly)
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY web/package.json ./web/
COPY packages/db/package.json ./packages/db/
COPY packages/validation/package.json ./packages/validation/

# Install ALL deps (including devDeps needed for build)
RUN pnpm install --frozen-lockfile

# ─── Stage 2: Build the Next.js app ───────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/web/node_modules ./web/node_modules

# Copy full source
COPY . .

# Build env vars needed at build time (not secrets — just config)
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Build Next.js (produces web/.next/standalone)
RUN pnpm --filter web build

# ─── Stage 3: Production runtime ──────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/web/.next/standalone ./
COPY --from=builder /app/web/.next/static ./web/.next/static

# ← public line removed, no public folder exists
EXPOSE 3000

CMD ["node", "web/server.js"]