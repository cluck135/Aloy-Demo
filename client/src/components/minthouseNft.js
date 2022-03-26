import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useMutation } from '@apollo/client';
import {ADD_NFT} from '../utils/mutations';

import { Buffer } from 'buffer';
 
import myEpikNft from '../utils/MyEpikNFT.json';

const CONTRACT_ADDRESS = "0x71964621a255F1da7ebde644F36258Cf365174dF";

const minthouseNft = ({setMintMsg, setNftJson, setMintBadgeMsg, setConnected}) => {

  const [currentAccount, setCurrentAccount] = useState("");

  const [addNft] = useMutation(ADD_NFT)

  const handleMint = async (json) => {

    await addNft({
      variables: {
        nft: json
      },
    });
  }
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
    } else {
        console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setConnected(true);
        setCurrentAccount(account)
        setupEventListener()
    } else {
        console.log("No authorized account found")
    }
}

const connectWallet = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    console.log("Connected", accounts[0]);
    // Setup listener! This is for the case where a user comes to our site
    // and connected their wallet for the first time.
    setCurrentAccount(accounts[0])
    setupEventListener() 
  } catch (error) {
    console.log(error)
  }
}

// Setup our listener.
const setupEventListener = async () => { 
  // Call a function with connectedContract like the one in hashlips that will do  _exists(tokenId)
  // then have it return true if it does exist otherwise return false, if false delete tokenId from user,
  // implement this on checkout page as well when built
  // Most of this looks the same as our function askContractToMintNft
  try {
    const { ethereum } = window;

    if (ethereum) {
      setMintBadgeMsg("Your Mint House Loyalty Badge is loading")
      setConnected(true);

      // Same stuff again
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpikNft.abi, signer);
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      // const bal = await connectedContract.balanceOf(accounts[0]);
      // const contBal = ethers.utils.formatUnits(bal, 0);
      const response = await fetch('https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&contractaddress=0x71964621a255F1da7ebde644F36258Cf365174dF&address=0x20EbF6173fc600911687Cb44AC6C6b7DD521479D&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=NFDJ7DF5S4MA1ASVZ77DT5WEMM7YJ6NYSU');
      const data = await response.json();
      let abi = data.result;

      
      let yourTokens = await Promise.all(abi.map(async (tx) => {
        let owner = await connectedContract.ownerOf(tx.tokenID);
        let ownerLowerCase = owner.toLowerCase()
        if(ownerLowerCase === accounts[0]){
          return tx.tokenID;
        }
        return;
      }))
      let cleanedYourTokens = yourTokens.filter(token => token !== undefined);
      let userNftMetaData = await Promise.all(cleanedYourTokens.map(async (tokenId) => {
        let nftBase64 = await connectedContract.tokenURI(tokenId);
        let base64 = await nftBase64.split('base64,');
        let buff = await Buffer.from(base64[1], 'base64');  
        let jsonString = await buff.toString('utf-8');
        let json = await JSON.parse(jsonString);
        let nftJson = {
          name: json.name,
          image: json.image
        }
        return nftJson;
      }))

      setNftJson(userNftMetaData);
      console.log(userNftMetaData);

      // THIS IS THE MAGIC SAUCE.
      // This will essentially "capture" our event when our contract throws it.
      // If you're familiar with webhooks, it's very similar to that!
      connectedContract.on("NewEpicNFTMinted", async (from, tokenId, nftBase64Json) => {
        // save tokenId to USER model, add delete and add mutation, and query to get it aswell. XXXX
        let base64 = await nftBase64Json.split('base64,');
        let buff = await Buffer.from(base64[1], 'base64');  
        let jsonString = await buff.toString('utf-8');
        let json = await JSON.parse(jsonString);
        let nftJson = {
          name: json.name,
          image: json.image
        }

        await handleMint(nftJson);
        console.log(from, tokenId.toNumber())
        alert(`  Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
      });

      console.log("Setup event listener!")

    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}

const askContractToMintNft = async () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpikNft.abi, signer);
      console.log("Going to pop wallet now to pay gas...")
      let nftTxn = await connectedContract.makeAnEpikNFT();// this is an example of calling func XXXX

      console.log("Mining...please wait.")
      setMintMsg("Your Minthouse rewards NFT is being minted please wait...")
      await nftTxn.wait();
      setMintMsg("");
      console.log(nftTxn);
      console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}


useEffect(() => {
  checkIfWalletIsConnected();
}, [])

const renderNotConnectedContainer = () => (
  <button onClick={connectWallet} className="bg-emerald-500 w-fit p-2 lg:p-3 text-2xl text-white rounded-lg delay-150 duration-300 hover:bg-emerald-300">
    Connect to Wallet
  </button>
);

const renderMintUI = () => (
  <button onClick={askContractToMintNft} className="bg-MHgreen w-fit p-2 lg:p-3 text-2xl text-DarkGreen rounded-lg delay-150 duration-300 hover:bg-teal-50">
    Mint Loyalty Rewards NFT
  </button>
)
  return (
    <div>
      <div className="">
          {currentAccount === "" ? renderNotConnectedContainer() : renderMintUI()}
      </div>
    </div>
  );
};

export default minthouseNft;