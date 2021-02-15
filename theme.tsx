// @ts-ignore
import { icons } from '@makerdao/dai-ui-icons'
// @ts-ignore
import { icons as brandingIcons } from '@makerdao/dai-ui-icons-branding'
// @ts-ignore
// import oasisBaseTheme from '@makerdao/dai-ui-theme-casual'
import React from 'react'
// @ts-ignore

const customIcons = {
  arrow_down: {
    path: (
      <path
        d="M8.5498 0.727272H6.61088V12.4503L2.129 7.96839L0.80158 9.31072L7.58034 16.0895L14.374 9.31072L13.0168 7.96839L8.5498 12.4503V0.727272Z"
        fill="currentColor"
      />
    ),
    viewBox: '0 0 15 17',
  },
  arrow_up: {
    path: (
      <path
        d="M10.1007 22.7273H12.5346L12.5346 10.4677L17.182 15.1151L18.8482 13.4325L11.3176 5.90199L3.77077 13.4325L5.46964 15.1151L10.1007 10.4677L10.1007 22.7273Z"
        fill="currentColor"
      />
    ),
    viewBox: '0 0 28 28',
  },
  arrow_up_thin: {
    path: (
      <path
        d="M6.4502 16.2727H8.38912L8.38912 4.54972L12.871 9.03161L14.1984 7.68928L7.41966 0.910511L0.625977 7.68928L1.98322 9.03161L6.4502 4.54972L6.4502 16.2727Z"
        fill="currentColor"
      />
    ),
    viewBox: '0 0 15 17',
  },
  arrow_left: {
    path: (
      <path
        d="M12.1587 22.6768L13.7773 21.0581L5.26514 12.5649H28.9165V10.2988H5.26514L13.7773 1.80566L12.1587 0.206055L0.961426 11.4414L12.1587 22.6768Z"
        fill="currentColor"
      />
    ),
    viewBox: '0 0 29 23',
  },
  maker_circle_color: {
    path: (
      <>
        <circle cx="22.5" cy="22.5" r="22.5" fill="url(#paint0_linear)" />
        <path
          d="M11.4254 29.25V18.6604L19.4562 24.7039V29.25H21.5066V24.2776C21.5066 23.9018 21.33 23.5479 21.0297 23.3219L11.2903 15.9926C10.502 15.3994 9.375 15.9617 9.375 16.9482V29.25H11.4254Z"
          fill="white"
        />
        <path
          d="M33.636 29.25V18.6604L25.6053 24.7039V29.25H23.5549V24.2776C23.5549 23.9018 23.7315 23.5479 24.0317 23.3219L33.7712 15.9926C34.5594 15.3994 35.6864 15.9617 35.6864 16.9482V29.25H33.636Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="22.5"
            y1="2.45869e-08"
            x2="22.5"
            y2="45"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4FA89B" />
            <stop offset="1" stopColor="#6ACEBB" />
          </linearGradient>
        </defs>
      </>
    ),
    viewBox: '0 0 45 45',
  },
  ether_circle_color: {
    path: (
      <>
        <path
          d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
          fill="#627EEA"
        />
        <path
          d="M22.6848 5.5V17.6962L32.9931 22.3025L22.6848 5.5Z"
          fill="white"
          fillOpacity="0.602"
        />
        <path d="M22.6847 5.5L12.375 22.3025L22.6847 17.6962V5.5Z" fill="white" />
        <path
          d="M22.6848 30.206V38.4931L33 24.222L22.6848 30.206Z"
          fill="white"
          fillOpacity="0.602"
        />
        <path d="M22.6847 38.4931V30.2046L12.375 24.222L22.6847 38.4931Z" fill="white" />
        <path
          d="M22.6848 28.2878L32.9931 22.3025L22.6848 17.699V28.2878Z"
          fill="white"
          fillOpacity="0.2"
        />
        <path
          d="M12.375 22.3025L22.6847 28.2878V17.699L12.375 22.3025Z"
          fill="white"
          fillOpacity="0.602"
        />
      </>
    ),
    viewBox: '0 0 44 44',
  },
  wyre: {
    path: (
      <>
        <path
          d="M12.0321 9.99683H18.0743L14.8068 18.0968C14.338 19.2478 13.234 20 12.0049 20H5.9624L9.22959 11.9256C9.69834 10.7746 10.8024 9.99745 12.0318 9.99745"
          fill="#A9CAFF"
        />
        <path
          d="M7.73755 15.5567H11.0932C12.3222 15.5567 12.7138 15.5077 13.7385 14.6027L18.0666 9.94019H12.0322C10.8029 9.94019 9.69567 10.7167 9.23005 11.8677L7.73755 15.5567Z"
          fill="#0408E0"
        />
        <path
          d="M10.0137 5.05469H16.0559L12.7884 13.1084C12.3196 14.2594 11.2156 14.9459 9.98652 14.9459H3.94434L7.21152 6.93656C7.68027 5.78563 8.78433 5.05469 10.0137 5.05469"
          fill="#0384FF"
        />
        <path
          d="M5.68652 10.6429H9.07902C10.3081 10.6429 10.7 10.4763 11.7243 9.57161L16.0415 5.02661H10.0137C8.78465 5.02661 7.67715 5.75567 7.21152 6.90661L5.68652 10.6429Z"
          fill="#0408E0"
        />
        <path
          d="M7.99509 0H14.0376L10.7701 8.12C10.3013 9.27094 9.19727 9.99812 7.96821 9.99812H1.92603L5.19321 1.94813C5.65884 0.7975 6.76571 0 7.99509 0Z"
          fill="#004EFF"
        />
      </>
    ),
    viewBox: '0 0 20 20',
  },
  moonpay: {
    path: (
      <>
        <path
          d="M-0.000143051 18.9883C-0.000143051 27.279 6.7091 34 14.9854 34C23.2616 34 29.9709 27.279 29.9709 18.9883C29.9709 10.6975 23.2616 3.97656 14.9854 3.97656C6.7091 3.97656 -0.000143051 10.6975 -0.000143051 18.9883Z"
          fill="black"
        />
        <path
          d="M27.7887 4.07566C27.7887 6.32658 29.6103 8.15132 31.8573 8.15132C34.1043 8.15132 35.9259 6.32658 35.9259 4.07566C35.9259 1.82473 34.1043 0 31.8573 0C29.6103 0 27.7887 1.82473 27.7887 4.07566Z"
          fill="black"
        />
      </>
    ),
    viewBox: '0 0 36 34',
  },
  latamex: {
    path: (
      <>
        <path
          className="st0"
          fill="#3C2FED"
          d="M122.1,117.9H79.2c-1.8,0-3.5-1.2-4-2.9l-14-44.6c-0.7-2.2,0.5-4.6,2.8-5.3c2.2-0.7,4.6,0.5,5.3,2.8 l13.1,41.7h39.8c2.3,0,4.2,1.9,4.2,4.2S124.4,117.9,122.1,117.9z"
        />
        <path
          className="st0"
          fill="#3C2FED"
          d="M47,73L47,73H23.8c-2.3,0-4.2-1.9-4.2-4.2c0-2.3,1.9-4.2,4.2-4.2l0,0H47c2.3,0,4.2,1.9,4.2,4.2 C51.2,71.1,49.3,73,47,73z"
        />
        <path
          className="st0"
          fill="#3C2FED"
          d="M53.3,95.5L53.3,95.5H23.8c-2.3,0-4.2-1.9-4.2-4.2c0-2.3,1.9-4.2,4.2-4.2l0,0h29.5c2.3,0,4.2,1.9,4.2,4.2 C57.5,93.6,55.6,95.5,53.3,95.5z"
        />
        <path
          className="st0"
          fill="#3C2FED"
          d="M61,117.9L61,117.9H37.8c-2.3,0-4.2-1.9-4.2-4.2s1.9-4.2,4.2-4.2l0,0H61c2.3,0,4.2,1.9,4.2,4.2 S63.3,117.9,61,117.9z"
        />
        <path
          className="st1"
          fill="#3386FF"
          d="M94.9,95.1c-1.8,0-3.5-1.1-4-2.9L77.8,50.5H37.8c-2.3,0-4.2-1.9-4.2-4.2c0-2.3,1.9-4.2,4.2-4.2h42.9 c1.8,0,3.5,1.2,4,2.9l14,44.6c0.7,2.2-0.5,4.6-2.8,5.3C95.6,95.1,95.2,95.1,94.9,95.1z"
        />
        <path
          className="st1"
          fill="#3386FF"
          d="M136.2,95.5L136.2,95.5H113c-2.3,0-4.2-1.9-4.2-4.2c0-2.3,1.9-4.2,4.2-4.2l0,0h23.2c2.3,0,4.2,1.9,4.2,4.2 C140.4,93.6,138.4,95.5,136.2,95.5z"
        />
        <path
          className="st1"
          fill="#3386FF"
          d="M136.2,73h-29.5c-2.3,0-4.2-1.9-4.2-4.2s1.9-4.2,4.2-4.2h29.5c2.3,0,4.2,1.9,4.2,4.2S138.4,73,136.2,73z"
        />
        <path
          className="st1"
          fill="#3386FF"
          d="M122.1,50.5H98.9c-2.3,0-4.2-1.9-4.2-4.2c0-2.3,1.9-4.2,4.2-4.2h23.2c2.3,0,4.2,1.9,4.2,4.2 C126.4,48.6,124.4,50.5,122.1,50.5z"
        />
      </>
    ),
    viewBox: '20 10 140 140',
  },
  sign_transaction: {
    path: (
      <>
        <path
          d="M4.13215 13.4287L1.57348 10.8701C1.49143 10.789 1.38864 10.732 1.27636 10.7054C1.16408 10.6788 1.04666 10.6836 0.936939 10.7193C0.827221 10.755 0.729446 10.8203 0.654324 10.9078C0.579202 10.9954 0.52963 11.102 0.511039 11.2158L0.0081076 14.2712C-0.00658072 14.3617 -0.00126543 14.4544 0.0236804 14.5427C0.0486262 14.631 0.0925977 14.7128 0.152508 14.7823C0.212418 14.8518 0.286814 14.9073 0.370473 14.945C0.454132 14.9827 0.545026 15.0016 0.636772 15.0004H0.737358L3.79267 14.4975C3.90789 14.4798 4.01594 14.4305 4.10475 14.355C4.19357 14.2796 4.25964 14.1809 4.2956 14.07C4.33067 13.9585 4.33395 13.8394 4.30507 13.7261C4.2762 13.6128 4.21632 13.5099 4.13215 13.4287ZM1.0454 13.9568L1.32202 12.2783L2.72394 13.6802L1.0454 13.9568Z"
          fill="#FDC134"
        />
        <path
          d="M14.8286 2.74392L12.2735 0.182518C12.2147 0.12419 12.1449 0.078044 12.0683 0.0467254C11.9916 0.0154067 11.9095 -0.000468339 11.8267 1.05189e-05C11.6616 0.000705697 11.5033 0.0662518 11.3861 0.182518L0.687401 10.8812C0.629073 10.94 0.582927 11.0098 0.551608 11.0865C0.52029 11.1631 0.504414 11.2452 0.504893 11.3281C0.505589 11.4932 0.571135 11.6514 0.687401 11.7686L3.2488 14.33C3.36671 14.4472 3.52622 14.513 3.69248 14.513C3.85874 14.513 4.01825 14.4472 4.13616 14.33L14.8349 3.63128C14.9513 3.51254 15.0159 3.35256 15.0147 3.1863C15.0136 3.02004 14.9466 2.861 14.8286 2.74392ZM12.5944 4.09699L10.9204 2.42296L11.8267 1.523L13.4944 3.19075L12.5944 4.09699Z"
          fill="#F08B04"
        />
      </>
    ),
    viewBox: '0 0 16 15',
  },
  close_squared: {
    path: (
      <path
        d="M13.0024 11.328L24.328 0L26 1.67437L14.672 13.0024L26 24.328L24.328 26L13 14.672L1.67437 26L0.00236504 24.328L11.3304 13L0 1.67437L1.67437 0.0023649L13.0024 11.3304V11.328Z"
        fill="currentColor"
      />
    ),
    viewBox: '0 0 26 26',
  },
  send: {
    path: (
      <path
        d="M6.39837 6.51154L6.88762 11.6236L11.142 12.9691C11.2651 13.0083 11.3968 13.0103 11.5209 12.9746C11.645 12.9389 11.7561 12.8671 11.8403 12.7683C11.9245 12.6694 11.9781 12.5477 11.9946 12.4182C12.0111 12.2888 11.9896 12.1573 11.9329 12.0401L6.56854 0.836288C6.51675 0.72892 6.43617 0.638428 6.33599 0.575125C6.23581 0.511823 6.12006 0.478257 6.00193 0.478257C5.88381 0.478257 5.76805 0.511823 5.66787 0.575125C5.56769 0.638428 5.48712 0.72892 5.43533 0.836288L0.0670611 12.0323C0.0103649 12.1495 -0.0110763 12.281 0.00539415 12.4104C0.0218646 12.5399 0.0755228 12.6615 0.159721 12.7604C0.243918 12.8593 0.354956 12.9311 0.479075 12.9668C0.603194 13.0024 0.73494 13.0005 0.857991 12.9612L5.11238 11.6158L5.60163 6.5135C5.61136 6.414 5.65733 6.32172 5.7306 6.25459C5.80387 6.18746 5.8992 6.15028 5.99807 6.15028C6.09693 6.15028 6.19227 6.18746 6.26553 6.25459C6.3388 6.32172 6.38477 6.414 6.3945 6.5135L6.39837 6.51154Z"
        fill="currentColor"
      />
    ),
    viewBox: '0 0 12 13',
  },
  receive: {
    path: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5714 9.71429H12.1429V7.28571H9.71429V9.71429H7.28571V12.1429H9.71429V14.5714H7.28571H4.85714V12.1429V9.71429H2.42857H0V7.28571V4.85714V2.42857V0H2.42857H4.85714H7.28571H9.71429V2.42857V4.85714H12.1429V2.42857H14.5714V4.85714H17V7.28571V9.71429V12.1429H14.5714V9.71429ZM2.42857 2.42857V4.85714V7.28571H4.85714H7.28571V4.85714V2.42857H4.85714H2.42857ZM14.5714 0H17V2.42857H14.5714V0ZM9.71429 9.71429H12.1429V12.1429H9.71429V9.71429ZM0 12.1429H2.42857V14.5714H0V12.1429ZM2.42857 14.5714H4.85714V17H2.42857V14.5714ZM14.5714 14.5714H17V17H14.5714V14.5714ZM9.71429 14.5714H12.1429V17H9.71429V14.5714ZM3.64286 3.64286H6.07143V6.07143H3.64286V3.64286Z"
        fill="currentColor"
      />
    ),
    viewBox: '0 0 17 17',
  },
  copy: {
    path: (
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 5C3 3.89543 3.89543 3 5 3H12C13.1046 3 14 3.89543 14 5V14C14 15.1046 13.1046 16 12 16H5C3.89543 16 3 15.1046 3 14V5ZM12 5H5V14H12V5Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 2C0 0.89543 0.895431 0 2 0H10V2L2 2V12H0V2Z"
          fill="currentColor"
        />
      </>
    ),
    viewBox: '0 0 14 16',
  },
  magic_link: {
    path: (
      <>
        <path
          d="M9.64115 0C10.6473 1.23181 11.7569 2.3758 12.957 3.4186C12.1574 6.01093 11.7268 8.76527 11.7268 11.62C11.7268 14.4747 12.1574 17.2291 12.957 19.8216C11.7569 20.8644 10.6473 22.0083 9.64115 23.24C8.63487 22.0083 7.52522 20.8644 6.3252 19.8216C7.12475 17.2291 7.5552 14.4747 7.5552 11.62C7.5552 8.76527 7.12475 6.01093 6.3252 3.4186C7.52522 2.3758 8.63487 1.23181 9.64115 0Z"
          fill="#6851FF"
        />
        <path
          d="M4.03193 18.0252C2.76175 17.1353 1.41371 16.3487 0 15.678C0.39213 14.3932 0.603028 13.0293 0.603028 11.6161C0.603028 10.203 0.39213 8.83923 0 7.55426C1.41371 6.88351 2.76175 6.09693 4.03193 5.20703C4.51768 7.26452 4.77463 9.41036 4.77463 11.6161C4.77463 13.8219 4.51768 15.9677 4.03193 18.0252Z"
          fill="#6851FF"
        />
        <path
          d="M14.5078 11.6161C14.5078 13.8219 14.7649 15.9677 15.2507 18.0252C16.5208 17.1353 17.8689 16.3487 19.2826 15.678C18.8905 14.3932 18.6796 13.0293 18.6796 11.6161C18.6796 10.203 18.8905 8.83923 19.2826 7.55426C17.8689 6.88351 16.5208 6.09693 15.2507 5.20703C14.7649 7.26452 14.5078 9.41036 14.5078 11.6161Z"
          fill="#6851FF"
        />
        <path
          d="M34.297 15.8522H36.281V6.60156H33.5061L31.2586 12.3711L29.0109 6.60156H26.2499V15.8522H28.22V9.19513L30.8284 15.8522H31.6886L34.297 9.19513V15.8522Z"
          fill="black"
        />
        <path
          d="M42.102 15.8515H43.8642V11.5243C43.8642 9.59653 42.4628 8.98633 40.9366 8.98633C39.8821 8.98633 38.8276 9.31915 38.0091 10.0404L38.675 11.2193C39.2439 10.6922 39.9098 10.4287 40.6313 10.4287C41.5193 10.4287 42.102 10.8725 42.102 11.5521V12.4814C41.658 11.9404 40.8672 11.663 39.9792 11.663C38.9109 11.663 37.6483 12.2316 37.6483 13.7989C37.6483 15.2967 38.9109 16.018 39.9792 16.018C40.8533 16.018 41.6442 15.6989 42.102 15.158V15.8515ZM42.102 14.2426C41.8106 14.6311 41.2557 14.8252 40.6868 14.8252C39.9931 14.8252 39.4242 14.4646 39.4242 13.8405C39.4242 13.2025 39.9931 12.8281 40.6868 12.8281C41.2557 12.8281 41.8106 13.0222 42.102 13.4105V14.2426Z"
          fill="black"
        />
        <path
          d="M45.4725 17.5712C46.305 18.3064 47.2068 18.5698 48.3584 18.5698C50.0094 18.5698 51.9796 17.9457 51.9796 15.3939V9.15282H50.2038V10.0126C49.6625 9.33305 48.9412 8.98633 48.1363 8.98633C46.4438 8.98633 45.1812 10.2067 45.1812 12.3981C45.1812 14.6311 46.4575 15.8099 48.1363 15.8099C48.9551 15.8099 49.6764 15.4215 50.2038 14.7559V15.4354C50.2038 16.753 49.2047 17.1275 48.3584 17.1275C47.512 17.1275 46.8044 16.8917 46.2633 16.2954L45.4725 17.5712ZM50.2038 13.4799C49.9124 13.9098 49.2741 14.2426 48.6913 14.2426C47.6925 14.2426 46.9987 13.5492 46.9987 12.3981C46.9987 11.2469 47.6925 10.5535 48.6913 10.5535C49.2741 10.5535 49.9124 10.8725 50.2038 11.3163V13.4799Z"
          fill="black"
        />
        <path
          d="M54.6012 8.16674C55.1839 8.16674 55.6557 7.69507 55.6557 7.11267C55.6557 6.53011 55.1839 6.05859 54.6012 6.05859C54.0324 6.05859 53.5468 6.53011 53.5468 7.11267C53.5468 7.69507 54.0324 8.16674 54.6012 8.16674ZM53.7271 15.8501H55.4892V9.15147H53.7271V15.8501Z"
          fill="black"
        />
        <path
          d="M56.8071 12.4951C56.8071 14.5617 58.2916 16.018 60.359 16.018C61.7326 16.018 62.565 15.4215 63.0091 14.7974L61.8574 13.7296C61.5383 14.1733 61.0527 14.4507 60.4421 14.4507C59.3739 14.4507 58.6247 13.6602 58.6247 12.4951C58.6247 11.3302 59.3739 10.5535 60.4421 10.5535C61.0527 10.5535 61.5383 10.8171 61.8574 11.2747L63.0091 10.2067C62.565 9.58263 61.7326 8.98633 60.359 8.98633C58.2916 8.98633 56.8071 10.4426 56.8071 12.4951Z"
          fill="black"
        />
      </>
    ),
    viewBox: '0 0 64 24',
  },
  close_cookie: {
    path: (
      <path
        d="M8.00146 6.97108L14.9711 0L16 1.03038L9.02892 8.00146L16 14.9711L14.9711 16L8 9.02892L1.03038 16L0.00145541 14.9711L6.97253 8L0 1.03038L1.03038 0.00145532L8.00146 6.97253V6.97108Z"
        fill="currentColor"
      />
    ),
    viewBox: '0 0 16 16',
  },
  usdc: {
    path: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M256 128C256 198.692 198.692 256 128 256C57.3075 256 0 198.692 0 128C0 57.3075 57.3075 0 128 0C198.692 0 256 57.3075 256 128ZM98.8 220.8C101.6 221.7 104 220 104 217V209.4C104 207.4 102.5 205.1 100.6 204.4C69.9 193.2 48 163.8 48 129.3C48 94.9 69.9 65.4 100.6 54.1C102.5 53.4 104 51.1 104 49.1V41.6C104 38.6 101.7 36.9 98.8 37.8C60 50.2 32 86.5 32 129.3C32 172.2 60 208.4 98.8 220.8ZM132 193.3C134.2 193.3 136 191.5 136 189.3H136.1V176.5C152.6 173.9 163.2 162.4 163.2 148.2C163.2 129.5 151.8 123.2 129.8 120.2C113.5 117.9 110.4 114.1 110.4 106.5C110.4 99.3 115.9 94.2 126.5 94.2C136.1 94.2 141.6 97.6 143.9 105.3C144.4 107 145.9 108.2 147.7 108.2H156.1C158.5 108.2 160.3 106.1 159.8 103.8C157.1 91.6 148.9 84.3 136 82V69.3C136 67.1 134.2 65.3 132 65.3H124C121.8 65.3 120 67.1 120 69.3V81.7C104.2 83.9 93.9 94.5 93.9 108C93.9 125.5 104.5 132.3 126.9 135.3C142.1 137.8 146.4 141.1 146.4 149.7C146.4 158.3 139 164.1 128.7 164.1C114.7 164.1 110.1 158 108.4 150.1C108 148.3 106.4 146.9 104.5 146.9H95.4C93.1 146.9 91.3 148.9 91.7 151.2C94 164.6 102.5 174.3 120 176.7V189.3C120 191.5 121.8 193.3 124 193.3H132ZM157.2 220.8C154.3 221.7 152 220 152 217V209.5C152 207.3 153.3 205.2 155.4 204.5C186 193.3 208 163.8 208 129.4C208 94.9 186.1 65.5 155.4 54.3C153.5 53.6 152 51.3 152 49.3V41.8C152 38.8 154.4 37.1 157.2 38C196 50.2 224 86.5 224 129.3C224 172.2 196 208.4 157.2 220.8Z"
        fill="currentColor"
      />
    ),
    viewBox: '0 0 256 256',
  },
}

