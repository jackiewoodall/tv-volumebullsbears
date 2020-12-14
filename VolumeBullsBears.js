/*

Description:
    A Tradovate custom volume indicator which attempts to infer the amount of buying and selling pressure within a candle. For a given time slice of an asset, the amount of buying (or bullish) pressure is rendered in green while the amount of selling (or bearish) pressure is rendered in red. The full height of the histogram represents total volume.

*/

const predef = require("./tools/predef");
const meta = require("./tools/meta");
const p = require("./tools/plotting");

class volumeBullsBears {
    map(d) {
        const volume = d.volume();
        const close = d.close();
        const high = d.high();
        const low = d.low();

        const range = high - low;
        const bulls = Math.round(volume * (close - low) / range);
        const bears = Math.round(volume * (high - close) / range);

        return {
            volume: volume,
            bears: bears,
            bulls: bulls,
        };
    }
}

function dualHistoPlotter(canvas, indicatorInstance, history) {
    for(let i=0; i<history.data.length; ++i) {
        const item = history.get(i);
        const bears = item.bears;
        const bulls = item.bulls;
        
        if (bears !== undefined && bulls !== undefined) {
            const x = p.x.get(item);
            
            if (bulls > 0) {
                canvas.drawLine(
                    p.offset(x, 0),
                    p.offset(x, bulls),
                    {
                        color: "#3EB242",
                        relativeWidth: 0.5,
                        opacity: 1.0
                    });
            }
            if (bears > 0) {
                canvas.drawLine(
                    p.offset(x, bulls),
                    p.offset(x, bulls + bears),
                    {
                        color: "#F23051",
                        relativeWidth: 0.5,
                        opacity: 1.0
                    });
            }
        }
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
        bears: 'bears',
        bulls: 'bulls',
    },
    plotter: predef.plotters.custom(dualHistoPlotter),
    schemeStyles: {
        dark: {
            bears: {color: "#F23051"},
            bulls: {color: "#3EB242"}
        }
    },
    scaler: predef.scalers.multiPath(["volume"])
};
