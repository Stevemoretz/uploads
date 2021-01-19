let limits = {
  1:[],
  2:[],
  3:[],
  4:[],
  5:[],
  6:[],
};

let chosenSpots = {
  1 : -1,
  2 : -1,
  3 : -1,
  4 : -1,
  5 : -1,
  6 : -1,
};

const defineLimits = () => {
    limits = {
        1:[],
        2:[],
        3:[],
        4:[],
        5:[],
        6:[],
    };
    for(let i in chosenSpots){
        i = parseInt(i);
        const j = chosenSpots[i];
        if(j >= 1){
            limits = {...limits,
                [i] : [1, 2, 3, 4, 5, 6].filter((item) => item !== j),
            };
            for(const limit of [1, 2, 3, 4, 5, 6].filter((item) => item !== i)){
                limits = {...limits,
                    [limit] : [...limits[limit],j,...[1, 2, 3, 4, 5, 6].filter((item) => item !== j).filter(rItem => Math.abs(j - rItem) === Math.abs(i - limit))]
                };
            }
        }
    }
};

const draw = () => {
    console.log(' --------------------- drawing solution...');
    for(let i = 1; i <= 6; i++){
        console.log(' _  _  _  _  _  _ ');
        console.log(`|${chosenSpots[1] == i ? '◉' : (limits[1].indexOf(i) !== -1 ? ' ' : ' ')}||${chosenSpots[2] == i ? '◉' : (limits[2].indexOf(i) !== -1 ? ' ' : ' ')}||${chosenSpots[3] == i ? '◉' : (limits[3].indexOf(i) !== -1 ? ' ' : ' ')}||${chosenSpots[4] == i ? '◉' : (limits[4].indexOf(i) !== -1 ? ' ' : ' ')}||${chosenSpots[5] == i ? '◉' : (limits[5].indexOf(i) !== -1 ? ' ' : ' ')}||${chosenSpots[6] == i ? '◉' : (limits[6].indexOf(i) !== -1 ? ' ' : ' ')}|`);
        console.log(' ¯  ¯  ¯  ¯  ¯  ¯ ');
    }
};

const calculate = (iInit = 1,jInit = 1) => {
    for(let i = iInit; i <= 6; i++){
        for(let j = jInit; j <= 6; j++){
            if(limits[i].indexOf(j) === -1){
                chosenSpots = {...chosenSpots,[i] : j};
                defineLimits();
                break;
            }
            if(j === 6){
                if(i-1 > 0){
                    const chosenSpotOld = chosenSpots[i - 1];
                    chosenSpots[i] = -1;
                    chosenSpots[i-1] = -1;
                    defineLimits();
                    limits[i-1] = [...limits[i-1],...[1, 2, 3, 4, 5, 6].filter((item) => item <= chosenSpotOld)];
                    calculate(i-1);
                }
                return;
            }
        }
        if(i === 6){
            draw();
            const chosenSpotOld = chosenSpots[i];
            chosenSpots[i] = -1;
            limits[i] = [...limits[i],...[1, 2, 3, 4, 5, 6].filter((item) => item <= chosenSpotOld)];
            calculate(i);
        }
    }
};

calculate();