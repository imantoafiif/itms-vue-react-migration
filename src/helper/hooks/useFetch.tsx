import { AxiosResponse } from "axios"
import instance from "../../axios-config"
import { useState, useEffect } from "react"

const useFetch = (url:string, params:string) => {

    const [items, setData] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [exception, setException] = useState<Error | null>(null)

    useEffect(() => {
        instance.get(url, { params })
        .then((r:any) => {
            if(Array.isArray(r.data.data)) {
                setLoading(false)
                setData(r)
            }
        })
        .catch((e:Error) => {
            setLoading(false)
            setException(e)
        })
    }, [url])

    return [ items, loading, exception ]

}

export default useFetch;