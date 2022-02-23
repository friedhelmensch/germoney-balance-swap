const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("Germoney-Balance-Swap", function () {
  let swapContract;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("Swap", function () {
    it("Should deploy Swap", async function () {
      const Swap = await ethers.getContractFactory("Swap");

      const germoney = await (
        await ethers.getContractFactory("Germoney")
      ).deploy();

      const balance = await (
        await ethers.getContractFactory("Balance")
      ).deploy();

      swapContract = await Swap.deploy(germoney.address, balance.address);
    });

    describe("setPurpose()", function () {
      it("Should be able to set a new purpose", async function () {
        const newPurpose = "Test Purpose";

        await swapContract.swap(newPurpose);
        expect(await swapContract.purpose()).to.equal(newPurpose);
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
