#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
});

const lines = [];

rl.on('line', (line) => {
    lines.push(line);
});

rl.on('close', () => {
    let games = [];

    games = lines.map((line) => line.split(':')[1]);

    const mininumColors = games.map((allsets, index) => {
        const setarray = allsets.split(';');

        const colorsMax = {
            red: 0,
            blue: 0,
            green: 0,
        };

        setarray.forEach((set) => {
            const singleColors = set.split(',');

            const colors = {
                red: 0,
                blue: 0,
                green: 0,
            };

            singleColors.forEach((numberColor) => {
                const [number, color] = numberColor.trim().split(' ');

                colors[color] += Number(number);
            });

            for (let [color, number] of Object.entries(colors)) {
                if (number > colorsMax[color]) {
                    colorsMax[color] = number;
                }
            }
        });

        return colorsMax;
    });

    const SumOfPowers = mininumColors
        .map((colors) => {
            const power = Object.values(colors).reduce((a, b) => a * b);

            return power;
        })
        .reduce((a, b) => a + b);

    console.log(SumOfPowers);
});