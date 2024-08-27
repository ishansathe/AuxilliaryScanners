// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PrivateFunctionExample {
    uint256 public total;

    // Public function that calls the private function
    function addToTotal(uint256 _value) public {
        _add(_value);
    }

    // Private function that updates the 'total' state variable
    function _add(uint256 _value) private {
        total += _value;
    }
}
