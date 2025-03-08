/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { percentageFromDB } from '../utils/dBHelpers';
import getFrequencyFromChannel from '../utils/frequencyChannels';

const command = () => ({
  cmd: '/usr/bin/wdutil',
  args: ['info'],
});

// Updated regex patterns for wdutil output format
const signalStrengthRegex = /RSSI: (-\d+)/;
const BSSIDRegex = /BSSID: ([0-9A-Fa-f:]+)/;
const SSIDRegex = /SSID: "(.*?)"/;
const securityRegex = /Security: ([^\n]+)/;
const channelRegex = /Channel: (\d+)(?: \(.*?\))?/;

const formatMacAddress = (mac: string) =>
  mac
    .split(':')
    .map((part) => (part.length === 1 ? `0${part}` : part))
    .join(':');

const parse = (stdout: string) => {
  // Split the output into sections - wdutil provides info about multiple interfaces
  const sections = stdout.split('Interface:');
  const connections: any[] = [];

  sections.forEach((section) => {
    // Skip empty sections or sections without WiFi info
    if (!section.includes('SSID:')) {
      return;
    }

    const connection: any = {};

    // Extract signal strength
    const matchSignal = section.match(signalStrengthRegex);
    if (matchSignal) {
      connection.signal_level = parseInt(matchSignal[1], 10);
      connection.quality = percentageFromDB(connection.signal_level);
    }

    // Extract BSSID (MAC address)
    const matchBSSID = section.match(BSSIDRegex);
    if (matchBSSID) {
      connection.bssid = formatMacAddress(matchBSSID[1]);
      connection.mac = connection.bssid; // for retrocompatibility
    }

    // Extract SSID
    const matchSSID = section.match(SSIDRegex);
    if (matchSSID) {
      connection.ssid = matchSSID[1];
    }

    // Extract security information
    const matchSecurity = section.match(securityRegex);
    if (matchSecurity) {
      connection.security = matchSecurity[1];
      connection.security_flags = []; // Maintained for compatibility
    }

    // Extract channel information
    const matchChannel = section.match(channelRegex);
    if (matchChannel) {
      connection.channel = matchChannel[1];
      connection.frequency = getFrequencyFromChannel(connection.channel);
    }

    // Only add connections that have the essential information
    if (connection.ssid && connection.bssid) {
      connections.push(connection);
    }
  });
  return connections;
};

export default { command, parse };
