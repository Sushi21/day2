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

    const max_colors = {
        red: 12,
        green: 13,
        blue: 14,
    }

    games = lines.map((line) => line.split(':')[1]);

    const possibleIds = games.map((allsets, index) => {
        const setarray = allsets.split(';');
        let isGameValid = true;

        setarray.forEach((set) => {
            const singleColors = set.split(',');

            const colors = {
                red: 0,
                blue: 0,
                green: 0,
            }

            singleColors.forEach((numberColor) => {
                const [number, color] = numberColor.trim().split(' ');

                colors[color] += Number(number);
            });

            for (let [color, number] of Object.entries(colors)) {
                if (number > max_colors[color]) {
                    isGameValid = false;
                }
            }
        });


        if (isGameValid) {
            return index + 1;
        } else {
            return -1;
        }
    });

    const filteredIds = possibleIds.filter((el) => el !== -1);

    const sum = filteredIds.reduce((a, b) => Number(a) + Number(b));

    console.log(sum);
});