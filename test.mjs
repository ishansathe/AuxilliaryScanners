import fs from 'fs'
import * as cp from '@solidity-parser/parser'
import { Variables } from './AuxilliaryScanner.mjs'

testArrayAux(cp.parse(fs.readFileSync('./SmartContracts/testMappings.sol', 'utf-8'), {loc: true}))

function testArrayAux(AST) {
    
    cp.visit(AST, {
        VariableDeclaration: function(vb) {
            // console.log(new Variables(vb))
            // let obj = new Variables(vb)
            // fs.appendFileSync('./variableObjects.json', JSON.stringify(obj), 'utf-8')
        },
        ContractDefinition: function(contract) {
            console.log(contract.loc)
        }
    })
}