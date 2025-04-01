import { ReactElement, useEffect, useState } from "react"
import { getUser } from "../../api/getUser"


export const GetUserGithub = () : ReactElement => {
    const [nameuser, setNameUser] = useState<string>('')


    useEffect(() => {
       const fetchdata = async () => {

           const data = await getUser(nameuser)
            console.log(data)
            
       }    

       fetchdata()

       }, [nameuser])

       function HaddleUser() {

        const user: string = (document.querySelector('input') as HTMLInputElement).value;
        console.log(user)
        setNameUser(user)
            
       }


  return (
    <div>
        <div>
            <p>icon</p>
            <p> Perfil <span>Github</span></p>
        </div>       
        <div>
        <input type="text" placeholder="Digite um usuário do Github"/>
        <span onClick={(() => {HaddleUser()})}>&#128269;</span>  
        </div>
    </div>
  )
}