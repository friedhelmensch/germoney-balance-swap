pragma solidity >=0.8.0 <0.9.0;
import "./IERC20.sol";

contract Swap {
    mapping(address => uint256) balances;

    mapping(address => mapping(address => uint256)) allowed;

    using SafeMath for uint256;

    constructor(address germoney, address balance) {}
}

library SafeMath {
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}
