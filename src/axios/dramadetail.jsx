import axios from "axios"

async function fetchDramaDetail(id) {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` }
        })
        return response.data
    } catch (err) {
        console.error("failed to fetch drama detail: ", err)
    }
}
export default fetchDramaDetail;