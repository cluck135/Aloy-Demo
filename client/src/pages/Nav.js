import * as React from 'react';

import { Link } from 'react-router-dom';
import { Tabs, Tab, AppBar } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import MHlogoBlk from '../images/MH_Logo_Black.png';
import MHmonoBlk from '../images/MH_Monogram_Black.png';

function Nav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const routes = ["/", "/loyalty"]

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  return (
    <AppBar position='relative' sx={{backgroundColor: "white"}}>
      <Tabs variant="fullWidth" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
        <Tab sx={{ 
          backgroundImage: `url(${MHlogoBlk})`,
          m: "10px 30px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain"
          }} value={routes[0]} component={Link}  to={routes[0]}/>
        <Tab label="Destinations +" />
        <Tab label="Loyalty" value={routes[1]} component={Link} to={routes[1]}/>
        <Tab label="Our Story" />
        <Tab label="Shop Your Stay" />
      </Tabs>
      <Tabs variant="fullWidth" orientation='vertical' sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}>
        <Tab sx={{ 
          backgroundImage: `url(${MHmonoBlk})`,
          m: "10px 30px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain"
          }} value={routes[0]} component={Link}  to={routes[0]}/>
        <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="success"
            >
        <MenuIcon />
        </IconButton>
        <Tabs orientation="vertical" open="false">
        <Tab label="Destinations +" />
        <Tab label="Loyalty" value={routes[1]} component={Link} to={routes[1]}/>
        <Tab label="Our Story" />
        <Tab label="Shop Your Stay" />
        </Tabs>
      </Tabs>
    </AppBar>
  )
}

export default Nav;