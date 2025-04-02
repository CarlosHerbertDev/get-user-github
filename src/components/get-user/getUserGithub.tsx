import { ReactElement, useEffect, useState } from "react"
import { getUser } from "../../api/getUser"
import { ApiData } from "../../interfaces/types"


export const GetUserGithub = () : ReactElement => {
    const [nameuser, setNameUser] = useState<string>('')
    const [renderUser, setRenderUser] = useState<ApiData>({})
    const [error, setError] = useState<string>('')

    useEffect(() => {
       const fetchdata = async () => {

            const data = await getUser(nameuser)
                setRenderUser(data)

             if (data) {
                setRenderUser({
                  name: data.name,
                  avatar_url: data.avatar_url,
                  bio: data.bio
                })
                setError('')
              } else if(data === undefined){
                setError('Nenhum perfil encontrado com esse nome de usuário. Tente novamente')
              } 
          }    
          
          fetchdata()
          
        }, [nameuser])
        
        function halldeKeyup (e: React.KeyboardEvent<HTMLInputElement>) {
          console.log(e)
          
        }

        function haddleUser() {
          
          const user: string = (document.querySelector('input') as HTMLInputElement).value;

          if (user === '') {
            alert('Atenção! Prenche o input com o nome do usuário')
          } else {
            setNameUser(user)
          }
          
        }
        

  return (
    <div>
        <div>
            <p>icon</p>
            <p> Perfil <span>Github</span></p>
        </div>       
        <div>
        <input type="text" placeholder="Digite um usuário do Github" onKeyUp={halldeKeyup}/>
        <span onClick={haddleUser}>&#128269;</span>  
        </div>
        {renderUser &&
          
            <div>
               <h1>{renderUser.name}</h1>
               <p>{renderUser.bio? renderUser.bio : 'sem bio'}</p>
               <img src={renderUser.avatar_url} alt="image" />
            </div>
        }
        { error !== '' &&
          <p>{error}</p>
        }
    </div>
  )
}