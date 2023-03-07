/* eslint-disable @typescript-eslint/no-explicit-any */
import { percentageFromDB } from '../utils/dBHelpers';
import getFrequencyFromChannel from '../utils/frequencyChannels';

const command = () => ({
  cmd: '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport',
  args: ['--getinfo'],
});

const agrCtlRSSIRegex = /[ ]*agrCtlRSSI: (.*)/;
const BSSIDRegex = /[ ]*BSSID: ([0-9A-Fa-f:]*)/;
const SSIDRegex = /[ ]*SSID: (.*)/;
const securityRegex = /[ ]*link auth: (.*)/;
const channelRegex = /[ ]*channel: (.*)/;

const formatMacAddress = (mac: string) =>
  mac
    .split(':')
    .map((part) => (part.length === 1 ? `0${part}` : part))
    .join(':');

const parse = (stdout: string) => {
  const lines = stdout.split('\n');

  const connections: any[] = [];
  let connection: any = {};
  lines.forEach((line) => {
    const matchAgrCtlRSSI = line.match(agrCtlRSSIRegex);
    if (matchAgrCtlRSSI) {
      connection.signal_level = parseInt(matchAgrCtlRSSI[1], 10);
      connection.quality = percentageFromDB(connection.signal_level);
      return;
    }

    const matchBSSID = line.match(BSSIDRegex);
    if (matchBSSID) {
      connection.bssid = formatMacAddress(matchBSSID[1]);
      connection.mac = connection.bssid; // for retrocompatibility
      return;
    }

    const matchSSID = line.match(SSIDRegex);
    if (matchSSID) {
      [, connection.ssid] = matchSSID;
      return;
    }

    const matchSecurity = line.match(securityRegex);
    if (matchSecurity) {
      [, connection.security] = matchSecurity;
      connection.security_flags = [];
      return;
    }

    const matchChannel = line.match(channelRegex);
    if (matchChannel) {
      [, connection.channel] = matchChannel;
      connection.frequency = getFrequencyFromChannel(connection.channel);
      connections.push(connection);
      connection = {};
    }
  });

  return connections;
};

export default { command, parse };
