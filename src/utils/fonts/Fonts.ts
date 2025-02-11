import localFont from "next/font/local";

const supremeLL = localFont({
  src: [
    {
      path: "./supremeLL/SupremeLL-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./supremeLL/SupremeLL-Light.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./supremeLL/SupremeLL-Book.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./supremeLL/SupremeLL-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./supremeLL/SupremeLL-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./supremeLL/SupremeLL-Bold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./supremeLL/SupremeLL-Black.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-supremeLL",
});

export { supremeLL };
