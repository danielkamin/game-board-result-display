import { useEffect, useState } from 'react';
import { EGameBoardDisplayChannels } from '../../../shared/enums';
import { NetworkStatus } from '../../../shared/types';
import { WifiIcon } from '../icons';

const ConnectionStatus = () => {
  const [status, setStatus] = useState<NetworkStatus>('NOT_CONNECTED');
  useEffect(() => {
    if (!window.electron?.ipcRenderer) return;
    window.electron.ipcRenderer.on(
      EGameBoardDisplayChannels.currentConnection,
      (arg) => {
        console.log(arg as NetworkStatus);
        setStatus(arg as NetworkStatus);
      }
    );
  }, []);

  const getColorByStatus = (): string => {
    if (status === 'CONNECTED') return 'text-green-700';
    if (status === 'WRONG_NETWORK') return 'text-yellow-500';
    return 'text-red-700';
  };

  return (
    <div>
      <span>Status połączenia z wi-fi:</span>
      <div className="flex gap-4 items-center px-4 py-2 rounded-lg border border-gray-300 bg-white">
        <WifiIcon customClasses={`${getColorByStatus()}`} />
        <span className="font-medium font-xl">{status}</span>
      </div>
    </div>
  );
};
export default ConnectionStatus;
