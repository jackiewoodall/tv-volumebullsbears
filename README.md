# VolumeBullsBears

<img width="50%" alt="sample shot" src="https://user-images.githubusercontent.com/3299770/102059028-f98bdd80-3db5-11eb-87e1-629a7f66e074.png">

A [Tradovate](https://www.tradovate.com) custom volume indicator which attempts to infer the amount of buying and selling pressure within a candle. For a given time slice of an asset, the amount of buying (or bullish) pressure is rendered in green while the amount of selling (or bearish) pressure is rendered in red. The full height of the histogram represents total volume.

# Installation & Setup

_TBA_

# Details

**Bull** and **Bear** volume is a guestimation based upon the close of the candle relative to the total range of the candle. That is, this is **not** by any means a direct reflection of the actual number of units bought and sold.

It is important to understand the underlying formulas used for calculating what percentage of total volume compose of bulls and bears. These formulas use the corresponding price candle's high, low, and closing prices:

    %bulls = (close - low) / (high - low)
    %bears = (high - close) / (high - low)

The actual meaning of these numbers and how they can be best used for interpreting price action is left as a judgement call by the user.

# Known Issues

See the [issues](/../../issues) page.

# Acknowledgements

This is a collaborative product of the [TheoTrade](https://theotrade.com/) Futures community.
