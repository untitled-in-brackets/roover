export interface Args {
  src: string;
  preload?: 'auto' | 'metadata' | 'none';
  autoplay?: boolean;
  volume?: number;
  rate?: number;
  mute?: boolean;
  loop?: boolean;
}

export type ReturnArgs = {
  initial: boolean;
  loading: boolean;
  ready: boolean;
  idle: boolean;
  playing: boolean;
  paused: boolean;
  end: boolean;
  volume: number;
  rate: number;
  duration: number;
  mute: boolean;
  loop: boolean;
  error: string | null;
  getCurrentTime: () => number;
  toggle: () => void;
  play: () => void;
  pause: () => void;
  setVolume: (value: number) => void;
  setRate: (value: string) => void;
  toggleMute: () => void;
  toggleLoop: () => void;
  seekTo: (value: number) => void;
  skipForward: (value: number) => void;
  skipBackward: (value: number) => void;
};
