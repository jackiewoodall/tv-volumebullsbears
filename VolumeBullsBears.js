/*

Description:
xxx

*/

const predef = require("./tools/predef");
const meta = require("./tools/meta");

class volumeBullsBears {
    map(d) {
        const volume = d.volume();
        const close = d.close();
        const high = d.high();
        const low = d.low();

        const range = high - low;
        const bulls = Math.round(volume * (close - low) / range);

        return {
            bears: volume,
            bulls: bulls,
        };
    }
}

module.exports = {
    name: "volumeBullsBears",
    description: "Bulls & Bears",
    calculator: volumeBullsBears,
    tags: [predef.tags.Volumes],
    inputType: meta.InputType.BARS,
    areaChoice: meta.AreaChoice.NEW,
    plots : {
        bears: 'volume',
        bulls: 'bulls',
    },
    plotter : [
        {
            type: 'histogram',
            fields: ['bears']
        },
        {
            type: 'histogram',
            fields: ['bulls']
        },
    ],
    schemeStyles: {
        dark: {
            bears: {color: "#F23051"},
            bulls: {color: "#3EB242"}
        }
    }
};
