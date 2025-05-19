FROM node:18

WORKDIR /app

# 패키지 파일 복사 및 의존성 설치
COPY package*.json ./
RUN npm install --legacy-peer-deps

# 소스 코드 복사
COPY . .

# 빌드
RUN npm run build

# 포트 노출
EXPOSE 8001

# 애플리케이션 실행
CMD ["node", "dist/main"] 