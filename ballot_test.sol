
pragma solidity >=0.4.22 <0.6.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "./ballot.sol";

contract test3 {
   
    Ballot public ballotToTest;
    
    function setUp () public {
    
       //only three options (0) abstain (1) yes (2) no
       ballotToTest = new Ballot(2);
       
       //These Ballots to test need to be adjusted each time to those displayed in remix
       ballotToTest.giveRightToVote(0x3c5D81dd52E9091A5271a1050a3319F23bD57BF6);
       ballotToTest.giveRightToVote(0x25E2A90e2A9BC9Dfe3A69b681Ac47f5366c204a1);
       ballotToTest.giveRightToVote(0x1CeC1FEd11D1C0d428DE0319Dc54dd6C0F6d09a8);
       
    }
    
    function checkWinningProposal () public {
        ballotToTest.vote(1);
        Assert.equal(ballotToTest.winningProposal(), uint(1), "1 should be the winning proposal");
    }
    
    function checkWinninProposalWithReturnValue () public view returns (bool) {
    
        //check if yes won and the proposal will be accepted 
        return ballotToTest.winningProposal() == 1;
        
    }
}
