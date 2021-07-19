import {useState, useEffect} from 'react'
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

function ProfileRelationsBox(props){
  return(
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
        {props.title}  ({props.items.length})
    </h2>

    <ul>
      {props.items.map(item => {
        return (
          <li key={item.id}>
            <a href={`/users/${item.html_url}`}>
              <img src={item.avatar_url} />
              <span>{item.login}</span>
            </a>
          </li>

        )
      })}
    </ul>
  </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'renangibeli'
  const favoritePersons = ['juunegreiros', 'peas', 'omariosouto', 'rafaballerini', 'marcobrunodev', 'felipefialho']

  const [communitys, setCommunitys] = useState([])
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
    .then(function (response){
      return response.json()
    })
    .then(function(completeResponse){
      setFollowers(completeResponse)
    })

    fetch(`https://api.github.com/users/${githubUser}/following`)
    .then(function (response){
      return response.json()
    })
    .then(function(completeResponse){
      setFollowing(completeResponse)
    })


    //API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '09310af95dbbfc640b10f9090edcee',
        'Content-Type' : 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({"query" : `query {
        allCommunities {
          title
          id
          imageUrl
          creatorSlug
        }
      }`})
    })
    .then((response) => response.json())
    .then((completeResponse) => {
      const datoCommunitys = completeResponse.data.allCommunities
      setCommunitys(datoCommunitys)
    })

  }, [])

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
                // id: new Date().toISOString(),
                  title: formData.get('title'),
                  imageUrl: formData.get('image'),
                  creatorSlug: githubUser
              }

              fetch('/api/communitys', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCommunity)
              })
              .then(async (res) => {
                const data = await res.json()
                const newCommunity = data.record
                const attComunitys = [...communitys, newCommunity]
                setCommunitys(attComunitys)
              })
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
          <ProfileRelationsBox title='Seguidores' items={followers}/>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
                Comunidades  ({communitys.length})
            </h2>

            <ul>
              {communitys.map((community) => {
                return (
                  <li key={community.id}>
                    <a href={`/comunidades/${community.id}`}>
                      <img src={community.imageUrl} />
                      <span>{community.title}</span>
                    </a>
                  </li>

                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBox title='Seguindo' items={following}/>

        </div>
      </MainGrid>
    </>
  )
}
