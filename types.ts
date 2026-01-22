
export enum InputType {
  TEXT = 'text',
  URL = 'url'
}

export enum QRSize {
  SMALL = 128,
  MEDIUM = 256,
  LARGE = 512
}

export interface QRSettings {
  fgColor: string;
  bgColor: string;
  size: QRSize;
  includeMargin: boolean;
}

export interface AppState {
  inputType: InputType;
  value: string;
  settings: QRSettings;
  isDarkMode: boolean;
  error: string | null;
}
