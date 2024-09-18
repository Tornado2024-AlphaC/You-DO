# You-DO

”今”やるべきことがわかるタスク管理アプリ

# アプリ操作方法
＜はじめかた＞  
1. Googleでアカウント作成  
2. 今やるべきタスク画面が表示されます。
 
＜操作説明＞  
* 今やるべきタスク画面では、次の空き時間（今が空き時間なら残り時間）と、まずやるべきタスクが表示されます。  
  * 最初はスケジュールとタスクともに何もないため、その旨のメッセージが表示されます。  
  * 画面下の「タスクの追加」から、タスクを追加できます。
  * 追加後、再読み込みすると、追加したタスクが反映されます。
* 右フリックで、タスク一覧画面へ移動  
  * 球体をタッチすると、そのタスクの詳細を見れたり、編集・削除したりできます  
* 左フリックで、スケジュール画面へ移動  
  * ここでスケジュールの確認や、右上の「追加」ボタンから、空き時間の追加ができます。  

# 開発環境

Node.js: 22.3.0

バージョン管理:asdf

```bash
# パッケージインストール
npm i
# 開発サーバ起動
npm run dev
# ビルド
npm run build
# ビルドサーバ起動
npm start
```

### バックエンドについて

Spabase に接続するためには、２つの値を環境変数に設定する必要がある。
next のプロジェクト直下に、`.env`ファイルを作成し、以下の内容を記載する。**\*\***の部分は担当者から取得すること。

```
# API
SUPABASE_URL=******
SUPABASE_KEY=******
```

api の実装は、`app/api/`配下にある。

hello api（動作確認用）へのアクセス先
URL: `localhost:3000/api/hello`

## フォルダ構成

```
├ src
│ ├ app // Next.jsのルーティング
| | ├ api // バックエンドapiの実装
│ │ ├ login
│ │ │ ├index.tsx
│ ├ components // コンポーネント
│ │ ├ features // 特定の機能を実現するコンポーネント
│ │ │ ├ sample // サンプルコンポーネント
│ │ │ │ ├ hooks // サンプルコンポーネントのみで使用するhook(不要な場合もある)
│ │ │ │ ├ logics // サンプルコンポーネントのみで使用するロジック(不要な場合もある)
│ │ │ │ ├ tests // テスト専用
│ │ │ │ ├ index.tsx // エントリーポイント
│ │ ├ functions // UIとして表示されないコンポーネント
│ │ ├ ui // UIコンポーネント, shadcn/uiは全てここに入る
│ ├ constants // 全体に共通の定数ファイルを配置する
│ ├ libs // ライブラリのラッパーや使いまわしやすいようにする
│ ├ types // 全体に共通の型定義ファイルを配置する
│ ├ usecases // 共通で使い回すhooks
│ ├ utils // 使い回すロジックなど
```

# Git フォーマットについて

## コミットメッセージ

| Prefix   | 詳細                             |
| -------- | -------------------------------- |
| feat:    | 新しい機能の追加                 |
| improve: | 仕様に影響のないコードの変更     |
| fix:     | バグの修正                       |
| style:   | コードの整形                     |
| chore:   | 新規ライブラリやプラグインの追加 |
| docs:    | ドキュメントのみの変更           |
| test:    | テスト関連                       |
| break:   | ロールバック                     |

例：`feat: 〇〇なため、△△を追加`

## ブランチ名

ブランチ名は下記のフォーマットで統一すること

`イシュータイトル/イシュー番号`

例：`login-page/#03`
