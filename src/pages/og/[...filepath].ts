import { OGImageRoute } from 'astro-og-canvas';
import { getPosts } from '../../lib/notion/client';

// 1. Notionから記事データを取得
const posts = await getPosts();

// 2. astro-og-canvasが読み込める形式のオブジェクトを生成
const pages = Object.fromEntries(
  posts
    .filter((post) => post.Slug) // ★ 小文字の slug ではなく大文字の Slug に修正
    .map((post) => [
      post.Slug,
      {
        title: post.Title,
        description: 'sok41.log', // 任意の概要文
      },
    ])
);

// 3. ルーティングと画像生成の設定
// ★ ここに await が必要です
export const { getStaticPaths, GET } = await OGImageRoute({
  pages: pages,

  getImageOptions: (_path, page: { title: string; description: string }) => ({
    title: page.title,
    description: page.description,
    
    // デザイン調整（ダークテーマ風）
    bgGradient: [[24, 24, 27], [39, 39, 42]],
    border: {
      color: [255, 153, 0],
      width: 12,
      side: 'block-start',
    },
    
    // 【重要】日本語フォントの設定（文字化け防止）
    fonts: [
      'https://api.fontsource.org/v1/fonts/noto-sans-jp/japanese-400-normal.ttf',
      'https://api.fontsource.org/v1/fonts/noto-sans-jp/japanese-700-normal.ttf',
    ],
  }),
});