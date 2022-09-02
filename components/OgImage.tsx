import { Global } from '@emotion/core'
import { globalStyles } from 'pages/_app'
import { theme } from 'theme'
import { Box, Text, ThemeProvider } from 'theme-ui'

interface Props {
  people: string
  amount: string
}
const pathTransform: React.CSSProperties = {
  transform: 'scale(1, -1) translateY(-60%)',
}

const logo =
  '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'

export function OgImage({ people, amount }: Props) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <html>
          <Box
            sx={{
              right: 0,
              zIndex: -1,
              overflow: 'hidden',
              backgroundColor: 'white',
              '&::after': {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                content: '""',
                background: 'white',
                opacity: 1,

                animationDuration: '0.4s',
                animationDelay: '0.1s',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards',
              },
              '&::before': {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                content: '""',
                background: 'white',
                opacity: 0.3,
              },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                userSelect: 'none',
                pointerEvents: 'none',
                overflow: 'hidden',
                maxHeight: 'calc(100vh + 300px)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1882"
                height="1517"
                fill="none"
                viewBox="0 0 1882 1517"
              >
                <circle cx="1387" cy="619.782" r="379" fill="url(#paint0_radial)"></circle>
                <g filter="url(#filter0_f)">
                  <circle cx="533" cy="617.782" r="379" fill="url(#paint1_radial)"></circle>
                </g>
                <g filter="url(#filter1_f)">
                  <circle cx="1025" cy="447.782" r="379" fill="url(#paint2_radial)"></circle>
                </g>
                <circle cx="979.001" cy="603.783" r="379" fill="url(#paint3_radial)"></circle>
                <g
                  style={{ mixBlendMode: 'overlay', transform: 'translateY(250px)' }}
                  filter="url(#filter2_b)"
                  opacity="0.3"
                >
                  <path
                    style={pathTransform}
                    className="layerTop"
                    fill="url(#paint4_linear)"
                    d="M1882 557.283c0 195.785-614 530.497-873 354.499-259-176-873-158.714-873-354.499 0-195.785 425-588.5 873-354.5 362 294 873 158.715 873 354.5z"
                  ></path>
                </g>
                <g
                  style={{ mixBlendMode: 'overlay', transform: 'translateY(250px)' }}
                  filter="url(#filter3_b)"
                  opacity="0.3"
                >
                  <path
                    style={pathTransform}
                    className="layerMiddle"
                    fill="url(#paint5_linear)"
                    d="M1641 612.783c0 195.694-105.19 119.921-386.59 149.907C760.813 815.289 26.996 636.749 54.766 303.404c0-195.695 368.411-266.377 768.293-54.475C1254.43 546.791 1641 417.089 1641 612.783z"
                  ></path>
                </g>
                <g
                  style={{ mixBlendMode: 'overlay', transform: 'translateY(250px)' }}
                  filter="url(#filter4_b)"
                  opacity="0.3"
                >
                  <path
                    style={pathTransform}
                    className="layerBottom"
                    fill="url(#paint6_linear)"
                    d="M214.428 402.902C56.491 218.35-80.869-16.385 57.428.902c231.148 28.893 288 352 553 338 171.167-9.043 550.432 9.149 885.002 135.881 132 50 229.91 108 197.57 226s-615-77.881-803-23c-209.013 61.015-561-141-675.572-274.881z"
                  ></path>
                </g>
                <defs>
                  <filter
                    id="filter0_f"
                    width="798"
                    height="798"
                    x="134"
                    y="218.782"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                    <feGaussianBlur
                      result="effect1_foregroundBlur"
                      stdDeviation="10"
                    ></feGaussianBlur>
                  </filter>
                  <filter
                    id="filter1_f"
                    width="798"
                    height="798"
                    x="626.001"
                    y="48.782"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                    <feGaussianBlur
                      result="effect1_foregroundBlur"
                      stdDeviation="10"
                    ></feGaussianBlur>
                  </filter>
                  <filter
                    id="filter2_b"
                    width="1866"
                    height="950.739"
                    x="76"
                    y="70.565"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feGaussianBlur in="BackgroundImage" stdDeviation="30"></feGaussianBlur>
                    <feComposite
                      in2="SourceAlpha"
                      operator="in"
                      result="effect1_backgroundBlur"
                    ></feComposite>
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_backgroundBlur"
                      result="shape"
                    ></feBlend>
                  </filter>
                  <filter
                    id="filter3_b"
                    width="1707"
                    height="772"
                    x="-6"
                    y="59.783"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feGaussianBlur in="BackgroundImage" stdDeviation="30"></feGaussianBlur>
                    <feComposite
                      in2="SourceAlpha"
                      operator="in"
                      result="effect1_backgroundBlur"
                    ></feComposite>
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_backgroundBlur"
                      result="shape"
                    ></feBlend>
                  </filter>
                  <filter
                    id="filter4_b"
                    width="1818.78"
                    height="859.31"
                    x="-59.563"
                    y="-60"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feGaussianBlur in="BackgroundImage" stdDeviation="30"></feGaussianBlur>
                    <feComposite
                      in2="SourceAlpha"
                      operator="in"
                      result="effect1_backgroundBlur"
                    ></feComposite>
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_backgroundBlur"
                      result="shape"
                    ></feBlend>
                  </filter>
                  <radialGradient
                    id="paint0_radial"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientTransform="matrix(0 379 -379 0 1387 619.782)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#BFFFF0"></stop>
                    <stop offset="1" stopColor="#FEFFC7" stopOpacity="0"></stop>
                  </radialGradient>
                  <radialGradient
                    id="paint1_radial"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientTransform="matrix(0 379 -379 0 533 617.782)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#EAE2FF"></stop>
                    <stop offset="1" stopColor="#FFC8CE" stopOpacity="0"></stop>
                  </radialGradient>
                  <radialGradient
                    id="paint2_radial"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientTransform="matrix(0 379 -379 0 1025 447.782)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#EAE2FF"></stop>
                    <stop offset="1" stopColor="#FFC8CE" stopOpacity="0"></stop>
                  </radialGradient>
                  <radialGradient
                    id="paint3_radial"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientTransform="matrix(0 379 -379 0 979.001 603.783)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FFF8E0"></stop>
                    <stop offset="1" stopColor="#D3EFFF" stopOpacity="0"></stop>
                  </radialGradient>
                  <linearGradient
                    id="paint4_linear"
                    x1="479.479"
                    x2="1671.58"
                    y1="295.749"
                    y2="941.718"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#141414"></stop>
                    <stop offset="1"></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint5_linear"
                    x1="372.709"
                    x2="1281.03"
                    y1="41.991"
                    y2="738.34"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#141414"></stop>
                    <stop offset="1"></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint6_linear"
                    x1="229"
                    x2="1617"
                    y1="206.783"
                    y2="656.783"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#141414"></stop>
                    <stop offset="1" stopOpacity="0.57"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </Box>
          </Box>
          <Box sx={{ mb: 2, zIndex: 1, position: 'absolute', top: 50, left: 50 }}>
            <img src={`data:image/png;base64,${logo}`} />
            <Text
              variant="boldParagraph1"
              sx={{
                fontWeight: 'semiBold',
                fontSize: 6,
                color: 'neutral80',
                lineHeight: 'loose',
                mt: 150,
              }}
            >
              <span style={{ color: '#25273D' }}> I've referred:</span> {people} people
            </Text>
            <Text
              variant="boldParagraph1"
              sx={{
                fontWeight: 'semiBold',
                fontSize: 6,
                color: 'neutral80',
                lineHeight: 'loose',
              }}
            >
              <span style={{ color: '#25273D' }}>and earned:</span> {amount} DAI
            </Text>
            <Text
              variant="boldParagraph1"
              sx={{
                fontWeight: 'semiBold',
                fontSize: 6,
                color: 'neutral80',
                lineHeight: 'loose',
              }}
            >
              <span style={{ color: '#25273D' }}>use my referral link and earn with me,</span> or
              whatever.
            </Text>
          </Box>
        </html>
      </ThemeProvider>
    </>
  )
}
