// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC1155, Ownable {
    constructor(
        string memory uri
    ) ERC1155(uri) {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
}x
