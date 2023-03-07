/* eslint-disable prefer-destructuring */
import os from 'os';
import { dBFromPercentage } from '../utils/dBHelpers';
import getFrequencyFromChannel from '../utils/frequencyChannels';

const command = () => ({
  cmd: 'netsh',
  args: ['wlan', 'show', 'interfaces'],
});

const isWin11 = () => {
  const winMajor = os.release().split('.')[0];
  const winMinor = os.release().split('.')[1];
  const winBuild = os.release().split('.')[2];
  return (
    parseInt(winMajor, 10) >= 10 &&
    parseInt(winMinor, 10) >= 0 &&
    parseInt(winBuild, 10) >= 22000
  );
};

const parse = (stdout: string) => {
  const lines = stdout.split('\r\n');
  const connections = [];
  const numberOfLines = isWin11() ? 20 : 18;
  let i = 3;
  while (lines.length > i + numberOfLines) {
    const tmpConnection: Record<string, string> = {};
    const fields = isWin11()
      ? [
          'name',
          'description',
          'guid',
          'mac',
          'ifaceType',
          'state',
          'ssid',
          'bssid',
          'mode',
          'radio',
          'authentication',
          'encryption',
          'connection',
          'band',
          'channel',
          'reception',
          'transmission',
          'signal',
          'profile',
        ]
      : [
          'name',
          'description',
          'guid',
          'mac',
          'state',
          'ssid',
          'bssid',
          'mode',
          'radio',
          'authentication',
          'encryption',
          'connection',
          'channel',
          'reception',
          'transmission',
          'signal',
          'profile',
        ];
    for (let j = 0; j < fields.length; j += i) {
      const lineMatch = lines[i + j].match(/.*: (.*)/);
      if (lineMatch) tmpConnection[fields[j]] = lineMatch[1];
    }

    connections.push({
      iface: tmpConnection.name,
      ssid: tmpConnection.ssid,
      bssid: tmpConnection.bssid,
      mac: tmpConnection.bssid,
      mode: tmpConnection.mode,
      channel: parseInt(tmpConnection.channel, 10),
      frequency: parseInt(getFrequencyFromChannel(tmpConnection.channel), 10),
      signal_level: dBFromPercentage(tmpConnection.signal),
      quality: parseFloat(tmpConnection.signal),
      security: tmpConnection.authentication,
      security_flags: tmpConnection.encryption,
    });

    i += numberOfLines;
  }
  return connections;
};

export default { command, parse };
