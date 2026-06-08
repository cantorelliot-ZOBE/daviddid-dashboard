# Next.js dev server for the DavidDid performance dashboard.
FROM node:20-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Next dev server, bound to all interfaces so the host can reach it.
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
