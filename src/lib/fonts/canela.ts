import localFont from "next/font/local";

export const canela = localFont({
  src: [
    {
      path: "../../../public/fonts/Canela-Regular-Trial.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Canela-Light-Trial.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Canela-Medium-Trial.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-canela-family",
  display: "swap",
});
