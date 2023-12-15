"use strict";

const fs = require("fs");
const readline = require("readline");
const path = require("node:path");
const filepath = path.resolve("input.txt");
const file = readline.createInterface({ input: fs.createReadStream(filepath) });

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

function areAllLessThan(nums, max) {
  for (num of nums) {
    if (num > max) {
      return false;
    }
  }
  return true;
}

function findNumOfColor(color) {}

let sum = 0;
file
  .on("line", (line) => {
    const [game, results] = line.split(":");
    const id = parseInt(game.match(/\d+/)[0]);
    const values = results.split(";").map((val) => {
      const colors = ["red", "green", "blue"];
      const obj = {};
      for (let color of colors) {
        const re = new RegExp(`(\\d+) ${color}`);
        if (re.test(val)) {
          obj[color] = parseInt(val.match(re)[1]);
        } else {
          obj[color] = 0;
        }
      }
      return obj;
    });
    let possible = true;
    for (let round of values) {
      if (
        round["red"] > maxRed ||
        round["green"] > maxGreen ||
        round["blue"] > maxBlue
      ) {
        possible = false;
        break;
      }
    }
    if (possible) {
      sum += id;
    }
  })
  .on("close", () => {
    console.log(sum);
  });
