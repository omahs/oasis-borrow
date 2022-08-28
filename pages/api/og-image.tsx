import { Global } from '@emotion/core'
import { staticFilesRuntimeUrl } from 'helpers/staticPaths'
import { withOGImage } from 'next-api-og-image'
import { theme } from 'theme'
import { ThemeProvider } from 'theme-ui'

import { OgImage } from '../../components/OgImage'
interface QueryParams {
  stage: string
  name: string
}

const FTPolarFontBold = staticFilesRuntimeUrl('/static/fonts/FTPolar/FTPolarTrial-Bold')
const FTPolarFontMedium = staticFilesRuntimeUrl('/static/fonts/FTPolar/FTPolarTrial-Medium')

const globalStyles = `
  html,
  body,
  div#__next {
    height: 100%;
  }

  html {
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow-anchor: none;
    overflow-x: hidden;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  @font-face {
    font-family: 'FT Polar Trial';
    src: url('${FTPolarFontMedium}.woff2') format('woff2'),
        url('${FTPolarFontMedium}.woff') format('woff'),
        url('${FTPolarFontMedium}.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'FT Polar Trial';
    src: url('${FTPolarFontBold}.woff2') format('woff2'),
        url('${FTPolarFontBold}.woff') format('woff'),
        url('${FTPolarFontBold}.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}
`

export default withOGImage<'query', QueryParams>({
  cacheControl: 'public, max-age=604800, immutable',
  dev: {
    inspectHtml: false,
  },
  template: {
    react: ({ name }) => {
      return (
        <ThemeProvider theme={theme}>
          <Global styles={globalStyles} />
          <html>
            <OgImage name={name} />
          </html>
        </ThemeProvider>
      )
    },
  },
})
