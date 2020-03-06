// ---------------------------------------------------------------------------------------- //

// Ethereum stuff goes here.

/*
This example only works with predeployed contracts.
Get the required information from remix and paste it here.
*/

var CONTRACT_ADDRESS = '0x2Bef0Fb132794b553D44f823941fF979a8906d4D'
var CONTRACT_ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			}
		],
		"name": "delegate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "voter",
				"type": "address"
			},
			{
				"name": "num_shares",
				"type": "uint256"
			}
		],
		"name": "giveRightToVote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "voter",
				"type": "address"
			}
		],
		"name": "removeRightToVote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "old_voter",
				"type": "address"
			},
			{
				"name": "new_voter",
				"type": "address"
			}
		],
		"name": "transferRightToVote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "proposal",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "chairperson",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "proposal_num",
				"type": "uint256"
			}
		],
		"name": "getNumVotes",
		"outputs": [
			{
				"name": "tally_",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposals",
		"outputs": [
			{
				"name": "name",
				"type": "bytes32"
			},
			{
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"name": "weight",
				"type": "uint256"
			},
			{
				"name": "voted",
				"type": "bool"
			},
			{
				"name": "delegate",
				"type": "address"
			},
			{
				"name": "vote",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "winnerName",
		"outputs": [
			{
				"name": "winnerName_",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "winningProposal",
		"outputs": [
			{
				"name": "winningProposal_",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
var CONTRACT; // populated by web3 object once everything set up nicely

/*
Initial preamble boilerplate from:
https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md

It checks that the browser is compatible, and if it is, calls the 
main function! 
*/

window.addEventListener('load', async () => {

  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();
      // Acccounts now exposed
      main()
    } catch (error) {
      // User denied account access...
      console.log('User denied account access!')
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // Acccounts always exposed
    main()
  }
  // Non-dapp browsers...
  else {
    alert('Non-Ethereum browser detected. You need to get a plugin, such as MetaMask');
  }

});

/*
Main function. Remember how in remix you can load functions at specific addresses, but that
you have to tell it the function prototype of the thing you're loading?
This does exactly that, creating a web3 javascript contract object using the ABI and 
address we supplied above.
*/

function main() {
    var contract = web3.eth.contract(CONTRACT_ABI)
    CONTRACT = contract.at(CONTRACT_ADDRESS)
    updateResults()
}

function vote(proposal){
    CONTRACT.vote(proposal, function(error, result) {
        if(error) {console.log(error)} else {console.log('Successful vote!')}
    })
}

function getNumVotes(proposal){

    return new Promise(function(resolve,reject) {
        CONTRACT.getNumVotes(proposal, function(error, result) {
            if(error) {
                reject(error)
            } else {
                resolve(result)
            }
            })
    })
}

function updateResults() {
    var nyes = 0;
    var nno = 0;
    var nabs = 0;
    var total = 0;

    getNumVotes(0).then(function(result) {
        nyes = result.c[0];
    }).then(
        getNumVotes(1).then(function(result) {
            nno = result.c[0];
        }).then(
            getNumVotes(2).then(function(result) {
                nabs = result.c[0];
            }).then(function() {
                total = nyes + nno + nabs;
                $('#yes_bar').progress({percent: 100 * nyes / total});
                $('#no_bar').progress({percent: 100 * nno / total });
                $('#abstain_bar').progress({percent: 100 * nabs/ total});
            })
        )
    )
}

// End of ethereum

// $('#yes_bar').progress({percent: 23});
// $('#no_bar').progress({percent: 62});
// $('#abstain_bar').progress({percent: 15});

// --------------------------------------------------------------------------------------- //        