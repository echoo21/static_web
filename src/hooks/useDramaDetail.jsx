import { useState, useEffect } from "react";
import fetchDramaDetail from "../axios/dramadetail";

function useDramaDetail(id) {
    const [drama, setDrama] = useState([])

    useEffect(() => {
        async function loadDrama() {
            const data = await fetchDramaDetail(id)
            if (data) {
                setDrama(data)
            }
        }
        loadDrama()
    }, [id])
    return drama
}
export default useDramaDetail