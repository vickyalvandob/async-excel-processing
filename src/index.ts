import "dotenv/config";
import "./paths";
import app from "./app/instance";
import { displayAsciiArt } from "$utils/ascii_art.utils";
import { REST_ASCII_ART } from './utils/ascii_art.utils';

function parseArguments(args: string[]): Record<string, string> {
  const parsedArgs: Record<string, string> = {};
  for (let i = 2; i < args.length; i += 2) {
    const argClean = args[i].replace(/^--/, '');
    const argName = argClean.split("=")[0] || '';
    const argValue = argClean.split("=")[1] || '';
    parsedArgs[argName] = argValue;
  }
  return parsedArgs;
}

const parsedArgs = parseArguments(process.argv);

// Untuk development, jalankan langsung listen
const PORT = process.env.PORT || 3000;
if (!parsedArgs["service"] || parsedArgs["service"] === "rest") {
  displayAsciiArt(REST_ASCII_ART);
  app.listen(PORT, () => {
    console.log(`REST API running at http://localhost:${PORT}`);
  });
}
