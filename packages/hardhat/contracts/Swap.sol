pragma solidity >=0.8.0 <0.9.0;
import "./IERC20.sol";

contract Swap {
    mapping(address => uint256) balances;

    mapping(address => mapping(address => uint256)) allowed;

    using SafeMath for uint256;

    IERC20 public germoney;
    IERC20 public balance;

    constructor(address germoneyAddress, address balanceAddress) {
        germoney = IERC20(germoneyAddress);
        balance = IERC20(balanceAddress);
    }

    function swap(uint256 amount) public returns (bool) {
        balance.transfer(msg.sender, amount);
        return true;
    }

    function uint2str(uint256 _i) internal pure returns (string memory str) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0) {
            bstr[--k] = bytes1(uint8(48 + (j % 10)));
            j /= 10;
        }
        str = string(bstr);
    }
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
