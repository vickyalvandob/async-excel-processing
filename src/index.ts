import "dotenv/config";
import "./paths";
import app from "./app/instance";
import { displayAsciiArt } from "$utils/ascii_art.utils";
import { REST_ASCII_ART } from './utils/ascii_art.utils';

function parseArguments(args: string[]): Record<string, string> {
  const parsedArgs: Record<string, string> = {};

  for (let i = 2; i < args.length; i += 2) {
    const argClean = args[i].replace(/^--/, ''); // Remove leading --
    const argName = argClean.split("=")[0] || '';
    const argValue = argClean.split("=")[1] || '';
    parsedArgs[argName] = argValue;
  }

  return parsedArgs;
}

const parsedArgs = parseArguments(process.argv);

if (parsedArgs["service"] == "rest") {
  displayAsciiArt(REST_ASCII_ART)
  app.restApp()
}