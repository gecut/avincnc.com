import localFont from "next/font/local";

export const changaOne = localFont({
  src: "../assets/fonts/changa-one-regular.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-changa-one",
});

export const blackOpsOne = localFont({
  src: "../assets/fonts/BlackOpsOne-Regular.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-black-ops-one",
});

export const peyda = localFont({
  src: [
    { path: "../assets/fonts/PeydaWeb-Regular.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/PeydaWeb-Medium.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/PeydaWeb-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/PeydaWeb-Bold.woff2", weight: "700", style: "normal" },
    { path: "../assets/fonts/PeydaWeb-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../assets/fonts/PeydaWeb-Black.woff2", weight: "900", style: "normal" },
  ],
  display: "swap",
  variable: "--font-peyda",
});
