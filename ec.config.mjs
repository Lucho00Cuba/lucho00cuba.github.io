import { defineEcConfig } from 'astro-expressive-code'

import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import { pluginFramesTexts } from '@expressive-code/plugin-frames'

pluginFramesTexts.addLocale('en-US', {
  copyButtonTooltip: 'Click to copy',
  copyButtonCopied: 'Copy successful!'
})

export default defineEcConfig({
  defaultLocale: 'en-US',
  plugins: [ pluginLineNumbers(), pluginCollapsibleSections()],
  themes: ['light-plus','dark-plus'],
  themeCssSelector:() => `.dark`,
  useDarkModeMediaQuery: false,
  defaultProps: {
    overridesByLang: {
      'shell': {
        showLineNumbers: false,
      }
    }
  }
})