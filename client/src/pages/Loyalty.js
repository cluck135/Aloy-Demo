import * as React from 'react';
import Nft from '../components/NFT';

import profilePic from '../images/Default_Profile.png';
import Auth from '../utils/auth';

const Loyalty = () => {



// if(!Auth.loggedIn()){
//   return (
//     <div>

//     </div>
//   )
// }
  return (
    <div className='flex flex-col w-screen lg:items-center '>
      <div className='w-full lg:w-full rounded bg-DarkGreen text-white'>
        <ul className='flex flex-row justify-center items-center lg:justify-end'>
          <li className='flex lg:justify-center justify-end p-2 basis-2/3 lg:basis-auto'>
            <Nft />
          </li>
          <li className='flex lg:basis-auto selection:basis-1/3 items-center justify-end'>
            <div className='bg-contain w-12 h-12 lg:w-20 lg:h-20 lg:m-10 m-2 rounded-full ring-2 ring-white' style={{ backgroundImage: `url(${profilePic})`}}/>
          </li>
        </ul>
      </div>
      <div className='flex justify-evenly'>
        <div>

        </div>
      </div>
    </div>
  );
};

export default Loyalty;