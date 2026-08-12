import type { APIRoute } from 'astro'
import { supabase } from '../../../lib/supabase'

export const prerender = false // SSR（オンデマンド実行）に指定


// GET: いいね数の取得
export const GET: APIRoute = async ({ params }) => {
  const { slug } = params

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug is required' }), { status: 400 })
  }

  const { data, error } = await supabase
    .from('likes')
    .select('count')
    .eq('slug', slug)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Fetch likes error:', error.message)
  }

  const count = data ? data.count : 0

  return new Response(JSON.stringify({ count }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

// POST: いいね数の加算（+1）
export const POST: APIRoute = async ({ params }) => {
  const { slug } = params

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug is required' }), { status: 400 })
  }

  // Supabaseで作った RPC（increment_like）を実行
  const { data, error } = await supabase.rpc('increment_like', { article_slug: slug })

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  return new Response(JSON.stringify({ count: data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}