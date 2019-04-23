const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const Verifier = artifacts.require('Verifier');
var fs = require('fs');
var {proof, input} = JSON.parse(fs.readFileSync('proof.json', 'utf8'));

// Testing SolnSquareVerifier
contract('SolnSquareVerifier', accounts => {
    
    const account_one = accounts[0];
    
    beforeEach(async function () {
        const verifierContract = await Verifier.new({ from: accounts[0] })
        this.contract = await SolnSquareVerifier.new(
          verifierContract.address,
          { from: account_one }
        )
    })

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it('Test if a new solution can be added for contract - SolnSquareVerifier', async function () {
        const result = await this.contract.addSolution(account_one, proof.A, proof.A_p, proof.B, proof.B_p, proof.C, proof.C_p, proof.H, proof.K, input);
        assert.equal("SolutionAdded", result.logs[0].event, "SolutionAdded event should have been emitted");
    });


    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('Test if an ERC721 token can be minted for contract - SolnSquareVerifier', async function () {
        const result = await this.contract.mintNewNFT(1, account_one, proof.A, proof.A_p, proof.B, proof.B_p, proof.C, proof.C_p, proof.H, proof.K, input, { from: account_one });
        assert.equal("Transfer", result.logs[1].event, "Transfer event should have been emitted");

        const owner = await this.contract.ownerOf.call(1);
        assert.equal(owner, account_one, "Owner is invalid");

        const balance = await this.contract.balanceOf.call(account_one);
        assert.equal(balance, 1, "Invalid token balance value");
    });

});