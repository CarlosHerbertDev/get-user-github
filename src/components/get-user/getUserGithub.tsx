import { ReactElement, useEffect, useState } from "react"
import { getUser } from "../../api/getUser"
import { ApiData } from "../../interfaces/types"
import  LogoGithub  from "../../assets/icon_git.png";
import  GitName from "../../assets/Githubname.png";
import  Camada  from "../../assets/Camada.png";
import  Elipse1  from "../../assets/Ellipse_1.png";
import  Elipse2  from "../../assets/Ellipse_2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            setError('')
          }
          
          
        }

        function haddleUser() {
          
          const user: string = (document.querySelector('input') as HTMLInputElement).value;

          if (user === '') {
            alert('Atenção! Prenche o input com o nome do usuário')
            setError('')
          } else {
            setNameUser(user)
          }
          
        }
        
  return (
    <main className="max-w-[1440px]">
    <div className="absolute top-5 left-20">
      <img src={Camada} alt="Camada Quadrada" className="h-[120px] w-[150px]" />
    </div>
    <div className="absolute top-0 right-0">
      <img src={Elipse1} alt="Elipse 1" className="h-100 w-130"/>
    </div>
    <div className="absolute top-15 left-0">
      <img src={Elipse2} alt="Elipse 2" />
    </div>
    <div className="bg-black text-white min-w-[1100px] min-h-[450px] flex flex-col items-center relative ">
        <div className="flex justify-center items-center m-10">
        {/* <span className="ml-[10px] font-black"></span> */}
            <img src={LogoGithub} alt="Github Icon" className="h-[50px] w-50-[px]" />
            <div className="flex items-center gap-2">
            <h1 className="text-5xl ml-[10px]"> Perfil</h1>
            <img src={GitName} alt="name" className="h-[38px]"/>
            </div>
        </div>       
        <div className="flex items-center bg-white text-black border-borderborder-1 rounded-lg h-12 p-4 ml-4">
        <input className="w-110 h-12 focus:outline-none placeholder-black font-medium"type="search" placeholder="Digite um usuário do Github" onKeyUp={halldeKeyup}/>
        <span onClick={haddleUser}>&#128269;</span>  
        {/* <FontAwesomeIcon icon="fa-thin fa-magnifying-glass" /> */}
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
    </main>
  )
}