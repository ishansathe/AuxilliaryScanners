const fs = require('fs')
const contractparser = require('@solidity-parser/parser')

let sourceContract = fs.readFileSync('C:\\Users\\ACER\\Documents\\github\\AuxilliaryScanners\\SmartContractstruct.sol', 'utf-8')

let contractAST = contractparser.parse(sourceContract)



function getVariables() {
    let vbList = []
    contractparser.visit(contractAST, {
        StateVariableDeclaration: function(svb) {
            contractparser.visit(svb, {
                VariableDeclaration: function(vb) {
                    let vbName = vb.name
                    let vbType 
                    if(vb.typeName.type == 'ElementaryTypeName'){
                        vbType = vb.typeName.name
                    }
                    else if (vb.typeName.type == 'UserDefinedTypeName'){
                        vbType = vb.typeName.namePath
                    }

                    vbList.push({
                        type : vbType,
                        name : vbName
                    })
                }
            })
        }
    })
    console.log(vbList)
}

getVariables()


function getStructs() {
    let structList = []
    contractparser.visit(contractAST, {
        StructDefinition: function(sd){
            let structName = sd.name
            let vbList = []
            contractparser.visit(sd, {
                VariableDeclaration: function(vb) {
                    let vbName = vb.name
                    let vbType
                    if(vb.typeName.type == 'ElementaryTypeName'){
                        vbType = vb.typeName.name
                    }
                    else if (vb.typeName.type == 'UserDefinedTypeName'){
                        vbType = vb.typeName.namePath
                    }
                    vbList.push({
                        type : vbType,
                        name : vbName
                    })
                }
            })
            structList.push({
                structName: structName,
                variables : vbList
            })
        }
    })

    console.log(structList)
    
    // To display each struct

    let displayStructContents = () => {
        structList.forEach(struct => {
            console.log(struct)
        })
    }

    return (structList, displayStructContents)
}


let (structs, contentChecker) = getStructs()
/*
// This function returns 2 things:
    1. A struct list
    2. A function that returns contents of the structs (the variables and its types.)
*/

// contentChecker()