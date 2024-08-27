/*
    This scanner will check for dependent function calls
    For every private function, which is the public function associated with it?
*/

const fs = require('fs')
const contractparser = require('@solidity-parser/parser')

let sourceCode = fs.readFileSync('C:\\Users\\ACER\\Documents\\github\\AuxilliaryScanners\\SmartContracts\\FuncCall.sol', 'utf-8')

class DependentFunc {
    constructor(_funcName, _dependentOn) {
        this.name = _funcName
        this.dependentOn = _dependentOn
    }
}

let getDependentFunctions = (contractAST) => {
    let depFunList = []
    contractparser.visit(contractAST, {
        FunctionDefinition: function(fn) {
            if(fn.visibility == 'private' || fn.visibility == 'internal'){
                depFunList.push(fn.name)
            }
        }
    })
    return depFunList
}

let callerFunctions = (contractAST, depFunList) => {
    let funRelationList = []

    depFunList.forEach(depFun => {
        let depCallerList = []
        contractparser.visit(contractAST, {
            FunctionDefinition: function(fn) {
                if(fn.visibility == 'public' || fn.visibility == 'external'){
                    contractparser.visit(fn, {
                        FunctionCall: function(fnCall){
                            if(fnCall.expression.name == depFun){
                                depCallerList.push(fn.name)
                            }
                        }
                    })
                }
            }
        })
        let obj = new DependentFunc(depFun, depCallerList)
        funRelationList.push(obj)
    })

    console.log(funRelationList)
}


let contractAST = contractparser.parse(sourceCode)

let depFuns = getDependentFunctions(contractAST)

callerFunctions(contractAST, depFuns)