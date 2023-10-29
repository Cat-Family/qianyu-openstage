import { SettingsTabsEnum } from '../enums/settingsTabs.enum';

export type TabsDataType = {
  group?: boolean;
  title: string;
  value?: SettingsTabsEnum;
  icon?: React.ReactNode;
  element?: React.ReactNode;
}[];
