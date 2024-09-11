import * as cp from '@solidity-parser/parser'
import { getMemberAccess, OutputFormat } from './AuxilliaryScanner.mjs'
import fs from 'fs'

let sourceCode = fs.readFileSync('SmartContracts\\variable_txOrigin.sol', 'utf-8')
let contractAST = cp.parse(sourceCode)

let vulnerable = false

cp.visit(contractAST, {
    ContractDefinition: function(contract){
        cp.visit(contract, {
            FunctionDefinition: function(fn) {
                cp.visit(fn, {
                    IfStatement: function(ifs){
                        cp.visit(ifs, {
                            BinaryOperation: function (bop){
                                if(bop.right.type == 'MemberAccess')
                                    if(getMemberAccess(bop.right) == 'tx.origin'){
                                        vulnerable = true
                                    }
                                        
                                if(bop.left.type == 'MemberAccess')
                                    if(getMemberAccess(bop.left) == 'tx.origin'){
                                        vulnerable = true
                                    }

                                if(bop.left.type == bop.right.type) {
                                    if(
                                        (bop.left.memberName == 'sender' || bop.left.memberName == 'origin')
                                        &&
                                        (bop.right.memberName == 'sender' || bop.right.memberName == 'origin')
                                    ) {
                                        vulnerable = false
                                        // Niche case of msg.sender == tx.origin
                                    }
                                }
                            }
                        })
                    },
                    FunctionCall: function(fnCall, parent) {
                        if (parent.type != "EmitStatement") {
                            cp.visit(fnCall, {
                                BinaryOperation: function (bop){
                                    if(bop.right.type == 'MemberAccess')
                                        if(getMemberAccess(bop.right) == 'tx.origin'){
                                            vulnerable = true
                                        }
                                            
                                    
                                    if(bop.left.type == 'MemberAccess')
                                        if(getMemberAccess(bop.left) == 'tx.origin'){
                                            vulnerable = true
                                        }

                                    if(bop.left.type == bop.right.type) {
                                        if(
                                            (bop.left.memberName == 'sender' || bop.left.memberName == 'origin')
                                            &&
                                            (bop.right.memberName == 'sender' || bop.right.memberName == 'origin')
                                        ) {
                                            vulnerable = false
                                            // Niche case of msg.sender == tx.origin
                                        }
                                    }
                                }
                            })
                            fnCall.arguments.forEach(arg => {
                                if(arg.type == 'MemberAccess'){
                                    if(getMemberAccess(arg) == 'tx.origin'){
                                        vulnerable = true;
                                        // The crazy scenario where a person sent 'tx.origin' as a parameter to a function
                                        // Which then checked the hardcoded address
                                    }
                                }
                            })
                        }
                    }
                })
                if(vulnerable){
                    vulnerable = false
                    console.log(new OutputFormat(contract, fn))
                }
            }
        })
    }
})