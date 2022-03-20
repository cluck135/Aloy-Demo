import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import myEpikNft from '../utils/MyEpikNFT.json';

const CONTRACT_ADDRESS = "0x71964621a255F1da7ebde644F36258Cf365174dF";

const Nft = () => {
  const [nftJson, setNftJson] = useState([])

  const [currentAccount, setCurrentAccount] = useState("");
  
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
        setCurrentAccount(account)
        
        // Setup listener! This is for the case where a user comes to our site
        // and ALREADY had their wallet connected + authorized.
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
    setCurrentAccount(accounts[0]);

    // Setup listener! This is for the case where a user comes to our site
    // and connected their wallet for the first time.
    setupEventListener() 
  } catch (error) {
    console.log(error)
  }
}

// Setup our listener.
const setupEventListener = async () => {
  // Most of this looks the same as our function askContractToMintNft
  try {
    const { ethereum } = window;

    if (ethereum) {
      // Same stuff again
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpikNft.abi, signer);

      // THIS IS THE MAGIC SAUCE.
      // This will essentially "capture" our event when our contract throws it.
      // If you're familiar with webhooks, it's very similar to that!
      connectedContract.on("NewEpicNFTMinted", (from, tokenId, nftBase64Json) => {
        // let base64 = nftBase64Json.split('base64,');
        // let buff = Buffer.from(base64[1], 'base64');  
        // let jsonString = buff.toString('utf-8');
        // let json = JSON.parse(jsonString);
        // setNftJson([...nftJson, json]);
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
      let nftTxn = await connectedContract.makeAnEpikNFT();

      console.log("Mining...please wait.")
      await nftTxn.wait();
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
  <button onClick={connectWallet} className="bg-emerald-500 w-fit p-2 lg:p-3 text-2xl text-white rounded-lg">
    Connect to Wallet
  </button>
);

const renderMintUI = () => (
  <button onClick={askContractToMintNft} className="bg-MHgreen w-fit p-2 lg:p-3 text-2xl text-DarkGreen rounded-lg">
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

export default Nft;