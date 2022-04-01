/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        var registro;
        var imovel;
        var coordenadas;
        var proprietario;
        var escritura;
        var matricula;
        var requerimento;
        var averbacao;

        const escrituras = [
            registro= [
                'ano',
                'oficialTitular',
                'numeroMatricula',
                'ficha',
                'data'
            ],
            imovel= [
                'descricao', 
                'numero', 
                'inscricao', 
                'tipo', 
                'endereco', 
                'composicao',
                coordenadas= [
                    'marco', 
                    'norte', 
                    'leste', 
                    'plana', 
                    'azimutePlano'  
                ],
                proprietario= [
                    'nome', 
                    'sede', 
                    'cnpjMf'
                ],	
                escritura= [
                    'data', 
                    'livro'
                ],	
                registro= [
                    'numero', 
                    'data', 
                    'matriculaRg'
                ],	
                matricula= [
                    'numero', 
                    'data'
                ],	
                requerimento= [
                    'dataTermo', 
                    'numeroAverbacao', 
                    'dataAverbacao'
                ],	
            ],
            averbacao= [
                'protocolo', 
                'favorecido', 
                'matricula', 
                'endereco', 
                'subOficial', 
                'comarca', 
                'estado', 
                'numero_daje', 
                'data', 
                'responsavel'			   
            ],	            
        ];

        // for (let i = 0; i < escrituras.length; i++) {
        //     escrituras[i].docType = 'car';
        //     await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(escrituras[i])));
        //     console.info('Added <--> ', escrituras[i]);
        // }

        await ctx.stub.putState('CAMPO-UNICO-1', Buffer.from(JSON.stringify(escrituras)));
        console.info('Added <--> ', escrituras);
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, CampoUnicoIdentificacao) {
        const carAsBytes = await ctx.stub.getState(CampoUnicoIdentificacao); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${CampoUnicoIdentificacao} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async createCar(
        ctx, 
        CampoUnicoIdentificacao,
        registro,
        imovel, 
        averbacao
        ) {
            
        console.info('============= START : Create Escritura ===========');

        const escritura = {
            registro,imovel,averbacao
        }
      
        await ctx.stub.putState(CampoUnicoIdentificacao, Buffer.from(JSON.stringify(escritura)));
        console.info('============= END : Create Escritura ===========');
    }

    async queryAllCars(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

}

module.exports = FabCar;
