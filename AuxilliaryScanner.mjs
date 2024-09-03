
export class Variables{
    constructor(vb){
        this.variableType = vb.typeName.name
        if (vb.typeName.type == 'UserDefinedTypeName'){
            this.variableType = vb.typeName.namePath
        }
        this.variableName = vb.name
    }
}

export class Structs{
    constructor(_struct) {
        this.structName = _struct.name
        this.variableList = []
        _struct.members.forEach(member => {
            this.variableList.push(new Variables(member))
        })
    }
}


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
