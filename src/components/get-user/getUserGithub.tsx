import { ReactElement, useEffect, useState } from "react"
import { getUser } from "../../api/getUser"
import { ApiData } from "../../interfaces/types"

export const GetUserGithub = () : ReactElement => {
    const [nameuser, setNameUser] = useState<string>('')
    const [renderUser, setRenderUser] = useState<ApiData>({})
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
       const fetchdata = async () => {

          setLoading(true)

          try {

            const data = await getUser(nameuser)
            console.log(renderUser)
            setLoading(false)
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

          } catch (error) {

              setError(`Ocorreru o seguinte erro ao carregar os dados: ${error}`)
            
          } finally {
            setLoading(false)
          }

          }    
          
          fetchdata()
          
        }, [nameuser])
        
        function halldeKeyup (e: React.KeyboardEvent<HTMLInputElement>) {
          const userName = (e.target as HTMLInputElement).value
          const key = e.which || e.keyCode
          const isEnterKeyPressed = key === 13
          if (isEnterKeyPressed) {
            setNameUser(userName)
          } 

          if (userName === '' && isEnterKeyPressed) {
            alert('Atenção! Prenche o input com o nome do usuário')
          }
          
          
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
            <p className="bg-teste">icon</p>
            <p> Perfil <span>Github</span></p>
        </div>       
        <div>
        <input type="text" placeholder="Digite um usuário do Github" onKeyUp={halldeKeyup}/>
        <span onClick={haddleUser}>&#128269;</span>  
        </div>

        {loading && 
               <p>CARREGANDO...</p>
        }
        {renderUser && !loading &&
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