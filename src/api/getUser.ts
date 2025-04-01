import axios from "axios";

export async function getUser(userName:string){

    try {
        if (userName === '') return  

        const response = await axios.get(`https://api.github.com/users/${userName}`)
        return response.data
    } catch (error) {
        console.error(error)
    }

}