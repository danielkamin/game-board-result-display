import { useCallback, useState } from 'react';
import { NetworkStatus } from '../../../shared/types';
import { WifiIcon } from '../icons';

const ConnectionStatus = () => {
  const [status, setStatus] = useState<NetworkStatus>('NOT_CONNECTED');
  window.electron.ipcRenderer.on('config', (arg) => {
    const eventData = arg as Record<string, any>;
    setStatus(eventData['networkStatus'] as NetworkStatus);
  });

  const getColorByStatus = (): string => {
    if (status === 'CONNECTED') return 'text-green-700';
    else if (status === 'WRONG_NETWORK') return 'text-yellow-500';
    else return 'text-red-700';
  };

  return (
    <div className="flex gap-4 items-center">
      <WifiIcon customClasses={`w-12 h-12 ${getColorByStatus()}`} />
      <span className="font-medium font-xl">{status}</span>
    </div>
  );
};
export default ConnectionStatus;
