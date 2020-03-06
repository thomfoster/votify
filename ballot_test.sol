pragma solidity >=0.4.22 <0.6.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "./ballot.sol";

contract testcontract {
   
 
    Ballot public ballotToTest;
    
    function setUp () public {

       //Example for the three options (0) abstain (1) yes (2) no
       //Before the vote everyone recieves thier inidividual yes/no/abstain
       ballotToTest = new Ballot(2);
       
       //These Ballots to test need to be adjusted each time to those displayed in remix
       ballotToTest.giveRightToVote(0x5B5512DbeF0b49Bf95E4affE3612D1Af99cb7a4E, 1);
       ballotToTest.giveRightToVote(0x58338393C699fa789571CB30588a35A74B77eD56, 1);
       ballotToTest.giveRightToVote(0x3493a81601fB240B5C890C959c77E6e4271C2f64, 1);
    }
    
    function checkWinninProposalWithReturnValue () public view returns (uint8) {
        
        //TODO allow only the chairperson to call this
        //TODO deanonymize the votes by applying the XOR keys 
        //return the proposal that won the election
        return ballotToTest.winningProposal();
    }
    
}
