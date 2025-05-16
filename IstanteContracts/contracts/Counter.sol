// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title Simple Counter contract
contract Counter {
    uint256 public count;

    /// @notice Increment the count by 1
    function increment() public {
        count += 1;
    }

    /// @notice Decrement the count by 1
    function decrement() public {
        require(count > 0, "Counter is already 0");
        count -= 1;
    }

    /// @notice Get current count
    function get() public view returns (uint256) {
        return count;
    }
}