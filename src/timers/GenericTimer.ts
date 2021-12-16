export interface GenericTimer {
  interval: NodeJS.Timeout | null;
  counter: number;
  initializeCounter(): Promise<void>;
  showCounterBox(): Promise<void>;
  start(): void;
  stop(): void;
}
