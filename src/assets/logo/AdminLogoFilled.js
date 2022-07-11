import React from "react";

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={props.width}
      height={props.height}
      version="1.1"
      viewBox="0 0 13.758 13.758"
    >
      <defs>
        <linearGradient id="linearGradient1595">
          <stop offset="0" stopColor="#ffc013" stopOpacity="1"></stop>
          <stop offset="1" stopColor="#ff000b" stopOpacity="1"></stop>
        </linearGradient>
        <linearGradient
          id="linearGradient856"
          x1="-24.782"
          x2="25.224"
          y1="148.095"
          y2="148.095"
          gradientTransform="translate(6.818 -33.867) scale(.27513)"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#linearGradient1595"
        ></linearGradient>
      </defs>
      <g>
        <path
          fill="url(#linearGradient856)"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeDasharray="none"
          strokeDashoffset="0"
          strokeLinecap="butt"
          strokeLinejoin="round"
          strokeMiterlimit="4"
          strokeOpacity="1"
          strokeWidth="0.073"
          d="M12.048 0l-1.786 1.23-4.441 3.058-.663.456L9.684.956A7.227 7.227 0 006.88.386C3.08.385 0 3.292 0 6.878c0 1.929.91 3.757 2.48 4.99L5.74 7.167l-3.231.817zm-.77 1.89L8.017 6.59l3.231-.817-9.538 7.984 1.786-1.23 2.517-1.732L8.6 9.014l-4.526 3.789a7.227 7.227 0 002.805.57c3.8 0 6.88-2.907 6.88-6.494 0-1.928-.91-3.757-2.48-4.99z"
          opacity="1"
          paintOrder="normal"
        ></path>
      </g>
    </svg>
  );
}

export default Icon;
