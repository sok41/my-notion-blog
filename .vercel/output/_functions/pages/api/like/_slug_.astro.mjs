import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../../renderers.mjs';

const supabaseUrl = "https://daitwvdvfludfcmvmxqf.supabase.co";
const supabaseAnonKey = "sb_publishable_d8MHwyj4RwkIQqVlBvXtew_8IK5I2To";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const prerender = false;
const GET = async ({ params }) => {
  const { slug } = params;
  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug is required" }), { status: 400 });
  }
  const { data, error } = await supabase.from("likes").select("count").eq("slug", slug).single();
  if (error && error.code !== "PGRST116") {
    console.error("Fetch likes error:", error.message);
  }
  const count = data ? data.count : 0;
  return new Response(JSON.stringify({ count }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
const POST = async ({ params }) => {
  const { slug } = params;
  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug is required" }), { status: 400 });
  }
  const { data, error } = await supabase.rpc("increment_like", { article_slug: slug });
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ count: data }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
