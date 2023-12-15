"use strict";

const fs = require("fs");
const readline = require("readline");
const path = require("node:path");
const filepath = path.resolve("input.txt");
const file = readline.createInterface({ input: fs.createReadStream(filepath) });

let sum = 0;
file
  .on("line", (line) => {
    const [game, results] = line.split(":");
    const colors = ["red", "green", "blue"];
    const values = results.split(";").map((val) => {
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
    const minSet = {};
    for (let color of colors) {
      minSet[color] = 0;
    }
    for (let round of values) {
      for (let color of colors) {
        if (round[color] > minSet[color]) {
          minSet[color] = round[color];
        }
      }
    }
    sum += minSet["red"] * minSet["green"] * minSet["blue"];
  })
  .on("close", () => {
    console.log(sum);
  });
