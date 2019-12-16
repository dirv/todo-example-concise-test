import svelte from "../node_modules/svelte/compiler.js";
import { URL, pathToFileURL } from 'url';
import path from "path";
import fs from "fs";
import os from "os";
const baseURL = pathToFileURL(process.cwd()).href;

const resolveSvelte = filename => {
  const code = fs.readFileSync(filename, "utf-8");
  const result = svelte.compile(code, {
    filename,
    css: false,
    accessors: true,
    dev: true,
    format: 'esm'
  })
  return result.js.code;
};

const writeFile = async (content) => {
  // TODO: get a random file name
  const filePath = path.resolve("./src/test.js");
  console.log(filePath);
  await fs.promises.writeFile(filePath, content, 'utf8');
  return {
    url: `file://${filePath}`,
    format: "module"
  }
}

/*export async function dynamicInstantiate(url) {
  try{
  const ext = path.extname(new URL(url).pathname);
  if (ext === '.svelte') {
    const result = resolveSvelte(new URL(url).pathname);
    console.log(Object.keys(result))

    return {
      exports: Object.keys(result.code.js),
      execute: (exports) => {
        Object.keys(result).forEach(x => {
          exports[x] = result.x;
        })
      }
    }
  }
  }catch (e) {
    console.log(e);
  }
}*/

export const resolve = async (specifier, parentModuleURL = baseURL, defaultResolver) => {
  const resolved = new URL(specifier, parentModuleURL);
  try{
  const ext = path.extname(resolved.pathname);
  if (ext === '.svelte') {
    const content = resolveSvelte(resolved.pathname);
    return await writeFile(content);

    /*return {
      url: `file:///${resolved.pathname}`,
      format: 'dynamic'
    };*/
  }
  } catch {}
  console.log(specifier);
  console.log(parentModuleURL);
  return defaultResolver(specifier, parentModuleURL);
}
