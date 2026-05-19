import { existsSync, readFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

function readEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return {};
  }

  return Object.fromEntries(
    readFileSync(filePath, 'utf8')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const separatorIndex = line.indexOf('=');
        const key = line.slice(0, separatorIndex).trim();
        const rawValue = line.slice(separatorIndex + 1).trim();
        const value =
          (rawValue.startsWith('"') && rawValue.endsWith('"')) ||
          (rawValue.startsWith("'") && rawValue.endsWith("'"))
            ? rawValue.slice(1, -1)
            : rawValue;
        return [key, value];
      }),
  );
}

const sanityConfigHome = '/private/tmp/black-opal-sanity-config';
const sanityCliConfigPath = path.join(sanityConfigHome, 'sanity', 'config.json');

function readSanityAuthToken() {
  const configPath = sanityCliConfigPath;

  if (!existsSync(configPath)) {
    return undefined;
  }

  try {
    return JSON.parse(readFileSync(configPath, 'utf8')).authToken;
  } catch {
    return undefined;
  }
}

const env = {
  ...readEnvFile(path.resolve('.env')),
  ...readEnvFile(path.resolve('.env.local')),
  ...process.env,
  SANITY_AUTH_TOKEN: process.env.SANITY_AUTH_TOKEN || readSanityAuthToken(),
  SANITY_CLI_CONFIG_PATH: process.env.SANITY_CLI_CONFIG_PATH || sanityCliConfigPath,
  XDG_CONFIG_HOME: sanityConfigHome,
};

function normalizeStudioHost(value) {
  if (!value) {
    return undefined;
  }

  const hostname = value.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  return hostname.endsWith('.sanity.studio') ? hostname.slice(0, -'.sanity.studio'.length) : hostname;
}

function hasUrlFlag(args) {
  return args.some((arg) => arg === '--url' || arg.startsWith('--url='));
}

const args = process.argv.slice(2);
const studioHost = normalizeStudioHost(env.SANITY_STUDIO_HOSTNAME);

if (args[0] === 'deploy' && studioHost && !hasUrlFlag(args)) {
  args.push('--url', studioHost);
}

const sanityBin = path.resolve('node_modules/.bin/sanity');
const child = spawn(sanityBin, args, {
  env,
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
