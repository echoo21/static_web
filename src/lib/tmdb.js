import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
  timeout: 10_000,
});

// ---- In-memory response cache ----
const cache = new Map()
const MAX_CACHE = 30

// ---- Cache interceptor ----
tmdb.interceptors.request.use((config) => {
  const key = `${config.method}:${config.url}`
  if (config.method === 'get' && cache.has(key)) {
    config.adapter = () => Promise.resolve({ data: cache.get(key), status: 200, statusText: 'OK', headers: {}, config })
  }
  return config
})

tmdb.interceptors.response.use((response) => {
  const key = `${response.config.method}:${response.config.url}`
  if (response.config.method === 'get') {
    cache.set(key, response.data)
    if (cache.size > MAX_CACHE) {
      const first = cache.keys().next().value
      if (first) cache.delete(first)
    }
  }
  return response
})

export default tmdb;

// ---- Shared fetch helpers ----

/** Generic paginated list (TMDB returns { results: [...] }) */
export async function fetchList(endpoint) {
  try {
    const { data } = await tmdb.get(endpoint)
    return data
  } catch (err) {
    console.error(`failed to fetch ${endpoint}:`, err)
  }
}

/** Detail endpoints — single object */
export const fetchMovieDetail = (id) => tmdb.get(`movie/${id}`).then(r => r.data).catch(e => { console.error("fetch movie detail:", e) })
export const fetchDramaDetail   = (id) => tmdb.get(`tv/${id}`).then(r => r.data).catch(e => { console.error("fetch drama detail:", e) })

/** Build a TMDB image URL */
export function imgUrl(path, size = 'w500') {
  if (!path) return 'https://placehold.co/500x750?text=No+Image'
  return `https://image.tmdb.org/t/p/${size}${path}`
}
