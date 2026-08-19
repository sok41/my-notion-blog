import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DNaj5Srh.mjs';
import { manifest } from './manifest_CvGUnydn.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/like/_slug_.astro.mjs');
const _page2 = () => import('./pages/feed.astro.mjs');
const _page3 = () => import('./pages/og/_---filepath_.astro.mjs');
const _page4 = () => import('./pages/posts/page/_page_.astro.mjs');
const _page5 = () => import('./pages/posts/tag/_tag_/page/_page_.astro.mjs');
const _page6 = () => import('./pages/posts/tag/_tag_.astro.mjs');
const _page7 = () => import('./pages/posts/_slug_.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/like/[slug].ts", _page1],
    ["src/pages/feed.ts", _page2],
    ["src/pages/og/[...filepath].ts", _page3],
    ["src/pages/posts/page/[page].astro", _page4],
    ["src/pages/posts/tag/[tag]/page/[page].astro", _page5],
    ["src/pages/posts/tag/[tag].astro", _page6],
    ["src/pages/posts/[slug].astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "04b3cccc-4ae9-4341-98b8-942f7cafd050",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
