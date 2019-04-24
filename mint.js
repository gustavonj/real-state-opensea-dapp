const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const MNEMONIC = process.env.MNEMONIC
const INFURA_KEY = process.env.INFURA_KEY
const NETWORK = process.env.NETWORK
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
const OWNER_ADDRESS = process.env.OWNER_ADDRESS
const fs = require('fs');

const proofs = [
    JSON.parse(fs.readFileSync('./proofs/proof1.json', 'utf8')),
    JSON.parse(fs.readFileSync('./proofs/proof2.json', 'utf8')),
    JSON.parse(fs.readFileSync('./proofs/proof3.json', 'utf8')),
    JSON.parse(fs.readFileSync('./proofs/proof4.json', 'utf8')),
    JSON.parse(fs.readFileSync('./proofs/proof5.json', 'utf8')),
    JSON.parse(fs.readFileSync('./proofs/proof6.json', 'utf8')),
    JSON.parse(fs.readFileSync('./proofs/proof7.json', 'utf8')),
    JSON.parse(fs.readFileSync('./proofs/proof8.json', 'utf8')),
    JSON.parse(fs.readFileSync('./proofs/proof9.json', 'utf8')),
    JSON.parse(fs.readFileSync('./proofs/proof10.json', 'utf8')),
]


if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
    return
}

const CONTRACT_ABI = require('./eth-contracts/build/contracts/SolnSquareVerifier');
const NFT_ABI = CONTRACT_ABI.abi;

async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/${INFURA_KEY}`)
    const web3Instance = new web3(
        provider
    )

    if (NFT_CONTRACT_ADDRESS) {

        console.log("=======================")
        console.log("CONFIGURATION ")
        console.log("=======================")

        console.log("NFT_CONTRACT_ADDRESS: "+ NFT_CONTRACT_ADDRESS);
        console.log("OWNER_ADDRESS: "+ OWNER_ADDRESS);
        console.log("NETWORK: "+ NETWORK);
        console.log("MNEMONIC: "+ MNEMONIC);
        console.log("INFURA_KEY:"+ INFURA_KEY);

        const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { from:OWNER_ADDRESS, gasLimit: "1000000" });
       
        console.log("=======================")
        console.log("Minting items...")
        console.log("Please be patient -- this may take a while.")
        console.log("=======================")

        proofs.forEach(async (proofFile, index) => {
            try{

              
                const result = await nftContract.methods.mintNewNFT(
                    index,
                    OWNER_ADDRESS,
                    proofFile.proof.A,
                    proofFile.proof.A_p,
                    proofFile.proof.B,
                    proofFile.proof.B_p,
                    proofFile.proof.C,
                    proofFile.proof.C_p,
                    proofFile.proof.H,
                    proofFile.proof.K,
                    proofFile.input)
                    .send({ from: OWNER_ADDRESS, gas:3900000 }, (error, result) => {
                        if(error){
                            console.log("Error: ");
                            console.log(error);
                        }else{
                            console.log("Minted. Transaction: " + result); 
                        }
            
                    });

                console.log(result); 
              
            }catch(e){
                console.log(e);
            }
      
        });

        

        console.log("Minted all tokens");
    }   
}

main()