import { ElementRef, useRef } from 'react';
import { TeamProperties } from '../../../shared/types';
import useGlobalStore from '../../store/global';
import ConnectionStatus from './ConnectionsStatus';
import TeamSettings from './TeamSettings';

type TeamSettingsHandle = ElementRef<typeof TeamSettings>;

const Settings = () => {
  const { homeTeam, awayTeam, saveSettings } = useGlobalStore();
  const homeTeamRef = useRef<TeamSettingsHandle>(null);
  const awayTeamRef = useRef<TeamSettingsHandle>(null);

  window.electron.ipcRenderer.on('config', (arg) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eventData = arg as Record<string, any>;
    try {
      const teamsSettings = JSON.parse(eventData['config']);
      saveSettings(teamsSettings);
      homeTeamRef.current?.setTeamSettings(
        teamsSettings['homeTeam'] as TeamProperties
      );
      awayTeamRef.current?.setTeamSettings(
        teamsSettings['awayTeam'] as TeamProperties
      );
    } catch (err) {
      console.error(err);
    }
  });

  const saveNewSettings = () => {
    if (!homeTeamRef.current || !awayTeamRef.current) return;
    const newSettings = {
      homeTeam: homeTeamRef.current?.getTeamSettings(),
      awayTeam: awayTeamRef.current?.getTeamSettings(),
    };
    saveSettings(newSettings);
    try {
      window.electron.ipcRenderer.sendMessage('saveConfig', [newSettings]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="grid grid-cols-5 w-4/5 m-auto">
      <div className="col-span-2">
        <TeamSettings
          ref={homeTeamRef}
          textColor={homeTeam.textColor}
          backgroundColor={homeTeam.backgroundColor}
          name={homeTeam.name}
        />
      </div>
      <div className="col-span-2">
        <TeamSettings
          ref={awayTeamRef}
          textColor={awayTeam.textColor}
          backgroundColor={awayTeam.backgroundColor}
          name={awayTeam.name}
        />
      </div>
      <div className="col-span-1 flex flex-col justify-between">
        <ConnectionStatus />
        <button
          type="button"
          onClick={saveNewSettings}
          className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
        >
          Zapisz ustawienia
        </button>
      </div>
    </section>
  );
};

export default Settings;
