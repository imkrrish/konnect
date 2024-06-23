import * as React from "react";
import { SVGProps } from "react";

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const Logo = ({ size = 39, ...props }: LogoProps) => {
  const aspectRatio = 45 / 39;
  const height = size * aspectRatio;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={height} viewBox="0 0 39 45" {...props}>
      <path
        fill="#fff"
        d="M31.122 0H7.879C3.733 0 .36 3.373.36 7.518v18.979c0 4.145 3.373 7.518 7.518 7.518h3.89l-.767 9.103c-.127 1.518 1.615 2.433 2.795 1.515l13.641-10.618h3.684c4.146 0 7.519-3.373 7.519-7.518V7.518C38.64 3.373 35.267 0 31.122 0Zm-5.456 18.51L15.07 24.63c-1.154.666-2.603-.168-2.603-1.503V10.89c0-1.335 1.449-2.169 2.603-1.502l10.597 6.118c1.156.667 1.155 2.339 0 3.005Z"
      />
    </svg>
  );
};
