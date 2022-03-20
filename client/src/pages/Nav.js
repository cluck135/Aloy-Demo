import { Link } from 'react-router-dom';
import { useState } from 'react';

import { MenuIcon, XIcon, BeakerIcon } from '@heroicons/react/solid'

import MHlogoBlk from '../images/MH_Logo_Black.png';
import MHmonoBlk from '../images/MH_Monogram_Black.png';

function Nav() {
  const routes = ["/", "/loyalty"]
  const [showTabs, setShowTabs] = useState(false);

  return (
   <div className='font-raleway text-xl w-screen' >
     <div className='m-2'>
        {window.innerWidth <= 415
        ? <ul className='flex flex-col w-full justify-center items-center' >
            <Link to="/">
            <li className='w-[200px] h-[100px] bg-contain bg-no-repeat' style={{ backgroundImage: `url(${MHmonoBlk})`}}>
            </li>
            </Link>
            {!showTabs
            ? <MenuIcon className='h-10 w-10 text-DarkGreen' onClick={() => setShowTabs(!showTabs)}/>
            : <XIcon className='h-10 w-10 text-DarkGreen' onClick={() => setShowTabs(!showTabs)}/>
            }

            {showTabs && 
            <><Link to="/loyalty" onClick={() => setShowTabs(!showTabs)}>
            <li>
              Loyalty Rewards 
            </li>
            </Link>
            <li>
              Our Story
            </li>
            <li>
              Shop Your Stay
            </li>
            </>}

          </ul>
        : <ul className='flex w-full p-5 justify-between items-center' >
            <li className='flex'>
              <Link className='px-5' to="/">
              <div className='w-[340px] h-[32px] basis-1/4 bg-contain bg-no-repeat' style={{ backgroundImage: `url(${MHlogoBlk})`}}>
              </div>
              </Link>
              <div className='px-5 text-2xl'>
                Destinations +
              </div>
            </li>
            <li className='flex'>
              <Link className='px-3' to="/loyalty">
              <div>
                Loyalty Rewards
              </div>
              </Link>
              <div className='px-3'>
                Our Story
              </div>
              <div className='px-3'>
                Shop Your Stay
              </div>
            </li>
          </ul>
        }
        
     </div>
   </div>
  )
}

export default Nav;