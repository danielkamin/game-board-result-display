import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { ScoreBoardConfig } from '../../shared/types';

type GlobalState = {
  saveSettings: (config: ScoreBoardConfig) => void;
} & ScoreBoardConfig;

const useGlobalStore = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        homeTeam: {
          name: 'ŻUB',
          textColor: '#FFFFFF',
          backgroundColor: '#000',
          imageUrl: '',
          description: {
            title: '',
            subTitle: '',
          },
        },
        awayTeam: {
          name: '---------- ------------',
          textColor: '#000',
          backgroundColor: '#FFFFFF',
          imageUrl: '',
          description: {
            title: '',
            subTitle: '',
          },
        },
        general: {
          teamsNamesFontSize: 24,
          gameDescription: {
            title: '',
            subTitle: '',
          },
        },
        saveSettings: (config) => set(() => config),
      }),
      {
        name: 'global-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useGlobalStore;
