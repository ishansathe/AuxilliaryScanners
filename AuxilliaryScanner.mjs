
/*
    The class now support elementary types, arrays (both fixed and dynamic)
    Mappings (as well as nested mappings).
    Struct types (which will now simply)

    Testing has not yet been done on true User Defined Type Names 
    (The parser sees Struct Variables as UserDefined Types for some reason.)
    Notes have been taken regarding opinion and changes to be made.
*/
export class Variables{
    constructor(vb){
        this.variableType = vb.typeName.name
        if (vb.typeName.type == 'UserDefinedTypeName'){
            // Although structs are not user defined types, the antlr4 parser views them as so.
            this.variableType = vb.typeName.namePath
        }
        if(vb.typeName.type == 'Mapping') {
            this.variableType = new Mappings(vb.typeName)
        }

        if(vb.typeName.type == 'ArrayTypeName') {
            this.variableType = getArrayType(vb.typeName)
        }

        this.variableName = vb.name
    }
}

/*    Key Types in mappings currently support:
        elementary types
        user defined types (not structs)
        contract types
        enums.

*/
// The Auxilliary Scanner is currently limited to Elementary Types, Arrays and nested Mappings
class Mappings{
    constructor(mp){
        this.keyType = mp.keyType.name
        this.valueType = mp.valueType.name
        if(mp.valueType.type == 'Mapping') {
            this.valueType = new Mappings(mp.valueType)
        }

        if(mp.valueType.type == 'ArrayTypeName'){
            this.valueType = getArrayType(mp.valueType)
        }
    }
}


export function getArrayType(arrayNode){
    let variableType
    if (arrayNode.length == null) {
        variableType = arrayNode.baseTypeName.name + '[' + ']';
    } else  {
        let temp = arrayNode.length.number
        variableType = arrayNode.baseTypeName.name + '[' + temp + ']';
    }
    return variableType
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

            let paramName = param.identifier.name
            let paramType = param.typeName.name

            if(param.typeName.type == 'ArrayTypeName') {
                paramType = getArrayType(param.typeName);
            }

            if(param.typeName.type == 'UserDefinedTypeName') {
                paramType = param.typeName.namePath;
            }

            this.funcParams.push({
                paramType : paramType,
                paramName : paramName
            })
        });
    }
}

export function getMemberAccess(node){
    return (node.expression.name+'.'+node.memberName)  
}
