export const fetchPost = async (url,postObj,token) => {
    const data = []
    await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "auth-token":token
        },
        body:JSON.stringify(
            postObj
        )
    })        
    .then(response =>response.json()) 
    .then(response => data.push(response))      
    return data          
} 

export const fetchUpdate = async (url,postObj,token) => {    
    const data = []
    await fetch(url,{
        method:"PATCH",
        headers:{
            "Content-Type":"Multipart/form-data",
            "auth-token":token
        },
        data:postObj        
    })        
    .then(response =>response.json()) 
    .then(response => data.push(response))      
    return data          
} 

export const fetchDelete = async (url,token) => {      
    const data = []
    await fetch(url,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "auth-token":token
        },        
    })        
    .then(response =>response.json()) 
    .then(response => data.push(response))      
    return data          
}

export const fetchGet = async (url,token) => {    
    const data = []
    await fetch(url,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "auth-token":token
        },                
    })        
    .then(response =>response.json()) 
    .then(response => data.push(response))      
    return data          
} 

