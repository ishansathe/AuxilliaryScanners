import {Structs, Variables, Mappings} from './AuxilliaryScanner.mjs'
import fs from 'fs'
import * as contractparser from '@solidity-parser/parser'

let fileData

fileData = fs.readFileSync('C:\\Users\\ACER\\Documents\\github\\AuxilliaryScanners\\SmartContracts\\testMappings.sol', 'utf-8')

let contractAST = contractparser.parse(fileData)


function showStructs() {
    contractparser.visit(contractAST, {
        ContractDefinition: function(contract){
            contractparser.visit(contract, {
                StructDefinition: function(struct) {
                    console.log(new Structs(struct))
                }
            })
        }
    })
}

function testVariables() {
    contractparser.visit(contractAST, {
        VariableDeclaration: function(vb){
            console.log(new Variables(vb))
            // This will create an object for all variables.
            /* 
            This includes state
                1. State Variables
                2. Function Parameters
                3. Return variables
                4. Memory Variables (or variables declared inside functions.)
    
            If it is desired to collect variables from inside a particular category,
            visit the node of that category (or the particular property) and then pass the object to this struct.
            */
        }
    })
}


function testMappings() {
    contractparser.visit(contractAST, {
        Mapping: function(mp){
            console.log(new Mappings(mp))
        }
    })
}


testVariables()
