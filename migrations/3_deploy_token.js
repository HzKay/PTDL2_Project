const TokenSCN = artifacts.require("TokenSCN");

module.exports = function(deployer) {
  deployer.deploy(TokenSCN, "Token Social Network", "SCN", 0, 1000);
};