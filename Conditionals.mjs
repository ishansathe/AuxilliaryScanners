import * as contractparser from '@solidity-parser/parser'
import fs from 'fs'

let sourceCode = fs.readFileSync('SmartContracts\\variable_txOrigin.sol', 'utf-8')
let contractAST = contractparser.parse(sourceCode)


function checkBinaryOp(bop, variable){
    console.log(bop.right)
    if(bop.right.name == variable) {
        return true
    }
    if(bop.left.name == variable) {
        return true
    }

    return false
}

function checkVarInConditions(variable) {
    contractparser.visit(contractAST, {
        IfStatement: function(ifs){
            if(ifs.condition.type == 'Identifier') {
                if(ifs.condition.name == variable) {
                    return true;
                }
            }
            if(ifs.condition.type == 'BinaryOperation') {
                console.log(checkBinaryOp(ifs.condition, variable))
            }
        },
        FunctionCall: function(fnCall) {
            if(fnCall.expression.name == 'require' 
                || fnCall.expression.name == 'assert'
            ){
                if(fnCall.arguments[0].type == 'BinaryOperation'){
                    console.log(checkBinaryOp(fnCall.arguments[0], variable))
                }
            }
        }
    })
}

checkVarInConditions("owner")

// This code is currently limited to the variables only. 
// Not the special keywords like msg.sender or tx.origin. 
// This code also does not check for functions added on top of the variable.
