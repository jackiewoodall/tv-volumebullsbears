# VolumeBullsBears

<img width="70%" alt="sample shot" src="https://user-images.githubusercontent.com/3299770/102228697-9d59b400-3eb0-11eb-9e85-b819787369d0.png">

A [Tradovate](https://www.tradovate.com) custom volume indicator which attempts to infer the amount of buying and selling pressure within a candle. For a given time slice of an asset, the amount of buying (or bullish) pressure is rendered in green while the amount of selling (or bearish) pressure is rendered in red. The full height of the histogram represents total volume. A simple moving average of volume is also plotted in yellow.

Buying and selling pressure is calculated based upon the candle's closing price relative to the full range of the candle (high - low).

# Installation & Setup

These are the steps for finding, installing, and configuring the indicator.

## Install

### TLDR

Click on this link: https://trader.tradovate.com/?shareable=50c636ef-48f2-4995-8a50-65d8c6b87603

To install and then skip to step 4 below.

### Longform

Find and select the indicator from Tradovate's library of "Community Indicators".

1. On a chart, select "Indicators".
1. Select "Explore Community Indicators".

<img width="25%" alt="sample shot" src="https://user-images.githubusercontent.com/3299770/102236788-879cbc80-3eb9-11eb-9bf1-f1771363a77a.png">

3. From the "Community Indicators" dialog box, search for "VolumeBullsBears" and then click "Install".

<img width="50%" alt="sample shot" src="https://user-images.githubusercontent.com/3299770/102302073-daa85b00-3f1d-11eb-9e7c-93fda7ad221c.png">

You will be presented with a message box on where to find the indicator.

4. Find the "Bulls vs Bears" indicator from your library and select it to add it to a chart.

<img width="20%" alt="sample shot" src="https://user-images.githubusercontent.com/3299770/102243900-51633b00-3ec1-11eb-89cc-8dc56df6f6cc.png">

...

<img width="20%" alt="sample shot" src="https://user-images.githubusercontent.com/3299770/102243937-5b853980-3ec1-11eb-805e-e70671524770.png">

You will then be presented with its Settings dialog.

## Settings

<img width="50%" alt="sample shot" src="https://user-images.githubusercontent.com/3299770/102231340-7badfc00-3eb3-11eb-9b40-1b3c40594455.png">

Adjusting the line styles for the _**BEARS**_ and _**BULLS**_ plots have no effect.

_**VOL AVG PERIOD**_: sets the range used for calculating the volume's simple moving average.

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
