import fs from 'fs'
import * as cp from '@solidity-parser/parser'
import { Variables } from './AuxilliaryScanner.mjs'

let contract = fs.readFileSync('SmartContracts\\SmartContractstruct.sol', 'utf-8')
let AST = cp.parse(contract)

let variableList = []

cp.visit(AST, {
    ContractDefinition: function(contract){
        cp.visit(contract, {
            StateVariableDeclaration: function(svb) {
                svb.variables.forEach(variable=> {
                    variableList.push(new Variables(variable))
                })
            }
        })
    }
})

variableList.forEach(vb => {
    console.log(vb.variableName)
})



// console.log(cp.visit(AST, {
//     FunctionCall: function(fn){},
//     VariableDeclaration: function (vb) {
//         console.log(vb)
//     },
// }))

let obj = {
    base: 'no'
}

let visitorFn = {
    StateVariableDeclaration: function(svb) {
        console.log(svb)
    }
}

cp.visit(AST, visitorFn)