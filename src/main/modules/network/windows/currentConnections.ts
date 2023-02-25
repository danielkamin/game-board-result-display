/* eslint-disable prefer-destructuring */
import { execFile } from 'node:child_process';

import env from '../shellEnv';
import { frequencyFromChannel, dBFromQuality } from '../utils';

function parseShowInterfaces(stdout: string) {
  const lines = stdout.split('\r\n');
  const connections = [];
  let i = 3;
  while (lines.length > i + 18) {
    const tmpConnection: Record<string, string> = {};
    const fields = [
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
      frequency: parseInt(frequencyFromChannel(tmpConnection.channel), 10),
      signal_level: dBFromQuality(tmpConnection.signal),
      quality: parseFloat(tmpConnection.signal),
      security: tmpConnection.authentication,
      security_flags: tmpConnection.encryption,
    });

    i += 18;
  }
  return connections;
}

const getCurrentConnection = () => {
  execFile('netsh', ['wlan', 'show', 'interfaces'], { env }, (err, stdout) => {
    if (err) {
      console.error(err);
    } else {
      try {
        const connections = parseShowInterfaces(stdout);
        console.log(connections);
      } catch (parseError) {
        console.error(parseError);
      }
    }
  });
};

export default getCurrentConnection;
