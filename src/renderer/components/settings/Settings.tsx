import { ElementRef, useCallback, useEffect, useRef } from 'react';
import {
  TeamProperties,
  GeneralSettingsProperties,
} from '../../../shared/types';
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
  const handleSettingsUpdate = useCallback((arg: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eventData = arg as Record<string, any>;
    try {
      const settings = JSON.parse(eventData['config']);
      saveSettings(settings);
      homeTeamRef.current?.setTeamSettings(
        settings['homeTeam'] as TeamProperties
      );
      awayTeamRef.current?.setTeamSettings(
        settings['awayTeam'] as TeamProperties
      );
      generalSettingsRef.current?.setGeneralSettings(
        settings['general'] as GeneralSettingsProperties
      );
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    if (!window.electron?.ipcRenderer) return;
    window.electron.ipcRenderer.on('config', handleSettingsUpdate);
    // eslint-disable-next-line consistent-return
    return () => {
      if (window.electron?.ipcRenderer) {
        window.electron.ipcRenderer.removeListener(
          'config',
          handleSettingsUpdate
        );
      }
    };
  }, [handleSettingsUpdate]);

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
    console.log(newSettings);
    saveSettings(newSettings);
    try {
      window.electron.ipcRenderer.sendMessage('saveConfig', [newSettings]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="flex flex-col gap-4 justify-center m-auto">
      <TeamSettings
        ref={homeTeamRef}
        textColor={homeTeam.textColor}
        backgroundColor={homeTeam.backgroundColor}
        imageUrl={homeTeam.imageUrl}
        name={homeTeam.name}
        description={homeTeam.description}
      />
      <TeamSettings
        ref={awayTeamRef}
        textColor={awayTeam.textColor}
        backgroundColor={awayTeam.backgroundColor}
        imageUrl={awayTeam.imageUrl}
        name={awayTeam.name}
        description={awayTeam.description}
      />
      <div className="flex justify-between items-end">
        <GeneralSettings
          ref={generalSettingsRef}
          teamsNamesFontSize={general.teamsNamesFontSize}
          gameDescription={general.gameDescription}
        />
      </div>
      <div className="flex justify-between items-end">
        <button
          type="button"
          onClick={saveNewSettings}
          className="border h-10 p-2 border-indigo-500 bg-indigo-500 text-white rounded-md transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
        >
          Zapisz ustawienia
        </button>
      </div>
    </section>
  );
};

export default Settings;
