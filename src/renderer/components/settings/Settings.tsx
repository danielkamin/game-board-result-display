import { ElementRef, useEffect, useRef } from 'react';
import useGlobalStore from '../../store/global';
import ConnectionStatus from './ConnectionsStatus';
import TeamSettings from './TeamSettings';

type TeamSettingsHandle = ElementRef<typeof TeamSettings>;

const Settings = () => {
  const { homeTeam, awayTeam, saveSettings } = useGlobalStore();
  const homeTeamRef = useRef<TeamSettingsHandle>(null);
  const awayTeamRef = useRef<TeamSettingsHandle>(null);

  const saveNewSettings = () => {
    if (!homeTeamRef.current || !awayTeamRef.current) return;
    //save to file
    saveSettings({
      homeTeam: homeTeamRef.current?.getTeamSettings(),
      awayTeam: awayTeamRef.current?.getTeamSettings(),
    });
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
