pragma solidity 0.5.0;

import './SafeMath.sol';
import './ERC20.sol';

contract TokenSCN is ERC20 {

    using SafeMath for uint256;

    string private _name;
    string private _symbol;
    uint8 private _decimals;
    uint256 private _totalSupply;

    mapping (address => uint256) private _balances;

    constructor(string memory name, string memory symbol, uint8 decimals, uint256 totalSupply) public {
        _symbol = symbol;
        _name = name;
        _decimals = decimals;
        _totalSupply = totalSupply;
        _balances[msg.sender] = totalSupply;
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function transfer(address to, uint256 value) public returns (bool) {
        require(to != address(0));
        require(value <= _balances[msg.sender]);
        _balances[msg.sender] = _balances[msg.sender].sub(value);
        _balances[to] = _balances[to].add(value);
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function balanceOf(address owner) public view returns (uint256 balance) {
        return _balances[owner];
    }
}
