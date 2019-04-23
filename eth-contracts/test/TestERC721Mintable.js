var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');


contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO mint multiple tokens
            await this.contract.mint(account_one, 1);
            await this.contract.mint(account_one, 2);
            await this.contract.mint(account_one, 3);
            await this.contract.mint(account_one, 4);
            await this.contract.mint(account_one, 5);
            await this.contract.mint(account_two, 6);
            await this.contract.mint(account_two, 7);
     
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply.call();
            assert.equal(totalSupply, 7, "Total supply is invalid");
        })

        it('should get token balance', async function () { 
            let tokenBalance = await this.contract.balanceOf.call(account_one);
            assert.equal(tokenBalance, 5, "Invalid token balance value for account_one");

            let tokenBalanceTwo = await this.contract.balanceOf.call(account_two);
            assert.equal(tokenBalanceTwo, 2, "Invalid token balance value for account_two");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            const tokenId = 1;
            let tokenUri = await this.contract.tokenURI.call(tokenId);
            assert.equal(tokenUri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"+tokenId, "Invalid token URI");
        })

        it('should transfer token from one owner to another', async function () { 
            let result = await this.contract.transferFrom(account_one, account_two, 1);
            assert.equal("Transfer", result.logs[0].event, "Transfer event should have been emitted");

            let owner = await this.contract.ownerOf.call(1);
            assert.equal(owner, account_two, "Owner is invalid");

            let tokenBalanceOne = await this.contract.balanceOf.call(account_one);
            assert.equal(tokenBalanceOne, 4, "Invalid token balance value for account_one");

            let tokenBalanceTwo = await this.contract.balanceOf.call(account_two);
            assert.equal(tokenBalanceTwo, 3, "Invalid token balance value for account_two");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let error = false;
            try {
                await this.contract.mint(account_two, 99, {from: account_two});
            } catch(e) {
                console.log(e);
                error = true;
            }
            assert.equal(error, true, "An error should occur. Only the owner can transfer the token.");
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner();
            assert.equal(owner, account_one, "Invalid owner");
        })

    });
})