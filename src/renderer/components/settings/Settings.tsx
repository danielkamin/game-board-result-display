import { ElementRef, useEffect, useRef } from 'react';
import { TeamProperties } from '../../../shared/types';
import useGlobalStore from '../../store/global';
import TeamSettings from './TeamSettings';
import GeneralSettings from './GeneralSettings';

type TeamSettingsHandle = ElementRef<typeof TeamSettings>;
type GeneralSettingsHandle = ElementRef<typeof GeneralSettings>;

const Settings = () => {
  const { homeTeam, awayTeam, general, saveSettings } = useGlobalStore();
  const homeTeamRef = useRef<TeamSettingsHandle>(null);
  const awayTeamRef = useRef<TeamSettingsHandle>(null);
  const generalSettingsRef = useRef<GeneralSettingsHandle>(null);

  useEffect(() => {
    if (!window.electron?.ipcRenderer) return;
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
  }, []);

  const saveNewSettings = () => {
    if (
      !homeTeamRef.current ||
      !awayTeamRef.current ||
      !generalSettingsRef.current
    )
      return;
    const newSettings = {
      homeTeam: homeTeamRef.current?.getTeamSettings(),
      awayTeam: awayTeamRef.current?.getTeamSettings(),
      general: generalSettingsRef.current?.getGeneralSettings(),
    };
    saveSettings(newSettings);
    try {
      window.electron.ipcRenderer.sendMessage('saveConfig', [newSettings]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="flex gap-4 justify-center m-auto">
      <TeamSettings
        ref={homeTeamRef}
        textColor={homeTeam.textColor}
        backgroundColor={homeTeam.backgroundColor}
        name={homeTeam.name}
      />
      <TeamSettings
        ref={awayTeamRef}
        textColor={awayTeam.textColor}
        backgroundColor={awayTeam.backgroundColor}
        name={awayTeam.name}
      />
      <div className="flex flex-col justify-between">
        <GeneralSettings
          ref={generalSettingsRef}
          teamsNamesFontSize={general.teamsNamesFontSize}
        />
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
