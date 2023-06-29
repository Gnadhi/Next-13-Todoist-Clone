#!/bin/sh
npm i
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run build --no-lint --no-mangling
export NODE_ENV=production
npm ci
npm run start
