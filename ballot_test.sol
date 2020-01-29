pragma solidity >=0.4.22 <0.6.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "./ballot.sol";

contract testcontract {
   
    Ballot public ballotToTest;
    
    function setUp () public {

       //only three options (0) abstain (1) yes (2) no
       ballotToTest = new Ballot(2);
       
       //These Ballots to test need to be adjusted each time to those displayed in remix
       ballotToTest.giveRightToVote(0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C);
       ballotToTest.giveRightToVote(0x25E2A90e2A9BC9Dfe3A69b681Ac47f5366c204a1);
       ballotToTest.giveRightToVote(0x583031D1113aD414F02576BD6afaBfb302140225);
    }
    
    function checkWinninProposalWithReturnValue () public view returns (uint8) {
        
        //return the proposal that won the election
        return ballotToTest.winningProposal();
    }
    
}
