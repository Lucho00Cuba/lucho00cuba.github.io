import fs from 'fs';
import path from 'path';
import { DEFAULT_FRONTMATTER } from '@/config'

export const readFileSync = (filePath: string) => {
  const _filePath = path.resolve(filePath);
  return fs.readFileSync(_filePath, 'utf-8');
}

export const readFileWeb = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return await res.text();
};

// <Markdown render set:html={readFileSync('./md/about.md')}/>
// <Markdown render set:html={await readFileWeb('https://raw.githubusercontent.com/lucho00cuba/lucho00cuba/main/README.md')}/>

export const titleColor2gcTextstyleVars = (titleColor?: string) => {
  if (!titleColor) titleColor = DEFAULT_FRONTMATTER.titleColor
  let [lightColorsStr, darkColorsStr = lightColorsStr] = titleColor?.split('|')
  lightColorsStr = lightColorsStr.includes(',') ? lightColorsStr : lightColorsStr + ',' + lightColorsStr
  darkColorsStr = darkColorsStr.includes(',') ? darkColorsStr : darkColorsStr + ',' + darkColorsStr
  return `--gc-text-bgimg:linear-gradient(to right,${lightColorsStr}); --gc-text-bgimg-dark:linear-gradient(to right,${darkColorsStr});`
}

export const ensureTitleIcon = (titleIcon?:string) => {
  if (!titleIcon) titleIcon = DEFAULT_FRONTMATTER.titleIcon
  let [ lightIcon, darkIcon = lightIcon ] = titleIcon?.split('|')
  return { light: lightIcon, dark: darkIcon }
}