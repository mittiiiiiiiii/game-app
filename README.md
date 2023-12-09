# 12.Game-App.md

## UIのスタイルを変更
- 上部のバーの色、ボタンの色をグリーンに変更
- ゲーム画面の枠をイエローに変更
- ボタンを中央に移動
- テキストの配置場所を変更
- リザルト画面のスコアの文字をブルーからグリーンに変更

## 画面遷移図
![画面遷移図](/uploads/7b7652542e42be8a4ea5202cfc330c95/画面遷移図.png)

## コンポーネント設計をする
![コンポーネント](/uploads/f94bdf9189241b5628163719674e9451/コンポーネント.png)

## Skaffoldでの環境構築手順
- リポジトリのクローン
    ```bash
    git clone https://gitlab.com/dev-krc/training/koske-game.git
- minikubeをスタート
    ```bash
    minikube start
    minikube addons enable ingress
- minikube VM内のdockerに接続
    ```bash
    eval $(minikube docker-env)
- skaffold.yamlを作成
    ```bash
    skaffold init
    Dockerイメージの作成に使用するファイルを尋ねられるのでDockerfileを選択
- pod、replicaset、deployment、service、ingressをminikube上に作成
    ```bash
    skaffold dev
- host名で名前解決できるようにする
    ```bash
    echo "$(minikube ip) koske-game.nip.io" | sudo tee -a /etc/hosts
- host名でアプリにアクセスできることを確認
    ```bash
    curl -I http://koske-game.nip.io


## Ingress環境構築手順
- リポジトリのクローン
    ```bash
    git clone https://gitlab.com/dev-krc/training/koske-game.git
- minikubeをスタート
    ```bash
    minikube start --driver=qemu2
    minikube addons enable ingress
- Docker イメージのビルド
    ```bash
    eval $(minikube docker-env)
    docker build -t game-app .
- Kubernetes マニフェストの適用
    ```bash
    kubectl apply -f k8s/deployment.yml 
    kubectl apply -f k8s/service.yml
    kubectl apply -f k8s/ingress.yml
- サービスの確認
    ```bash
    kubectl get services
- アプリケーションへのアクセス
    ```bash
    minikube service koske-game-app --url
- host名で名前解決できるようにする
    ```bash
    echo "$(minikube ip) koske-game.nip.io" | sudo tee -a /etc/hosts
- host名でアプリにアクセスできることを確認
    ```bash
    curl -I http://koske-game.nip.io
※ 一度名前解決をしたあとにもう一度環境を構築すると、http://koske-game.nip.io に２つのipが与えられるため、アクセスできなくなる。そのため、/etc/hostsで過去のipを削除してからもう一度名前解決を行う。
- 追記
    Macの開発環境にRosetta2をインストールしたためdriverにdockerを使用しても環境を構築できるようになった

##　アプリを作成
- フォルダ構造を整理
- 共通のレイアウトを作成
- 不正なアクセスを禁止する機能を実装
- eslint-plugin-cypress への参照を追加
- 存在しないページにアクセスしたときにStartにリダイレクトするようにfirebase.jsonを改変
- コンポーネント
    - コンポーネントの指摘された箇所を修正
    - 共通のコンポーネントをまとめて定義
    - Startコンポーネントの実装
        - 基本的なレイアウトを作成
        - Gameコンポーネントへ遷移する機能を実装
    - Gameコンポーネントの実装
        - 基本的なレイアウトを作成
        - Startコンポーネントへ遷移する機能を実装
        - データをカウントする機能を実装
    - Resultコンポーネントの実装
        - 基本的なレイアウトを作成
        - Startコンポーネントへ遷移する機能を実装
        - カウントしたデータを表示する機能を実装
- テストコードの実装
    - スタイルの変更を検出
    - 指摘された箇所を修正
    - Start コンポーネント
        - 期待されたテキストで正しくレンダリングされるか確認するテストを実装
        - プレイボタンが存在するか確認するテストを実装
        - コンポーネント遷移するかのテストを実装
    - Game コンポーネント
        - 期待されたテキストで正しくレンダリングされるか確認するテストを実装
        - リターンボタンが存在するか確認するテストを実装
        - コンポーネント遷移するかのテストを実装
    - Result コンポーネント
        - 期待されたテキストで正しくレンダリングされるか確認するテストを実装
        - リターンボタンが存在するか確認するテストを実装
        - テスト用データを作りレンダリングのテストをする機能を実装
        - コンポーネント遷移するかのテストを実装
- cypress
    - .gitlab-ci.ymlにcypressを追加
    - 一連の流れをテストするように変更
- .gitlab-ci.ymlを作成
- dockerファイルを作成
- kube
    - deploymentやserviceの作成に使用するマニフェストファイル(yaml)を作成する。
    - minikube serviceコマンドを使って、serviceを通してアプリにアクセスできることを確認
    - 環境構築手順をREADMEにまとめる