const customLandingIcons = {
  landing_introduction: {
    path: (
      <>
        <g clipPath="url(#clip0)">
          <path
            d="M1.96156 3.82758L15.3654 1.0333C15.5593 0.993142 15.7622 0.98925 15.9583 1.02193C16.1545 1.0546 16.3386 1.12297 16.4966 1.22176C16.6545 1.32055 16.7821 1.44711 16.8694 1.59168C16.9566 1.73626 17.0013 1.89498 17 2.0556V14.3913C17.0007 14.8408 16.8212 15.2786 16.488 15.6401C16.1549 16.0016 15.6857 16.2677 15.1496 16.3992L5.06732 18.8632C4.4798 19.0069 3.85842 19.0379 3.25321 18.9538C2.648 18.8697 2.07588 18.6729 1.5829 18.3791C1.08992 18.0853 0.68986 17.7028 0.414931 17.2624C0.140001 16.822 -0.00211485 16.336 2.37841e-05 15.8435V5.85645C0.000456026 5.39182 0.19333 4.94046 0.548361 4.57324C0.903391 4.20602 1.40047 3.94374 1.96156 3.82758Z"
            fill="#22222B"
          />
          <path
            d="M15.6296 20H2.94019C2.55136 19.997 2.16687 19.9092 1.80867 19.7416C1.45047 19.574 1.12559 19.3299 0.852558 19.0232C0.57953 18.7165 0.363709 18.3532 0.217418 17.9541C0.0711269 17.555 -0.00276873 17.1279 -4.96722e-05 16.6971V5.14285C-4.96722e-05 5.14285 0.165016 6.22857 1.25342 6.30857H15.6296C17.2545 6.30857 18.5699 7.78857 18.5699 9.61142V16.6971C18.5699 18.5257 17.2545 20 15.6296 20ZM15.217 12C14.875 12 14.5469 12.1505 14.3051 12.4184C14.0633 12.6863 13.9274 13.0497 13.9274 13.4286C13.9274 13.8074 14.0633 14.1708 14.3051 14.4387C14.5469 14.7066 14.875 14.8571 15.217 14.8571C15.559 14.8571 15.887 14.7066 16.1288 14.4387C16.3707 14.1708 16.5066 13.8074 16.5066 13.4286C16.5066 13.0497 16.3707 12.6863 16.1288 12.4184C15.887 12.1505 15.559 12 15.217 12Z"
            fill="black"
          />
          <path
            d="M15.6296 20H2.94019C2.55136 19.997 2.16687 19.9092 1.80867 19.7416C1.45047 19.574 1.12559 19.3299 0.852558 19.0232C0.57953 18.7165 0.363709 18.3532 0.217418 17.9541C0.0711269 17.555 -0.00276873 17.1279 -4.96722e-05 16.6971V5.14285C-4.96722e-05 5.14285 0.165016 6.22857 1.25342 6.30857H15.6296C17.2545 6.30857 18.5699 7.78857 18.5699 9.61142V16.6971C18.5699 18.5257 17.2545 20 15.6296 20ZM15.217 12C14.875 12 14.5469 12.1505 14.3051 12.4184C14.0633 12.6863 13.9274 13.0497 13.9274 13.4286C13.9274 13.8074 14.0633 14.1708 14.3051 14.4387C14.5469 14.7066 14.875 14.8571 15.217 14.8571C15.559 14.8571 15.887 14.7066 16.1288 14.4387C16.3707 14.1708 16.5066 13.8074 16.5066 13.4286C16.5066 13.0497 16.3707 12.6863 16.1288 12.4184C15.887 12.1505 15.559 12 15.217 12Z"
            fill="#8BB4CB"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="20.5714" height="20" fill="white" />
          </clipPath>
        </defs>
      </>
    ),
    viewBox: '0 0 21 21',
  },
  landing_chevron_right: {
    path: (
      <path
        d="M1 1L7.82304 8.05806C8.05899 8.30214 8.05899 8.69786 7.82304 8.94194L1 16"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
      />
    ),
    viewBox: '0 0 9 17',
  },
  eth_dai_pair: {
    path: (
      <>
        <path
          d="M16.5 35C25.6127 35 33 27.6127 33 18.5C33 9.3873 25.6127 2 16.5 2C7.3873 2 0 9.3873 0 18.5C0 27.6127 7.3873 35 16.5 35Z"
          fill="#627EEA"
        />
        <path
          d="M17.0137 6.125V15.2722L24.7449 18.7269L17.0137 6.125Z"
          fill="white"
          fillOpacity="0.602"
        />
        <path d="M17.0136 6.125L9.28125 18.7269L17.0136 15.2722V6.125Z" fill="white" />
        <path
          d="M17.0137 24.6545V30.8698L24.7501 20.1665L17.0137 24.6545Z"
          fill="white"
          fillOpacity="0.602"
        />
        <path d="M17.0136 30.8698V24.6535L9.28125 20.1665L17.0136 30.8698Z" fill="white" />
        <path
          d="M17.0137 23.216L24.7449 18.7269L17.0137 15.2743V23.216Z"
          fill="white"
          fillOpacity="0.2"
        />
        <path
          d="M9.28125 18.7269L17.0136 23.216V15.2743L9.28125 18.7269Z"
          fill="white"
          fillOpacity="0.602"
        />
        <circle cx="45.5" cy="18.5" r="17.5" fill="#53567A" stroke="#353654" strokeWidth="2" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M39.8271 12H45.0849C48.2831 12 50.7074 13.7191 51.6092 16.2205H53.2469V17.7324H51.954C51.9794 17.9712 51.9923 18.2145 51.9923 18.4617V18.4989C51.9923 18.7773 51.9759 19.051 51.9439 19.319H53.2469V20.8309H51.578C50.6523 23.2974 48.2468 25 45.0849 25H39.8271V20.8309H38V19.319H39.8271V17.7324H38V16.2205H39.8271V12ZM41.2969 20.8309V23.6438H45.0849C47.4224 23.6438 49.159 22.5172 49.9674 20.8309H41.2969ZM50.4177 19.319H41.2969V17.7324H50.4201C50.4539 17.982 50.4711 18.2379 50.4711 18.4989V18.536C50.4711 18.803 50.4531 19.0645 50.4177 19.319ZM45.0849 13.354C47.4332 13.354 49.1751 14.5104 49.9786 16.2205H41.2969V13.354H45.0849Z"
          fill="white"
        />
      </>
    ),
    viewBox: '0 0 64 37',
  },
  dai_calculator_exchange: {
    path: (
      <path
        d="M4.26136 11.7V14.2568L0 10.8478L4.26136 7.43866V9.99548H11.0795C11.3056 9.99548 11.5224 10.0853 11.6822 10.2451C11.842 10.4049 11.9318 10.6217 11.9318 10.8478C11.9318 11.0738 11.842 11.2906 11.6822 11.4504C11.5224 11.6102 11.3056 11.7 11.0795 11.7H4.26136ZM9.375 4.88185H2.55682C2.33078 4.88185 2.114 4.79205 1.95417 4.63222C1.79434 4.47239 1.70455 4.25561 1.70455 4.02957C1.70455 3.80354 1.79434 3.58676 1.95417 3.42693C2.114 3.26709 2.33078 3.1773 2.55682 3.1773H9.375V0.620483L13.6364 4.02957L9.375 7.43866V4.88185Z"
        fill="#2C2E47"
      />
    ),
    viewBox: '0 0 14 15',
  },
  support_plus: {
    path: (
      <path
        d="M9.42857 19.7143C9.42857 20.1877 9.81233 20.5714 10.2857 20.5714C10.7591 20.5714 11.1429 20.1877 11.1429 19.7143V11.1429H19.7143C20.1877 11.1429 20.5714 10.7591 20.5714 10.2857C20.5714 9.81233 20.1877 9.42857 19.7143 9.42857H11.1429V0.857143C11.1429 0.383756 10.7591 0 10.2857 0C9.81232 0 9.42857 0.383756 9.42857 0.857143V9.42857H0.857143C0.383756 9.42857 0 9.81233 0 10.2857C0 10.7591 0.383756 11.1429 0.857143 11.1429H9.42857V19.7143Z"
        fill="currentColor"
      />
    ),
    viewBox: '0 0 21 21',
  },
  support_minus: {
    path: (
      <path
        d="M9.42857 2.64295C9.42857 3.11634 9.81232 2.64295 10.2857 2.64295C10.7591 2.64295 11.1429 3.11634 11.1429 2.64295H19.7143C20.1877 2.64295 20.5714 2.2592 20.5714 1.78581C20.5714 1.31242 20.1877 0.928667 19.7143 0.928667H11.1429L14.5 1.49993C14.5 1.02654 10.7591 0.928406 10.2857 0.928406C10.2857 0.928406 6 1.02655 6 1.49994L9.42857 0.928667H0.857143C0.383756 0.928667 0 1.31242 0 1.78581C0 2.2592 0.383756 2.64295 0.857143 2.64295H9.42857Z"
        fill="currentColor"
      />
    ),
    viewBox: '0 0 21 3',
  },
  latamex_with_text: {
    path: (
      <g>
        <g>
          <path fill="#2C2A3A" d="M172.4,111.2V47.3h6.7v63.8L172.4,111.2L172.4,111.2z" />
          <path
            fill="#2C2A3A"
            d="M202.1,72.2c-2.2,0.6-4.3,1.4-6.4,2.4l-2-5.5c2.5-1.2,5-2.1,7.6-2.8c2.6-0.7,5.5-1,8.8-1 c6.2,0,10.9,1.5,14.2,4.6s5,7.6,5,13.6v27.6h-6.5v-6.8c-1.6,2-3.7,3.8-6.3,5.4c-2.7,1.6-6,2.4-10,2.4c-2.1,0-4.2-0.3-6.2-0.9 s-3.8-1.5-5.4-2.7c-1.6-1.2-2.9-2.7-3.8-4.4c-1-1.7-1.4-3.8-1.4-6.2c0-2.4,0.5-4.5,1.4-6.3s2.3-3.4,4-4.6s3.8-2.2,6.1-2.8 c2.4-0.6,5-1,7.8-1c2.9,0,5.4,0.2,7.6,0.5c2.2,0.3,4.3,0.8,6.3,1.4v-1.6c0-4.1-1.2-7.2-3.5-9.2s-5.7-3.1-9.9-3.1 C206.8,71.3,204.3,71.6,202.1,72.2z M199.9,90.8c-2.3,1.7-3.4,4-3.4,6.9c0,1.5,0.3,2.7,0.9,3.8c0.6,1.1,1.4,2.1,2.5,2.8 c1,0.8,2.2,1.4,3.6,1.8c1.4,0.4,2.8,0.6,4.3,0.6c2.1,0,4-0.3,5.9-0.9c1.8-0.6,3.4-1.5,4.8-2.5c1.4-1.1,2.4-2.4,3.2-3.8 c0.8-1.5,1.2-3.1,1.2-4.9v-4.4c-1.7-0.5-3.6-0.9-5.8-1.3s-4.7-0.6-7.4-0.6C205.4,88.3,202.2,89.1,199.9,90.8z"
          />
          <path
            fill="#2C2A3A"
            d="M250.6,98.3c0,2.8,0.7,4.8,2.1,5.9c1.4,1.1,3.2,1.7,5.5,1.7c1.2,0,2.3-0.1,3.3-0.3c1-0.2,2.1-0.6,3.3-1.2v5.8 c-1.2,0.6-2.4,1.1-3.7,1.4c-1.3,0.3-2.8,0.5-4.4,0.5c-1.8,0-3.5-0.2-5.1-0.7s-2.9-1.2-4.1-2.2c-1.1-1-2-2.3-2.7-4 c-0.6-1.6-1-3.6-1-5.9V71.9h-6.3V66h6.3V52.3h6.7v13.6H265v5.9h-14.3V98.3z"
          />
          <path
            fill="#2C2A3A"
            d="M284.2,72.2c-2.2,0.6-4.3,1.4-6.4,2.4l-2-5.5c2.5-1.2,5-2.1,7.6-2.8c2.6-0.7,5.5-1,8.8-1 c6.2,0,10.9,1.5,14.2,4.6c3.3,3.1,5,7.6,5,13.6v27.6h-6.5v-6.8c-1.6,2-3.7,3.8-6.3,5.4c-2.7,1.6-6,2.4-10,2.4 c-2.1,0-4.2-0.3-6.2-0.9s-3.8-1.5-5.4-2.7c-1.6-1.2-2.9-2.7-3.8-4.4c-1-1.7-1.4-3.8-1.4-6.2c0-2.4,0.5-4.5,1.4-6.3 c0.9-1.8,2.3-3.4,4-4.6s3.8-2.2,6.1-2.8c2.4-0.6,5-1,7.8-1c2.9,0,5.4,0.2,7.6,0.5s4.3,0.8,6.3,1.4v-1.6c0-4.1-1.2-7.2-3.5-9.2 s-5.7-3.1-9.9-3.1C288.8,71.3,286.3,71.6,284.2,72.2z M282,90.8c-2.3,1.7-3.4,4-3.4,6.9c0,1.5,0.3,2.7,0.9,3.8 c0.6,1.1,1.4,2.1,2.5,2.8c1,0.8,2.2,1.4,3.6,1.8c1.4,0.4,2.8,0.6,4.3,0.6c2.1,0,4-0.3,5.9-0.9c1.8-0.6,3.4-1.5,4.8-2.5 c1.4-1.1,2.4-2.4,3.2-3.8c0.8-1.5,1.2-3.1,1.2-4.9v-4.4c-1.7-0.5-3.6-0.9-5.8-1.3c-2.2-0.4-4.7-0.6-7.4-0.6 C287.5,88.3,284.2,89.1,282,90.8z"
          />
          <path
            fill="#2C2A3A"
            d="M362.5,70.5c1-1.1,2.2-2.1,3.5-2.9s2.7-1.5,4.3-1.9c1.6-0.5,3.4-0.7,5.4-0.7c5.2,0,9.4,1.6,12.3,4.9 c3,3.2,4.5,7.7,4.5,13.3v28h-6.7V84.8c0-4.4-1-7.7-3.1-10.1c-2.1-2.4-4.9-3.5-8.6-3.5c-1.7,0-3.3,0.3-4.8,0.9s-2.8,1.5-4,2.7 c-1.1,1.2-2,2.7-2.7,4.4c-0.7,1.8-1,3.7-1,5.9v26H355V84.6c0-4.3-1-7.6-3.1-9.9c-2.1-2.4-4.9-3.5-8.5-3.5c-1.8,0-3.5,0.4-5,1 c-1.5,0.7-2.8,1.7-4,3c-1.1,1.3-2,2.8-2.7,4.5c-0.6,1.7-1,3.6-1,5.7v25.8H324V66h6.7v7.6c0.8-1.1,1.6-2.2,2.5-3.2 c0.9-1,1.9-2,3.1-2.8s2.5-1.4,3.9-1.9c1.5-0.5,3.1-0.7,5.1-0.7c3.7,0,6.7,0.9,9.1,2.6c2.4,1.7,4.2,3.9,5.4,6.4 C360.5,72.8,361.5,71.6,362.5,70.5z"
          />
          <path
            fill="#2C2A3A"
            d="M411.2,97.6c0.9,1.9,2.1,3.5,3.6,4.8s3.1,2.3,4.9,3s3.7,1,5.7,1c3.1,0,5.8-0.6,8.1-1.7 c2.2-1.2,4.3-2.7,6.2-4.6l4.2,3.8c-2.3,2.6-4.9,4.6-7.8,6.2c-2.9,1.5-6.5,2.3-10.8,2.3c-3.1,0-6-0.6-8.7-1.7s-5.1-2.7-7.2-4.8 c-2.1-2.1-3.7-4.6-4.9-7.5c-1.2-2.9-1.8-6.1-1.8-9.6c0-3.3,0.5-6.3,1.6-9.2c1.1-2.9,2.6-5.4,4.5-7.5c1.9-2.1,4.2-3.8,6.9-5 s5.5-1.8,8.7-1.8c3.3,0,6.3,0.6,8.9,1.9c2.6,1.3,4.8,3,6.6,5.1c1.8,2.2,3.2,4.7,4.1,7.6c0.9,2.9,1.4,6,1.4,9.4c0,0.3,0,0.6,0,1 s0,0.7-0.1,1.1h-35.8C409.7,93.5,410.2,95.7,411.2,97.6z M438.3,86.1c-0.2-2-0.6-4-1.3-5.9s-1.6-3.5-2.8-4.9s-2.6-2.5-4.3-3.4 c-1.7-0.8-3.7-1.3-6-1.3c-2,0-3.8,0.4-5.5,1.2c-1.7,0.8-3.2,1.9-4.4,3.2c-1.3,1.4-2.3,3-3.1,4.9c-0.8,1.9-1.3,3.9-1.6,6.1h29V86.1 z"
          />
          <path
            fill="#2C2A3A"
            d="M492,111.2h-7.8l-14-18.4L456,111.2h-7.5l17.7-23l-17-22.2h7.7l13.4,17.5L483.8,66h7.5l-17.1,22L492,111.2z"
          />
        </g>
        <g>
          <path
            fill="#3C2FED"
            d="M130.5,117.9H87.6c-1.8,0-3.5-1.2-4-2.9l-14-44.6c-0.7-2.2,0.5-4.6,2.8-5.3c2.2-0.7,4.6,0.5,5.3,2.8 l13.1,41.7h39.8c2.3,0,4.2,1.9,4.2,4.2S132.9,117.9,130.5,117.9z"
          />
          <path
            fill="#3C2FED"
            d="M55.4,73L55.4,73H32.2c-2.3,0-4.2-1.9-4.2-4.2c0-2.3,1.9-4.2,4.2-4.2l0,0h23.2c2.3,0,4.2,1.9,4.2,4.2 C59.6,71.1,57.7,73,55.4,73z"
          />
          <path
            fill="#3C2FED"
            d="M61.7,95.5L61.7,95.5H32.2c-2.3,0-4.2-1.9-4.2-4.2c0-2.3,1.9-4.2,4.2-4.2l0,0h29.5c2.3,0,4.2,1.9,4.2,4.2 C65.9,93.6,64,95.5,61.7,95.5z"
          />
          <path
            fill="#3C2FED"
            d="M69.4,117.9L69.4,117.9H46.2c-2.3,0-4.2-1.9-4.2-4.2s1.9-4.2,4.2-4.2l0,0h23.2c2.3,0,4.2,1.9,4.2,4.2 S71.8,117.9,69.4,117.9z"
          />
          <path
            fill="#3386FF"
            d="M103.2,95.1c-1.8,0-3.5-1.1-4-2.9L86.1,50.5H46.2c-2.3,0-4.2-1.9-4.2-4.2s1.9-4.2,4.2-4.2h42.9 c1.8,0,3.5,1.2,4,2.9l14,44.6c0.7,2.2-0.5,4.6-2.8,5.3C104,95.1,103.6,95.1,103.2,95.1z"
          />
          <path
            fill="#3386FF"
            d="M144.6,95.5L144.6,95.5h-23.2c-2.3,0-4.2-1.9-4.2-4.2c0-2.3,1.9-4.2,4.2-4.2l0,0h23.2c2.3,0,4.2,1.9,4.2,4.2 C148.8,93.6,146.8,95.5,144.6,95.5z"
          />
          <path
            fill="#3386FF"
            d="M144.6,73h-29.5c-2.3,0-4.2-1.9-4.2-4.2s1.9-4.2,4.2-4.2h29.5c2.3,0,4.2,1.9,4.2,4.2S146.8,73,144.6,73z"
          />
          <path
            fill="#3386FF"
            d="M130.5,50.5h-23.2c-2.3,0-4.2-1.9-4.2-4.2s1.9-4.2,4.2-4.2h23.2c2.3,0,4.2,1.9,4.2,4.2S132.9,50.5,130.5,50.5 z"
          />
        </g>
      </g>
    ),
    viewBox: '0 0 520 160',
  },
}

