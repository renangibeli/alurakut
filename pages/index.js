import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'
import {AlurakutMenu, OrkutNostalgicIconSet} from "../src/lib/AlurakutCommons"

function ProfileSideBar(props){
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: '8px'}}/>
    </Box>
  )
}

export default function Home() {
  const githubUser = 'renangibeli'
  const favoritePersons = ['juunegreiros', 'peas', 'omariosouto', 'rafaballerini', 'marcobrunodev', 'felipefialho']

  return (
    <>
      <AlurakutMenu />
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
        </div>

        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritePersons.length})
            </h2>
            <ul>
              {favoritePersons.map((person) => {
                return (
                  <li>
                    <a href={`/users/${person}`} key={person}>
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
