import fs from 'fs'
import * as cp from '@solidity-parser/parser'
import { Variables } from './AuxilliaryScanner.mjs'

testArrayAux(cp.parse(fs.readFileSync('./SmartContracts/testMappings.sol', 'utf-8')))

function testArrayAux(AST) {
    
    cp.visit(AST, {
        VariableDeclaration: function(vb) {
            console.log(new Variables(vb))
            let obj = new Variables(vb)
            fs.appendFileSync('./variableObjects.json', JSON.stringify(obj), 'utf-8')
        }
    })
}