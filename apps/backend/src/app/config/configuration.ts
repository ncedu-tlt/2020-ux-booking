export interface AppConfig {
  port: number;
}

export const configuration = (): AppConfig => ({
  port: +process.env.PORT || 3333
});
