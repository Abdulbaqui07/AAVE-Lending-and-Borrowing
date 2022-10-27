pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract WhitelistedToken is Ownable {
    mapping(address => bool) public whitelist;

   /**
   * @dev Reverts if token is not whitelisted. Can be used when extending this contract.
   */
  modifier isWhitelistedToken(address _tokenAddress) {
    require(whitelist[_tokenAddress],"only whitelisted tokens");
    _;
  }

  /**
   * @dev Adds single address to whitelist.
   * @param _tokenAddress Address to be added to the whitelist
   */
  function addTokenToWhitelist(address _tokenAddress) external onlyOwner {
    whitelist[_tokenAddress] = true;
  }

  /**
   * @dev Adds list of addresses to whitelist. Not overloaded due to limitations with truffle testing.
   * @param _tokenAddresses Addresses to be added to the whitelist
   */
  function addManyToWhitelist(address[] calldata _tokenAddresses) external onlyOwner {
    for (uint256 i = 0; i < _tokenAddresses.length; i++) {
      whitelist[_tokenAddresses[i]] = true;
    }
  }

  /**
   * @dev Removes single address from whitelist.
   * @param _tokenAddress Address to be removed to the whitelist
   */
  function removeFromWhitelist(address _tokenAddress) external onlyOwner {
    whitelist[_tokenAddress] = false;
  }

}