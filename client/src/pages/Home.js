import MintHome from '../images/Home_Wallpaper.png'
import MintMobileHome from '../images/Mobile_Home_Wallpaper.png'

function Home() {


  return (
    <div>
      {window.innerWidth <= 415 
      ? <div className="h-screen w-screen bg-no-repeat bg-cover" style={{ backgroundImage: `url(${MintMobileHome})`}}/>
      : <div className="h-[80vh] w-screen bg-no-repeat bg-cover" style={{ backgroundImage: `url(${MintHome})`}}/>
      }
    </div>
  )
}

export default Home;