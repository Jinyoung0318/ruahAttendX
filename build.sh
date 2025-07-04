#!/bin/bash

# 스크립트 실행 디렉토리를 프로젝트 루트로 고정
cd "$(dirname "$0")"

# Backend build & run
echo "📦 Building backend image..."
docker build -t ruahattendx-backend ./backend

echo "🚀 Running backend container..."
docker rm -f ruahattendx-backend 2>/dev/null
docker run -d \
  --name ruahattendx-backend \
  -p 8000:8000 \
  --env-file ./backend/.env \
  ruahattendx-backend

# Frontend build & run
echo "📦 Building frontend image..."
docker build -t ruahattendx-frontend ./frontend

echo "🚀 Running frontend container..."
docker rm -f ruahattendx-frontend 2>/dev/null
docker run -d \
  --name ruahattendx-frontend \
  -p 8080:80 \
  ruahattendx-frontend

echo "✅ All services are up!"