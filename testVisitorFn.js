import fs from 'fs'
import * as cp from '@solidity-parser/parser'
import { Variables } from './AuxilliaryScanner.mjs'

let contract = fs.readFileSync('SmartContracts\\SmartContractstruct.sol', 'utf-8')
let AST = cp.parse(contract)

let visitorFn = {
    StateVariableDeclaration: function(svb) {
        console.log(svb)
    } 
}

cp.visit(AST, visitorFn, visitorFn, visitorFn)

class Scan {
    
    defineVariable(array){
        let object = {
            StateVariableDeclaration: function(svb) {
                svb.variables.forEach(variable=> {
                    array.push(new Variables(variable))
                })
            }
        }
        return object
    }
}