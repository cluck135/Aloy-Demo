import React, { useState } from "react";

import MinthouseNft from '../components/minthouseNft';
import profilePic from '../images/Default_Profile.png';

const Loyalty = () => {
  const [mintMsg, setMintMsg] = useState("");
  const [connected, setConnected] = useState(false);
  const [mintBadgeMsg, setMintBadgeMsg] = useState("");
  const [userNftJson, setNftJson] = useState([]);

  return (
    <div className='flex flex-col w-screen lg:items-center '>
      <div className='w-full lg:w-full bg-DarkGreen text-white'>
        <ul className='flex flex-row justify-center items-center lg:justify-end'>
          <li className='flex lg:justify-center justify-end p-3 basis-2/3 lg:basis-auto'>
            <MinthouseNft setMintMsg={setMintMsg} setNftJson={setNftJson} setMintBadgeMsg={setMintBadgeMsg} setConnected={setConnected}/>
          </li>
          <li className='flex lg:basis-auto selection:basis-1/3 items-center justify-end'>
            <div className='bg-contain w-12 h-12 lg:w-20 lg:h-20 lg:m-10 m-2 rounded-full ring-2 ring-white' style={{ backgroundImage: `url(${profilePic})`}}/>
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-center ">
        {mintMsg !== "" &&
        <div className="m-2 p-2 bg-MHgreen flex rounded-lg text-DarkGreen text-2xl duration-300">
          <h1 className="animate-pulse">
            {mintMsg}
          </h1>
        </div>
        }
      </div>
      <div className='flex flex-col justify-center items-center'>
      {connected && 
        <div className="flex justify-center text-center items-center bg-MHgreen h-fit w-[90%] my-2 rounded-xl">
        {userNftJson.length !== 0
          ? 
            <div className="flex flex-col justify-center items-center">
              <div className="w-[90%] my-2 bg-DarkGreen rounded-lg text-white text-2xl ">
                <h1 className=" w-fit p-2 lg:p-3 ">Your MintHouse Loyalty Rewards Badge</h1>
              </div>
              <img className="w-4/5 h-4/5 mb-4" alt="user NFT" src={userNftJson[0].image}></img>
            </div>
          :
            <div className="m-2 p-2 bg-MHgreen flex rounded-lg text-DarkGreen text-2xl duration-300">
              <h1 className="animate-pulse">
                {mintBadgeMsg}
              </h1>
            </div>
        }
        </div>
      }
      </div>
    </div>
  );
};

export default Loyalty;