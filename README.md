# Real Estate Marketplace

This project aims to enable the creation of tokens to represent the title of the properties. Before you mint a token, you must verify that you own the property. For this, zk-SNARKs were used to create a verification system that can prove the owner of a property title without revealing specific information about the property.

Once the token has been verified, it can be placed in a blockchain market (OpenSea) for others to buy.

# Testing the project

Clone the project using git:

```
git clone https://github.com/gustavonj/real-state-opensea-dapp.git
```

Install all requisite npm packages (as listed in ```package.json```):

```
npm install
```

Testing on a private blockchain using ganache:

Launch Ganache:

```
ganache-cli -m "<mnemonic>"
```

Navigate to eth-contracts and run truffle test:

```
cd eth-contracts
truffle compile --reset
truffle migrate --reset

truffle test test/TestERC721Mintable.js 
truffle test test/TestERC721Mintable.js 
truffle test test/TestSolnSquareVerifier.js
```

# Zokrates (not required / optional

Zokrates is used for generate/to change the verifier contract or generate proofs.


#### Install Docker

Instructions for installing it [here](https://docs.docker.com/install/).

#### Run ZoKrates docker container:

```
docker run -v <path project folder>/zokrates/code:/home/zokrates/code -ti zokrates/zokrates:0.3.0 /bin/bash
```

#### Compile the program written in ZoKrates DSL 


```
cd code/square
~/zokrates compile -i square.code
```

#### Generate the Trusted Setup

```
~/zokrates setup
```

#### Compute Witness

```
~/zokrates compute-witness -a <a> <b> ... <n>
```

#### Generate Proof

```
~/zokrates generate-proof
```

#### Export Verifier

```
~/zokrates export-verifier
```

# Minting

There are a script for initial minting in the folder ``mint/mint.js`

You should set this contract address and the address of your MetaMask account as environment variables when running the minting script.

```
export OWNER_ADDRESS="<my_address>"
export NFT_CONTRACT_ADDRESS="<deployed_contract_address>"
export MNEMONIC="<mnemonic>"
export INFURA_KEY="<infura_key>"
export NETWORK = "<network_id>"

node mint.js
```

**References:**
* https://docs.opensea.io/docs/1-structuring-your-smart-contract
* https://github.com/ProjectOpenSea/opensea-creatures


# Contract ABIs

See in this folder: **eth-contracts/build**

# Deployment on Rinkeby Network

#### Contracts Address

* SolnSquareVerifier:

``0xa795C5568Fb2f682fd26062eA5b0C7e4Eb7bfA0F``

* Verifier:

``0x1eD1e9D1ae89dD2A3c1eA50e52D22531C69f995b``

#### Etherscan

* SolnSquareVerifier:

https://rinkeby.etherscan.io/address/0xa795C5568Fb2f682fd26062eA5b0C7e4Eb7bfA0F

* Verifier

https://rinkeby.etherscan.io/address/0x1eD1e9D1ae89dD2A3c1eA50e52D22531C69f995b


####  Deployment Log

See in this file: **deployment.log**


# Open Sea Market Store

[https://rinkeby.opensea.io/category/realstatetoken](https://rinkeby.opensea.io/category/realstatetoken)

or

[https://rinkeby.opensea.io/assets/realstatetoken](https://rinkeby.opensea.io/assets/realstatetoken)

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
