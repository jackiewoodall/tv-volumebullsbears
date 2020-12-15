// VolumeBullsBears v0.9 2020-12-14 JackieW

// Description:
//      A Tradovate custom volume indicator which attempts to infer the amount of buying 
//      and selling pressure within a candle. For a given time slice of an asset, the amount 
//      of buying (or bullish) pressure is rendered in green while the amount of selling (or 
//      bearish) pressure is rendered in red. The full height of the histogram represents 
//      total volume. An simple moving average volume line is also plotted in yellow.

const predef = require("./tools/predef");
const meta = require("./tools/meta");
const p = require("./tools/plotting");
const SMA = require("./tools/SMA");

const defaultBearColor      = "#F23051";
const defaultBullColor      = "#3EB242";
const defaultVolAvgColor    = "yellow";
const defaultVolAvgPeriod   = 20;

class volumeBullsBears {
    init() {
        this.smaAlgo = SMA(this.props.volAvgPeriod);
    }
    
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
            volAvg: this.smaAlgo(volume)
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
                    p.offset(x, bulls - 1),
                    {
                        color: defaultBullColor,
                        relativeWidth: 0.5,
                        opacity: 1.0
                    });
            }
            if (bears > 0) {
                canvas.drawLine(
                    p.offset(x, bulls),
                    p.offset(x, bulls + bears - 1),
                    {
                        color: defaultBearColor,
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
    params: {
        volAvgPeriod: predef.paramSpecs.period(defaultVolAvgPeriod),
    },
    plots : {
        bears: 'bears',
        bulls: 'bulls',
        volAvg: {title:'VolAvg'},
        
    },
    plotter: [
        predef.plotters.custom(dualHistoPlotter),
        predef.plotters.singleline("volAvg")
    ],
    schemeStyles: {
        dark: {
            bears: {color: defaultBearColor},
            bulls: {color: defaultBullColor},
            volAvg: {color: defaultVolAvgColor},
        }
    },
    scaler: predef.scalers.multiPath(["volume","volAvg"])
};
