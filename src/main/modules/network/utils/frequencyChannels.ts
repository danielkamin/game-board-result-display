const channels: Record<number, string> = {};
// cf [wlan channels frequency](https://en.wikipedia.org/wiki/List_of_WLAN_channels)
let frequency = 2412;
for (let i = 1; i < 15; i += 1) {
  channels[i] = frequency.toString();
  frequency += 5;
}

frequency = 5180;
for (let j = 36; j <= 64; j += 2) {
  channels[j] = frequency.toString();
  frequency += 10;
}

frequency = 5500;
for (let k = 100; k <= 144; k += 2) {
  channels[k] = frequency.toString();
  frequency += 10;
}

frequency = 5745;
for (let l = 149; l <= 161; l += 2) {
  channels[l] = frequency.toString();
  frequency += 10;
}

frequency = 5825;
for (let m = 165; m <= 173; m += 4) {
  channels[m] = frequency.toString();
  frequency += 20;
}

const getFrequencyFromChannel = (channel: string) =>
  channels[parseInt(channel, 10)];

export default getFrequencyFromChannel;
