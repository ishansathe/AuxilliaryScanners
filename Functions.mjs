import * as  contractparser from '@solidity-parser/parser'

export function getMappingObj(AST) {
    let mappingName
    contractparser.visit(AST, {
        Mapping: function(map){
            
        }
    })
}