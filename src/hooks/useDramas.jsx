import { useEffect, useState } from "react"


function useDramas(fetchFunction) {
    const [drama, setDrama] = useState([])

    useEffect(() => {
        async function loadDramas() {
            const data = await fetchFunction()
            if (data) {
                setDrama(data.results)
            }
        }
        loadDramas()
    }, [])

    return drama
}


export default useDramas;