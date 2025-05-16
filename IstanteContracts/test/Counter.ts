import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter", function () {
  it("should start with zero", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.deployed();

    expect(await counter.get()).to.equal(0);
  });

  it("should increment correctly", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.deployed();

    await counter.increment();
    expect(await counter.get()).to.equal(1);
  });

  it("should decrement correctly", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.deployed();

    await counter.increment();
    await counter.decrement();
    expect(await counter.get()).to.equal(0);
  });

  it("should fail to decrement below zero", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.deployed();

    await expect(counter.decrement()).to.be.revertedWith("Counter is already 0");
  });
});