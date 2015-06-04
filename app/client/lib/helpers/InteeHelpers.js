window.onerror = function() { debugger; }

/**
 Helper functions

 @module Helpers
 **/

/**
 The Intee Class.

 @class Intee
 @constructor
 **/

Intee = {};

/**
 The Intee contract object.

 @var (ContractFactory)
 **/

Intee.ContractFactory;

/**
 The Intee contract instance.

 @var (contract)
 **/

Intee.contract;

/**
 If Intee is connected to Web3.

 @method (isConnected)
 **/

Intee.isConnected = function(){
    if(Session.get('connected'))
        return true;
};

/**
 Tailors web3 object for session data.

 @var (web3)
 **/

Intee.web3 = function(){
    return Session.get('web3');
};

/**
 The current contract address.

 @var (address)
 **/

Intee.address;


/**
 Deploy the contract to Ethereum blockchain.

 @method (deploy)
 @param {Array} contract description
 @param {Object} transaction options for the deployment.
 @return {String} the address of the new contract.
 **/

Intee.deploy = function(contractAbi, transactionOptions, callback){
    console.log('Now Deploying, transactoin options');
    console.log(transactionOptions);
    console.log('Now Deploying, Contract ABIs');
    console.log(JSON.stringify(contractAbi));
    this.ContractFactory = web3.eth.contract(contractAbi);
    web3.eth.sendTransaction(transactionOptions, function(err, result){
        if(!err) {
            Intee.address = result;
            Intee.contract = new Intee.ContractFactory(Intee.address);
        }
        callback(err, result);
    });
};

/**
 Compile JSON data from contract.

 @method (compileJSON)
 @param {String} the input solidity code string to be compiled.
 **/

Intee.compileJSON = function(input){
    var compiler = Module.cwrap("compileJSON", "string", ["string", "number"]);
    return compiler(input, 1);
}

/**
 The output that will goto the output window.

 @method (output)
 @param {String} the output string.
 **/

Intee.output = function(o) {
    Session.set('output', String(o));
};

/**
 The console output command. Add a line to the console.

 @method (console)
 @param {String} the new output string.
 **/

Intee.console = function(o) {
    Session.set('consoleData', Session.get('consoleData') + '\n' + String(o));
    $("#consolePre").scrollTop($("#consolePre")[0].scrollHeight + 20);
};

/**
 Render contracts from JSON.

 @method (renderContracts)
 @param {JSON} the JSON objects containing the contracts.
 @param {String} the raw string containing the objects.
 **/

Intee.renderContracts = function(data, source) {
    // Get last contract name.
    var craw_1 = source.lastIndexOf("contract");
    var craw_2 = source.indexOf("{", craw_1);
    var craw_3 = source.substr(craw_1 + 8, craw_2 - craw_1);
    var craw_4 = craw_3.trim().split(" ");
    var contractName = craw_4[0].trim();
    var contract = data.contracts[contractName];
    var contractMethods;

    if(_.isUndefined(contract) || _.isEmpty(contractName))
        return;

    Session.set("contractName", contractName);
    Session.set('contractBytes', (contract.bytecode.length / 2));
    Session.set("hex", contract.bytecode);
    Session.set("abi", JSON.stringify(JSON.parse(contract.interface), null, 2));
    Session.set('contractInterface', contract.solidity_interface);

    try{
        contractMethods = JSON.parse(contract.interface);
        Session.set("contractAbi", contractMethods);
    }catch(exception){
        return;
    }

    Intee.output('===== ' + contractName + ' =====' +
    '\nInterface: \n' + contract.solidity_interface +
    '\n\n Hex: \n' + contract.bytecode +
    '\n\n Opcodes: \n' + contract.opcodes);

    if(!_.isArray(contractMethods))
        return;

    _.each(contractMethods, function(item, index){
        item.index = index;
        item.hasInputs = false;
        item.hasOutputs = false;
        item.callable = false;
        item.transactable = false;
        item.nameClean = item.name;

        if(!_.isArray(item.outputs))
            return;

        if(item.outputs.length > 0)
            item.callable = true;
        item.hasOutputs = true;

        if(item.outputs.length == 0)
            item.transactable = true;

        if(item.inputs.length > 0)
            item.hasInputs = true;

        item.arguments = [];

        _.each(item.inputs, function(input, inputIndex){
            input.kind = "";
            input.isArray = false;
            input.isInt = false;
            input.isBytes = false;
            input.isBool = false;
            input.isAddress = false;
            input.isHash = false;
            item.arguments.push(input.type);

            if(_.isEmpty(input.name))
                input.name = input.type;

            if(input.type.indexOf("[") !== -1 && input.type.indexOf("]") !== -1) // TODO more support to come..
                input.isArray = true;

            if(input.type.indexOf("int") !== -1){
                input.kind = "int";
                input.isInt = true;
            }

            if(input.type.indexOf("bytes") !== -1){
                input.kind = "bytes";
                input.isBytes = true;
            }

            if(input.type.indexOf("string") !== -1){
                input.kind = "string";
                input.isBytes = true;
            }

            if(input.type.indexOf("hash") !== -1){
                input.kind = "hash";
                input.isHash = true;
            }

            if(input.type.indexOf("address") !== -1){
                input.kind = "address";
                input.isAddress = true;
            }

            if(input.type.indexOf("bool") !== -1){
                input.kind = "bool";
                input.isBool = true;
            }
        });

        if(item.inputs.length > 0)
            item.name = item.name + "(" + String(item.arguments) + ")";
    });

    Session.set('contractMethods', contractMethods);
    var selectedMethod = Session.get('method');

    if(!_.isEmpty(selectedMethod))
        Session.set('method', contractMethods[selectedMethod.index]);


    if(!Session.get('boot')) {
        Session.set('boot', true);
        Session.set('auto', false); // on boot set auto to false.
    }
};

/**
 Turn Solidity code into interface.

 @method (onAceUpdate)
 @param {Object} event object that is passed on ace update.
 **/

Intee.onAceUpdate = function(e) {
    var editor = Intee.editorObject;
    var input = editor.getValue();
    var data;

    if(!Session.get('auto') && !Session.get('refresh'))
        return;

    if(!Intee.runtimeInit)
        return;

    if (input == Intee.previousInput)
        return;

    try {
        data = $.parseJSON(Intee.compileJSON(input, 1));
    } catch (exception) {
        Intee.output("Uncaught JavaScript Exception:\n" + exception + '\n\n' + 'Note, Chrome/Chromium currently reports "Uncaught JavaScript Exception". To work around this problem, enable the debug console (Ctrl+Shift+i) and reload.');
        return;
    }

    if (data['error'] !== undefined) {
        Intee.output(data['error']);

        if(String(data['error']).indexOf('during compilation') !== -1)
            Intee.output(data['error'] + ' \n\nNote, Chrome/Chromium currently reports "Unknown exception during compilation.". To work around this problem, enable the debug console (Ctrl+Shift+i) and reload.');
    } else{
        Intee.renderContracts(data, input);
    }

    // Update Clear Button
    $('#cleanAbi').show();
};
