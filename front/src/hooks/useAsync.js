import { useEffect, useState } from "react"

export const useAsync = (asyncFunction,dependencies = []) => {
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading, setLoading] = useState(true);

    if(!Array.isArray(dependencies)){
        dependencies = [];
    }
    useEffect( () => {
        setLoading(true);
        asyncFunction()
            .then(data => {
                setData(data);
            })
            .catch(error => {
                setError(error);
            })
            .finally( () => {
                setLoading(false);
            })
    },dependencies) //eslint-disable-line
    return{
        data,
        error,
        loading
    }
}