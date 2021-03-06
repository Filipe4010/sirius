var express = require('express');
var bodyParser = require('body-parser');
const {engine}  = require('express-handlebars');
const app = express();

//TEMPLATE ENGINE
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");
//BODY PARSER
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());

// Setting for Hyperledger Fabric
const { Gateway,Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
//const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
  //      const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

app.set('view engine', 'handlebars');
app.get('/api/', function (req, res) {
    res.render('index');
});

app.get('/api/createcar', function (req, res) {
    res.render('createcar');
});

app.get('/api/queryallcars', async function (req, res)  {
    try {
const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
// Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
  // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryAllCars');
	console.log(JSON.parse(result));
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        const list = JSON.parse(result)
        res.render("allcars",{ list:list });
} catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});




app.get('/api/query/:car_index', async function (req, res) {
    try {
const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
// Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
  // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');
// Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryCar', req.params.car_index);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});
} catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});



app.post('/api/addcar/', urlencodedParser, async function (req, res) { 
    try {


const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
// Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
  // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');
// Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        
        await contract.submitTransaction('createCar', 
                req.body.campoUnicoIdentificacao,
                registro = [
                        req.body.registro.ano,
                        req.body.registro.oficialTitular,
                        req.body.registro.numeroMatricula,
                        req.body.registro.ficha,
                        req.body.registro.data,
                ],
                imovel = [
                        req.body.imovel.descricao,
                        req.body.imovel.numero, 
                        req.body.imovel.inscricao, 
                        req.body.imovel.tipo, 
                        req.body.imovel.endereco, 
                        req.body.imovel.composicao, 

                        coordenadas = [
                                req.body.imovel.coordenadas.marco, 
                                req.body.imovel.coordenadas.norte, 
                                req.body.imovel.coordenadas.leste, 
                                req.body.imovel.coordenadas.plana, 
                                req.body.imovel.coordenadas.azimutePlano 
                        ],
        
                        proprietario = [
                                req.body.imovel.proprietario.nome, 
                                req.body.imovel.proprietario.sede, 
                                req.body.imovel.proprietario.cnpjMf 
                        ],
                        
                        escritura_publica = [
                                req.body.imovel.escritura_publica.data, 
                                req.body.imovel.escritura_publica.livro
                        ],

                        registro = [
                                req.body.imovel.registro.numero, 
                                req.body.imovel.registro.data, 
                                req.body.imovel.registro.matricula_rg
                        ],

                        matricula = [
                                req.body.imovel.matricula.numero, 
                                req.body.imovel.matricula.data
                        ],

                        requerimento = [
                                req.body.imovel.requerimento.dataTermo, 
                                req.body.imovel.requerimento.numeroAverbacao, 
                                req.body.imovel.requerimento.dataAverbacao
                        ],
                ],
                averbacao = [
                        req.body.averbacao.protocolo, 
                        req.body.averbacao.favorecido, 
                        req.body.averbacao.matricula, 
                        req.body.averbacao.endereco, 
                        req.body.averbacao.subOficial, 
                        req.body.averbacao.comarca, 
                        req.body.averbacao.estado, 
                        req.body.averbacao.numero_daje, 
                        req.body.averbacao.data, 
                        req.body.averbacao.responsavel
                ]                
        );
        console.log(req.body)

        console.log('Transaction has been submitted');
        res.send('Transaction has been submitted CAR ADDED');
// Disconnect from the gateway.
        await gateway.disconnect();
} catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})



app.put('/api/changeowner/:car_index', async function (req, res) {
    try {
const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
// Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
  // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');
// Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        await contract.submitTransaction('changeCarOwner', req.params.car_index, req.body.Ficha);
        console.log('Transaction has been submitted');
        res.send('Transaction has been submitted');
// Disconnect from the gateway.
        await gateway.disconnect();
} catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    } 
})

app.listen(8081, function(){
        console.log('Servidor rodando na porta 8081')
});
