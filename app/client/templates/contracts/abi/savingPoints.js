var savingPointsABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "getSPBalance",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "saveEther",
        "outputs": [
            {
                "name": "sufficient",
                "type": "bool"
            }
        ],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "getFundSPBalance",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "borrowAmount",
                "type": "uint256"
            }
        ],
        "name": "borrowEther",
        "outputs": [
            {
                "name": "sufficient",
                "type": "bool"
            }
        ],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "getFundBalance",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "getEtherBalance",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "type": "function"
    }
]
