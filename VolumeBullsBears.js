/*

Description:
    A Tradovate custom volume indicator which attempts to infer the amount of buying and selling pressure within a candle. For a given time slice of an asset, the amount of buying (or bullish) pressure is rendered in green while the amount of selling (or bearish) pressure is rendered in red. The full height of the histogram represents total volume.

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
    description: "Bulls vs Bears",
    calculator: volumeBullsBears,
    tags: [predef.tags.Volumes],
    inputType: meta.InputType.BARS,
    areaChoice: meta.AreaChoice.NEW,
    plots : {
        bears: 'volume',
        bulls: 'bulls',
    },
    plotter: {
        type:'histogram',
        fields: ['bears','bulls']
    },
    schemeStyles: {
        dark: {
            bears: {color: "#F23051"},
            bulls: {color: "#3EB242"}
        }
    }
};
