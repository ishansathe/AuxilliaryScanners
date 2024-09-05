// SPDX-License-Identifier: MIT
pragma solidity >0.8.0 <0.9.0;

//The idea of this contract is that it will send only 100 wei as a beginner bonus
//Once the wei has been sent, it will not be possible to get it again.

contract Vulnerable {
    struct Person {
        string name;
        uint256 age;
        address wallet;
    }
    Person public person;
    mapping (address => bool) public sentOnce;
    mapping(address => mapping (uint => bool)) nest;

    uint [3] public a;
    mapping(uint => uint[]) public c;
    // Detection of Array types currently not supported.

    function doCall(address payable _to) public{
        require(sentOnce[_to] == false, "100 wei have already been sent once!");

        (bool sent, ) = _to.call{value:100 wei} ("Sending 100 wei to you :)");
        if(sent){
            sentOnce[_to] = true;
        }
    }

    receive() external payable { }
}