import path from 'path';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ScoreBoardConfig } from '../../shared/types';

type GlobalState = {
  saveSettings: (config: ScoreBoardConfig) => void;
} & ScoreBoardConfig;

const useGlobalStore = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        homeTeam: {
          name: 'Żubry Białystok',
          textColor: '#FFFFFF',
          backgroundColor: '#CE4D11',
        },
        awayTeam: {
          name: '--------- ---------',
          textColor: '#18181b',
          backgroundColor: '#FFFFFF',
        },
        saveSettings: (config) => set(() => config),
      }),
      {
        name: 'global-storage',
        getStorage: () => sessionStorage,
      }
    )
  )
);

export default useGlobalStore;
