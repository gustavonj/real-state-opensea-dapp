pragma solidity ^0.5.2;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./Verifier.sol";
import "./ERC721Mintable.sol";


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete {

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        bytes32 index;
        address sAddress;
    }

    Verifier verifierContract;

    constructor(address verifierAddress) public {
        verifierContract = Verifier(verifierAddress);
    }


    // TODO define an array of the above struct
    Solution[] private solutions;
   
    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private submittedSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(bytes32 index, address solution);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(
                    address to,
                    uint[2] memory a,
                    uint[2] memory a_p,
                    uint[2][2] memory b,
                    uint[2] memory b_p,
                    uint[2] memory c,
                    uint[2] memory c_p,
                    uint[2] memory h,
                    uint[2] memory k,
                    uint[2] memory input
                    ) public {

        bytes32 proofHash = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));
        _addSolution(to, proofHash);
    }


    function _addSolution(address to, bytes32 proofHash) internal {
         Solution memory solution;
         solution.index = proofHash;
         solution.sAddress = to;
         submittedSolutions[proofHash] = solution;
         emit SolutionAdded(proofHash, to);
    }


    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNewNFT(uint256 tokenId, 
                    address to,
                    uint[2] memory a,
                    uint[2] memory a_p,
                    uint[2][2] memory b,
                    uint[2] memory b_p,
                    uint[2] memory c,
                    uint[2] memory c_p,
                    uint[2] memory h,
                    uint[2] memory k,
                    uint[2] memory input
                    ) public returns (bool) {
         
        require(verifierContract.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input), "Proof is invalid");
        bytes32 proofHash = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));
        require(submittedSolutions[proofHash].sAddress == address(0), "Solution already exists");
        _addSolution(to, proofHash);
        return super.mint(to, tokenId);
    }

}
