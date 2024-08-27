// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StructExample {
    // Define a struct named 'Person'
    struct Person {
        string name;
        uint256 age;
        address wallet;
    }

    // State variable to store a Person struct
    Person public person;

    // Function to set the values of the Person struct
    function setPerson(string memory _name, uint256 _age, address _wallet) public {
        person = Person(_name, _age, _wallet);
    }

    // Function to get the age of the person
    function getPersonAge() public view returns (uint256) {
        return person.age;
    }

    // Function to check if the person is an adult (18 or older)
    function isAdult() public view returns (bool) {
        return person.age >= 18;
    }
}
