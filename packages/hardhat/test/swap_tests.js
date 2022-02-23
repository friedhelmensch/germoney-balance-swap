const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("Germoney-Balance-Swap", function () {
  let swap;
  let germoney;
  let balance;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("Swap", function () {
    it("Should deploy Swap", async function () {
      germoney = await (await ethers.getContractFactory("Germoney")).deploy();
      balance = await (await ethers.getContractFactory("Balance")).deploy();
      swap = await (
        await ethers.getContractFactory("Swap")
      ).deploy(germoney.address, balance.address);
    });

    describe("send Balance to swap ", function () {
      it("should have Balance tokens", async function () {
        await balance.transfer(swap.address, 50);
        const swapBalanceTokens = await balance.balanceOf(swap.address);
        expect(swapBalanceTokens).to.equal(50);
      });

      // Uncomment the event and emit lines in YourContract.sol to make this test pass

      /*it("Should emit a SetPurpose event ", async function () {
        const [owner] = await ethers.getSigners();

        const newPurpose = "Another Test Purpose";

        expect(await myContract.setPurpose(newPurpose)).to.
          emit(myContract, "SetPurpose").
            withArgs(owner.address, newPurpose);
      });*/
    });
  });
});
