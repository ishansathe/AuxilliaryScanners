import fs from 'fs'
import * as contractparser from '@solidity-parser/parser'

let sourceContract = fs.readFileSync('C:\\Users\\ACER\\Documents\\github\\AssessorTool\\Smart Contracts\\SmartContractstruct.sol', 'utf-8')

let contractAST = contractparser.parse(sourceContract)


// Returns list of variables with types.


export class Variables{
    constructor(vb){
        this.variableType = vb.typeName.name
        if (vb.typeName.type == 'UserDefinedTypeName'){
            this.variableType = vb.typeName.namePath
        }
        this.variableName = vb.name
    }
}


function getVariables(AST) {
    let vbList = []
    contractparser.visit(AST, {
        StateVariableDeclaration: function(svb) {
            contractparser.visit(svb, {
                VariableDeclaration: function(vb) {
                    vbList.push(new Variables(vb))
                }
            })
        }
    })
    console.log((vbList))
    
    return vbList
}

// getVariables(contractAST)


export class Structs{
    constructor(_struct) {
        this.structName = _struct.name
        this.variableList = []
        _struct.members.forEach(member => {
            this.variableList.push(new Variables(member))
        })
    }
}

function getStructs(AST) {
    let structList = []
    contractparser.visit(AST, {
        StructDefinition: function(sd){
            structList.push(new Structs(sd))
        }
    })
    
    structList.forEach(struct => {
        console.log(struct)
    })
}


// getStructs(contractAST)

export class OutputFormat{
    constructor(_contractNode, _funcNode){
        this.contractName = _contractNode.name
        
        if(_funcNode.name === null){
            this.funcName = 'none'
            if(_funcNode.isConstructor === true)
                this.isConstructor = true
            if(_funcNode.isReceiveEther === true)
                this.isReceiveEther = true
            if(_funcNode.isFallback === true)
                this.isFallback = true
        } else {
            this.funcName = _funcNode.name
            if(_funcNode.isVirtual === true){
                this.isVirtual = true
            }
            if(_funcNode.override !== null) {
                this.overriding = _funcNode.override
            }
        }
        this.funcParams = []
        _funcNode.parameters.forEach(param => {
            this.funcParams.push({
                paramType : param.typeName.name,
                paramName : param.identifier.name
            })
        });
    }
}

export function getMemberAccess(node){
    return (node.expression.name+'.'+node.memberName)  
}

// exports.getStructs = (contractAST) => {
//     getStructs(contractAST)
// }
// exports.getVariables = (contractAST)=> {
//     getVariables(contractAST)
// }


