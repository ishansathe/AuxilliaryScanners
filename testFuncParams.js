import fs from 'fs'
import * as cp from '@solidity-parser/parser'
import { getArrayType, OutputFormat } from './AuxilliaryScanner.mjs'

let contract = fs.readFileSync('SmartContracts\\UAdos.sol', 'utf-8')
let AST = cp.parse(contract)

cp.visit(AST, {
    ContractDefinition: function(contract){
        cp.visit(contract, {
            FunctionDefinition: function(fn){
                console.log(new OutputFormat(contract, fn))
            }
        })
    }
})
