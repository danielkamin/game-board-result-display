/* eslint-disable @typescript-eslint/no-explicit-any */
import macOS from '../macos/index';
import windows from '../windows/index';

export default () => {
  let platform: Record<string, any>;
  switch (process.platform) {
    case 'darwin':
      platform = macOS;
      break;
    case 'win32':
      platform = windows;
      break;
    default:
      throw new Error('ERROR : UNRECOGNIZED OS');
  }

  return platform;
};
