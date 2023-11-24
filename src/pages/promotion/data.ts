export interface DataPromotionChoose {
  id: number;
  package: {
    titlePack: string;
    titlePackAdd?: string;
  }[];
  title: string;
  titleInfo: string[];
  desctiption: string[];
  policy: {
    title: string;
    description?: string;
  };
  type: string;
}

export const dataPromotionChoose: DataPromotionChoose[] = [
  {
    id: 0,
    package: [
      {
        titlePack: "One-time payment",
      },
    ],
    title: "Mini",
    titleInfo: ["From 2,300 VND/day", "1 account on mobile devices only"],
    desctiption: [
      "Listen to music without ads on mobile devices",
      "Shared listening group",
      "Download 30 songs to 1 mobile device",
    ],
    policy: {
      title: "Terms and conditions apply.",
    },
    type: "only",
  },
  {
    id: 1,
    package: [
      {
        titlePack: "One-time payment",
        titlePackAdd: "1 month free when you sign up",
      },
    ],
    title: "Individual",
    titleInfo: ["59,000 VND/month after promotion period", "1 account "],
    desctiption: [
      "Listen to music without ads",
      "Listen anywhere - even without an internet connection",
      "Play music in any order",
    ],
    policy: {
      title: "Terms and conditions apply.",
      description:
        "A free month is not available to those who have tried the Premium plan.",
    },
    type: "many",
  },
  {
    id: 2,
    package: [
      {
        titlePack: "One-time payment",
        titlePackAdd: "1 month free when you sign up",
      },
    ],
    title: "Student",
    titleInfo: ["29,500 VND/month after promotion period", "1 account "],
    desctiption: [
      "Special discount for qualified students",
      "Listen to music without ads",
      "Listen anywhere - even without an internet connection",
      "Play music in any order",
    ],
    policy: {
      title: "Terms and conditions apply.",
      description:
        "The package is only for students at colleges and universities who have not tried the Premium package. After the trial period, the fee will be 29,500 VND/month.",
    },
    type: "many",
  },
];
