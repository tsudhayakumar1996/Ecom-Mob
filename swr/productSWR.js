import useSWR from "swr"
import { fetchGet } from "../fetching/fetchingHelpers"

export const ProductSwr = (url,token) => {    
    const {data,error} = useSWR([url,token],fetchGet)
    return{
        data:data,
        isLoading:!error && !data,
        isError:error
    }
}