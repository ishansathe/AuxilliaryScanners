//SPDX-License-Identifier:MIT
pragma solidity 0.8;

contract Test {
    address owner = tx.origin;
    uint a = 0;
    event send(address);

    function doSmth() public{
        uint a;
        bool b;
        if(tx.origin == owner) {
            a++;
        } else {
            a--;
        }
    }

    function requires() public view{
        require(tx.origin == owner, "Just a condition");
        assert(tx.origin != address(0x0));
    }

    function eventer() public {
        emit send(tx.origin);
    }

    function comparer() public{
        require (tx.origin == msg.sender);
    }
}