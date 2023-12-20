FROM node:latest

WORKDIR /app

# ルートディレクトリからpackage.jsonをコピー
COPY ./package*.json ./

# 依存関係のインストール
RUN npm install

# apiディレクトリ内のファイルを/app/apiにコピー
COPY ./api ./api

# アプリケーションがリッスンするポートを指定
EXPOSE 3001

# アプリケーションを起動するコマンド
CMD ["node", "api/server.js"]
