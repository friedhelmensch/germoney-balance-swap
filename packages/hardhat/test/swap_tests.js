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

    describe("swap", function () {
      it("should send balance to swapper", async function () {
        const [owner, alice, bob] = await ethers.getSigners();

        await balance.transfer(swap.address, 100);
        await germoney.transfer(alice.address, 100);

        const aliceBalanceTokens = await balance.balanceOf(alice.address);
        expect(aliceBalanceTokens).to.equal(0);

        const aliceGermoneyTokens = await germoney.balanceOf(alice.address);
        expect(aliceGermoneyTokens).to.equal(100);

        germoney = germoney.connect(alice);
        germoney.approve(swap.address, 50);
        swap = swap.connect(alice);
        await swap.swap(50);

        const aliceBalanceTokensAfterSwap = await balance.balanceOf(
          alice.address
        );
        expect(aliceBalanceTokensAfterSwap).to.equal(50);

        const aliceGermoneyTokensAfterSwap = await germoney.balanceOf(
          alice.address
        );
        expect(aliceGermoneyTokensAfterSwap).to.equal(50);
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
