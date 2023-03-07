import currentPlatform from './utils/currentPlatform';
import executeCommand from './utils/executeCommand';

const networkCommand = (cmd: string) => {
  const { command, parse } = currentPlatform()[cmd];
  return executeCommand(command()).then(parse);
};

export default {
  getCurrentConnections: networkCommand('getCurrentConnections'),
};
