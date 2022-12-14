const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DonateBigBen contract", function () {
  it("it should emit success event after donate complete", async function () {
    const Token = await ethers.getContractFactory("DonateBigBen");
    const hardhatToken = await Token.deploy();
    let amount = ethers.utils.parseEther("0.001");
    await expect(
      hardhatToken.donateMe(amount, {
        value: amount,
        gasLimit: 100000,
      })
    ).to.emit(hardhatToken, "BigBenEvent");
  });

  it("it should reverted with Insufficient donate amount", async function () {
    const Token = await ethers.getContractFactory("DonateBigBen");
    const hardhatToken = await Token.deploy();
    let amount = ethers.utils.parseEther("0.0001");
    await expect(
      hardhatToken.donateMe(amount, {
        value: amount,
        gasLimit: 100000,
      })
    ).to.be.revertedWith("Insufficient donate amount");
  });

  it("it should reverted with Donate failed", async function () {
    const Token = await ethers.getContractFactory("DonateBigBen");
    const hardhatToken = await Token.deploy();
    let amount = ethers.utils.parseEther("0.001");
    await expect(hardhatToken.donateMe(amount)).to.be.revertedWith(
      "Donate failed"
    );
  });
});
