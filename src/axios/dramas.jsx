import axios from "axios";

async function AiringTodayDramas() {
    try {
        const response = await axios.get("https://api.themoviedb.org/3/tv/airing_today", {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` }
        })
        return response.data
    } catch (err) {
        console.error("failed to fetch airing today: ", err)
    }
}

async function OnTheAirDramas() {
    try {
        const response = await axios.get("https://api.themoviedb.org/3/tv/on_the_air", {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` }
        })
        return response.data
    } catch (err) {
        console.error("failed to fetch airing today: ", err)
    }
}

async function PopularDramas() {
    try {
        const response = await axios.get("https://api.themoviedb.org/3/tv/popular", {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` }
        })
        return response.data
    } catch (err) {
        console.error("failed to fetch airing today: ", err)
    }
}

async function TopRatedDramas() {
    try {
        const response = await axios.get("https://api.themoviedb.org/3/tv/top_rated", {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` }
        })
        return response.data
    } catch (err) {
        console.error("failed to fetch airing today: ", err)
    }
}

export { AiringTodayDramas, OnTheAirDramas, PopularDramas, TopRatedDramas };