import { ReactElement, useEffect, useState } from "react"
import { getUser } from "../../api/getUser"
import { ApiData } from "../../interfaces/types"
import  LogoGithub  from "../../../public/icon_git.png";
import  GitName from "../../assets/Githubname.png";
import  Camada  from "../../assets/Camada.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import LoadingThreeDotsJumping from "../../animation";
import { motion } from "motion/react";
import SplitText from "../../animation3";

export const GetUserGithub = () : ReactElement => {
    const [nameuser, setNameUser] = useState<string>('')
    const [renderUser, setRenderUser] = useState<ApiData>({})
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    
    useEffect(() => {
      const fetchdata = async () => {
        try {
          if (nameuser !== '') {
            setLoading(true)
          } else {
            setLoading(false)
          }
          const data = await getUser(nameuser)
          
          if (data === null) {   
            console.log(data);
          }

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
              setTimeout(() => {
                setLoading(false)
              }, 1500)
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
            setNameUser(user)
            setError('')
          } else {
            setNameUser(user)
          }
          
        }
        
  return (
    <main className="relative max-w-[1440px]">
    <div className="absolute top-[-100px] left-[-70px]">
      <img src={Camada} alt="Camada Quadrada" className="h-[180px] w-[200px]" />
    </div>
    <div className="h-[500px] absolute right-[-350px] top-[-280px] circle"></div>
      <div className="h-[400px] absolute left-[-630px] top-[150px] circle"></div>
    <motion.div 
        className="bg-black text-white w-[1100px] min-h-[480px] flex flex-col items-center relative"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 1.4,
            scale: { type: "spring", visualDuration: 0.8, bounce: 0.5 },
        }}
  
    >
        <div className="flex justify-center items-center m-10">
            <img src={LogoGithub} alt="Github Icon" className="h-[50px] w-50-[px]" />
            <div className="flex items-center gap-2">
                <h1 className="text-5xl ml-[10px]"> Perfil</h1>
                <img src={GitName} alt="name" className="h-[38px]"/>
            </div>
        </div>       
        <motion.div 
        className="flex items-center justify-center bg-white text-black rounded-lg h-12 py-4 pl-4 ml-4"
        whileHover={{ scale: 1.2 }}
        >
            <input className="w-110 h-12 focus:outline-none placeholder-black font-medium"  type="text" placeholder="Digite um usuário do Github" onKeyUp={halldeKeyup}/>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white bg-secundary rounded-lg p-[15px] border-border border-1 cursor-pointer" onClick={haddleUser}/>
        </motion.div>
        <div className="flex flex-col items-center justify-center mt-7">
        {loading && 
            <LoadingThreeDotsJumping />
        }
        {renderUser && !loading &&
            <motion.div 
            className="flex items-center justify-center bg-bgGray text-black py-5 px-6 rounded-3xl gap-5 max-w-[750px]"
            initial={{ opacity: 0, y: 20 }} // Começa invisível e deslocado
            whileInView={{ opacity: 1, y: 0 }} // Torna-se visível e retorna para a posição original
            transition={{ duration: 1.2  }} // Duração da animação  
            viewport={{ once: true }}
            >
                <img src={renderUser.avatar_url} alt="imagem do perfil"  className="w-[200px] h-[200px] rounded-[50%] border-2 border-solid border-secundary"/>
                <div className="flex flex-col items-start justify-center gap-4">
                    <h2 className="text-secundary font-bold">{renderUser.name? renderUser.name : 'Usuário sem nome'}</h2>
                    <p>{renderUser.bio? <SplitText text={renderUser.bio} /> : 'Usuário sem bio'}</p>
                    
              </div>
            </motion.div>
        }

        { error !== '' && !loading && 
          <div className="flex flex-col items-center justify-center bg-bgGray text-texterror py-4 px-25 rounded-lg">
              <p className="w-[500px] text-center text-xl">{error}</p>
          </div>
        }
      </div>
    </motion.div>
    </main>
  )
}