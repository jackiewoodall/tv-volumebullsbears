// VolumeBullsBears v1.3 2021-06-01 JackieW

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
const defaultLineWidthPx    = 3;

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

        // use bid/offer volumes
        //const bulls = d.offerVolume();
        //const bears = d.bidVolume();

        return {
            volume: volume,
            bears: bears,
            bulls: bulls,
            volAvg: this.smaAlgo(volume)
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
    params: {
        volAvgPeriod: predef.paramSpecs.period(defaultVolAvgPeriod),
    },
    plots : {
        volume: {displayOnly:true},
        bears: 'bears',
        bulls: 'bulls',
        volAvg: {title:'VolAvg'},
        
    },
    plotter: [
        {
            type:'histogram',
            fields: ['volume', 'bears','bulls']
        },
        predef.plotters.singleline("volAvg")
    ],
    schemeStyles: {
        dark: {
            volume: {color: defaultBearColor},
            bears: {color: defaultBearColor},
            bulls: {color: defaultBullColor},
            volAvg: {color: defaultVolAvgColor},
        }
    },
};
