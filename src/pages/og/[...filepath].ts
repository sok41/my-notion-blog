import { OGImageRoute } from 'astro-og-canvas';
import { getPosts } from '../../lib/notion/client';

// 1. Notionから記事データを取得
const posts = await getPosts();

// 2. astro-og-canvasが読み込める形式のオブジェクトを生成
const pages = Object.fromEntries(
  posts
    .filter((post) => post.Slug) // ★ 小文字の slug ではなく大文字の Slug に修正
    .map((post) => [
      `${post.Slug}.png`, // ★ キーの末尾に .png を追加する
      {
        title: post.Title,
        description: 'sok41.log', // 任意の概要文
      },
    ])
);

// 3. ルーティングと画像生成の設定
export const { getStaticPaths, GET } = await OGImageRoute({
  pages: pages,
  

  getImageOptions: (_path, page: { title: string; description: string }) => ({
    title: page.title,
    description: page.description,

    // ★ 背景に cover.png を指定
    // ※ public/cover.png はビルド時にルートに公開されるため、絶対パスや相対パスで読み込めます
    bgImage: {
  path: './public/cover.png',
  fit: 'cover',
},

    // 余白（パディング）を広めに取り、文字を中央付近に収める
    padding: 100,

    font: {
      title: {
        size: 52,
        families: ['Noto Sans JP'],
        weight: 'Bold',
        // 背景が写真の場合に読みやすいよう、濃い色（黒に近いグレー）に設定
        color: [30, 30, 30],
      },
      description: {
        size: 28,
        families: ['Noto Sans JP'],
        weight: 'Normal',
        color: [80, 80, 80],
      },
    },

    // 日本語フォントの設定
    fonts: [
      'https://api.fontsource.org/v1/fonts/noto-sans-jp/japanese-400-normal.ttf',
      'https://api.fontsource.org/v1/fonts/noto-sans-jp/japanese-700-normal.ttf',
    ],
  }),
});