const oasisBaseTheme = {
  useBorderBox: true,
  useBodyStyles: true,
  breakpoints: ['40em', '52em', '64em'],
  colors: {
    primary: '#25273D',
    primaryAlt: '#D3D4D8',
    primaryEmphasis: '#626472',
    secondary: '#ECEFF9',
    background: '#F6F8F9',
    surface: '#FFF',

    ghost: '#F6F6F6',
    light: '#D1DEE6',

    text: {
      muted: '#708390',
      contrast: '#FFF',
    },

    link: '#575CFE',
    textAlt: 'rgba(37, 39, 61, 0.67)',
    onBackground: '#9FAFB9',
    onPrimary: '#FFFFFF',
    onSurface: '#708390',
    muted: '#708390',
    mutedAlt: '#656F75',
    error: '#FDEDE8',
    onError: '#F75524',
    success: '#E7FCFA',
    onSuccess: '#1AAB9B',
    warning: '#FFF1CF',
    onWarning: '#D8762D',
    networks: {
      mainnet: 'rgb(41, 182, 175)',
      kovan: 'rgb(112, 87, 255)',
      default: '#aaa',
    },
  },
  fonts: {
    body: '"Inter", "Helvetica Neue", sans-serif',
    heading: '"FT Polar Trial", "Helvetica Neue", sans-serif',
    monospace: 'monospace',
  },
  fontSizes: [10, 12, 14, 16, 18, 20, 24, 32, 52, 64, 96],
  fontWeights: {
    body: 400,
    heading: 500,
    semiBold: 600,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.2,
    tight: 1.05,
    loose: 1.35,
    //
    buttons: '2.1em',
    secondaryButton: 0.8,
    smallButton: 1.9,
  },
  text: {
    header1: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      lineHeight: 'heading',
      fontSize: 8,
      color: 'primary',
    },
    header2: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: 7,
      color: 'primary',
    },
    header3: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      lineHeight: 'heading',
      fontSize: 5,
      color: 'primary',
    },
    paragraph1: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      fontSize: 4,
      color: 'primary',
    },
    paragraph2: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      fontSize: 3,
      color: 'primary',
    },
    paragraph3: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      fontSize: 2,
      color: 'primary',
    },
    paragraph4: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      fontSize: 1,
      color: 'primary',
    },
    caption: {
      variant: 'paragraph4',
      fontWeight: 'heading',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      opacity: 0.7,
    },
  },
  borders: {
    light: '1px solid',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  radii: {
    small: 4,
    medium: 8,
    large: 16,
    roundish: 20,
    round: 32,
  },
  shadows: {
    medium: '0 2px 8px rgba(0, 0, 0, 0.17)',
    light: '0 2px 8px rgba(0, 0, 0, 0.13)',
    surface: '0px 2px 2px rgba(199, 199, 199, 0.25)',
    table: '0px 0px 2px rgba(0, 0, 0, 0.2)',
  },
  gradients: {
    app: 'linear-gradient(180deg, #EAFFFB 0.01%, #EAF0FF 24.48%, rgba(255, 255, 255, 0) 100%)',
  },
  layout: {
    appContainer: {
      maxWidth: '1024px',
    },
    marketingContainer: {
      variant: 'layout.appContainer',
    },
    landingContainer: {
      variant: 'layout.appContainer',
      maxWidth: '1200px',
    },
    termsContainer: {
      variant: 'layout.appContainer',
      maxWidth: '712px',
      mt: 5,
    },
    daiContainer: {
      variant: 'layout.appContainer',
      maxWidth: '818px',
    },
    modal: {
      variant: 'layout.appContainer',
    },
    modalHalf: {
      variant: 'layout.modal',
      minHeight: '50vh',
    },
  },
  metadata: {
    fontLinkHref: 'https://rsms.me/inter/inter.css',
  },
  cards: {
    primary: {
      border: '1px solid',
      borderColor: 'muted',
      p: 3,
      borderRadius: 'roundish',
      bg: 'surface',
    },
    primaryWithHover: {
      variant: 'cards.primary',
      cursor: 'pointer',
      transition: '150ms cubic-bezier(0.215,0.61,0.355,1)',
      '&:hover': {
        borderColor: 'mutedAlt',
        boxShadow: 'surface',
      },
    },
    secondary: {
      variant: 'cards.primary',
      border: 'none',
      bg: 'background',
    },
    secondaryRounded: {
      variant: 'cards.secondary',
      borderRadius: 'large',
    },
  },
  badges: {
    dsr: {
      paddingLeft: '12px',
      paddingRight: '12px',
      paddingTop: '6px',
      paddingBottom: '6px',
    },
    onramp: {
      variant: 'badges.primary',
      px: 2,
    },
  },
  buttons: {
    primary: {
      variant: 'text.paragraph1',
      cursor: 'pointer',
      fontWeight: 'semiBold',
      borderRadius: 'round',
      lineHeight: 'buttons',
      color: 'text.contrast',
    },
    outline: {
      variant: 'text.paragraph2',
      cursor: 'pointer',
      background: 'none',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'light',
      borderRadius: 'round',
      color: 'primary',
      fontWeight: 'semiBold',
      px: 4,
      py: 2,
    },
    secondary: {
      variant: 'text.paragraph3',
      cursor: 'pointer',
      fontWeight: 'semiBold',
      bg: 'ghost',
      color: 'primary',
      borderRadius: 'round',
      px: 4,
      py: 2,
    },
    square: {
      variant: 'text.paragraph2',
      bg: 'white',
      borderRadius: 'large',
      py: 3,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'light',
    },
  },
  links: {
    nav: {
      variant: 'text.paragraph3',
      cursor: 'pointer',
      display: 'inline-block',
      fontWeight: 'semiBold',
    },
    outline: {
      variant: 'buttons.outline',
      display: 'inline-block',
    },
    secondary: {
      variant: 'buttons.secondary',
      display: 'inline-block',
    },
  },
  icons: {
    ...icons,
    ...brandingIcons,
    ...customIcons,
    ...customLandingIcons,
  },
  forms: {
    label: {
      fontSize: 4,
      fontWeight: 'semiBold',
    },
    input: {
      outline: 'none',
      borderRadius: 'large',
      border: 'light',
      borderColor: 'muted',
      color: 'onSurface',
      fontWeight: 'body',
      fontFamily: 'body',
      p: 3,
      lineHeight: 'tight',
      fontSize: 5,
      '&:focus': {
        borderColor: 'primary',
        color: 'primary',
      },
      '&:disabled': {
        bg: 'background',
        pointerEvents: 'none',
      },
    },
    inputError: {
      variant: 'forms.input',
      borderColor: 'onError',
      '&:focus': {
        borderColor: 'onError',
      },
    },
    select: {
      variant: 'forms.input',
    },
    textarea: { variant: 'forms.input', lineHeight: 'body' },
    textareaError: { variant: 'forms.inputError' },
  },
  alerts: {
    primary: {
      width: '100%',
      justifyContent: ['flex-start', 'center'],
    },
    readonly: {
      variant: 'alerts.primary',
      bg: 'txManagerBg',
      color: 'primary',
      borderRadius: 'large',
      fontWeight: 'body',
      px: 2,
      py: 3,
      lineHeight: 'loose',
      display: 'inline-block',
      textAlign: 'center',
    },
  },
  zIndices: {
    modal: 2,
    cookie: 3,
  },
  sizingsCustom: {
    pxModalBottom: '22px',
    mlDashboardToken: '12px',
    mbDashboardTokenAmount: '6px',
    gapCardProduct: '12px',
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      fontSize: 3,
    },
    spinner: {
      default: {
        color: 'mutedAlt',
        strokeWidth: 3,
        size: 16,
      },
      small: {
        variant: 'styles.spinner.default',
        size: 12,
      },
      large: {
        variant: 'styles.spinner.default',
        size: 25,
      },
    },
    h1: {
      variant: 'text.header1',
    },
    h2: {
      variant: 'text.header2',
    },
    h3: {
      variant: 'text.header3',
    },
    h4: {
      variant: 'text.microHeading',
    },
    a: {
      variant: 'text.paragraph3',
      fontWeight: 'semiBold',
      textDecoration: 'none',
      cursor: 'pointer',
      color: 'link',
    },
  },
}

export const theme = oasisBaseTheme
export default theme

// Duplication from theme as exporting const from package library is breaking dai-ui website and theme-ui doesn't support yet transitions tokens :(
// To refactor if they will include this support
export const TRANSITIONS = {
  global: '150ms cubic-bezier(0.215,0.61,0.355,1)',
}
