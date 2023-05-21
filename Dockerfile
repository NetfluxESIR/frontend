FROM node:18-alpine 

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install

COPY . .

EXPOSE 3000

ENV BACKEND_URL="replace me"
ENV BUCKET_REGION="replace me"
ENV BUCKET_NAME="replace me"

CMD ["sh", "-c", "npm run build && node .output/server/index.mjs"]
