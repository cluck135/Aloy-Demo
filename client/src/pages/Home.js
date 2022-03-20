import Typography from '@mui/material/Typography';
import MintHomeWallpaper from '../images/HomeWallpaper.png'

function Home() {

  return (
      <div className="homeImg" style={{ backgroundImage: `url(${MintHomeWallpaper})`}}/>
  )
}

export default Home;