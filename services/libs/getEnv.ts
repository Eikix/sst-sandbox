export const getEnv = (envKey: string): string => {
  const envValue = process.env[envKey];
  if (envValue === undefined) {
    throw new Error(`process.env.${envKey} is undefined`);
  }
  return envValue;
};
