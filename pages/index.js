import {useState} from 'react'
import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'
import {AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault} from "../src/lib/AlurakutCommons"

function ProfileSideBar(props){
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: '8px'}}/>
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'renangibeli'
  const favoritePersons = ['juunegreiros', 'peas', 'omariosouto', 'rafaballerini', 'marcobrunodev', 'felipefialho']
  const [communitys, setCommunitys] = useState([{
    id: '445646',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSideBar githubUser={githubUser}/>
        </div>

        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className='title'>
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
            
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={function handleCreateCommunity(e){
              e.preventDefault()

              const formData = new FormData(e.target)
              const newCommunity = {
                id: new Date().toISOString(),
                title: formData.get('title'),
                image: formData.get('image')
              }

              const attComunitys = [...communitys, newCommunity]
              setCommunitys(attComunitys)
        
              
            }}>
              <div>
                <input 
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"/>
              </div>

              <div>
                <input 
                placeholder="Coloque uma URL para usarmos de capa"
                name="image"
                aria-label="Coloque uma URL para usarmos de capa"/>
              </div>

              <button>
                Criar comunidade
              </button>
            </form>

          </Box>
        </div>

        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
                Comunidades  ({communitys.length})
            </h2>

            <ul>
              {communitys.map((community) => {
                return (
                  <li key={community.id}>
                    <a href={`/users/${community.title}`}>
                      <img src={community.image} />
                      <span>{community.title}</span>
                    </a>
                  </li>

                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritePersons.length})
            </h2>

            <ul>
              {favoritePersons.map((person) => {
                return (
                  <li key={person}>
                    <a href={`/users/${person}`}>
                      <img src={`https://github.com/${person}.png`} />
                      <span>{person}</span>
                    </a>
                  </li>

                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
