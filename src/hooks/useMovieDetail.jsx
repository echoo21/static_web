import { useEffect, useState } from "react"
import fetchMovieDetail from "../axios/moviedetail"

function useMovieDetail(id) {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function loadMovie() {
            const data = await fetchMovieDetail(id)
            if (data) {
                setMovie(data)
            }
        }
        loadMovie()
    }, [id])
    return movie
}
export default useMovieDetail