import { useEffect, useState } from "react"

const useIndexedDB = (name: string, version?: number) => {
    const [db, setDB] = useState<IDBDatabase>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>()

    useEffect(()=>{
        if(typeof error !== 'undefined'){
            setLoading(false)
        }
    },[error])

    useEffect(()=>{
        let request = indexedDB.open(name, version || 1)
        request.onerror = () => setError(true)
        request.onsuccess = () => {
            setDB(request.result)
            setError(false)
        }
    },[])

    return { db, loading, error}
}

export default useIndexedDB