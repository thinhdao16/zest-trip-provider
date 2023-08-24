export interface PolicyMain {
  main: {
    titleMain: string;
    descriptionMain: string;
  };
  title: {
    titleMain: string;
    description: {
      title: string;
      description: string;
    }[];
  };
  description: {
    header: string;
    title: string;
    description: {
      list: string;
    }[];
  }[];
}

export const policy: PolicyMain = {
  main: {
    titleMain: "Privacy Policy",
    descriptionMain:
      "This privacy policy sets out how Creative Layer Inc. (“Creative Layer”, “we”, “us”, or “our”, and also doing business and “remx”) collects, uses, and discloses, any personal information that you give us or that we collect when you use our website or Services. Creative Layer offers a platform that allows artists, brands and us to mint and sell NFTs and tokens and for purchasers to mint and buy NFTs (“Services”). By using our website or Services, or by choosing to give us personal information, you consent to this Privacy Policy and the processing of your Personal Information it describes. If you do not agree with any terms of this Privacy Policy, please exercise the choices we describe in this Policy, or do not use the Services and do not give us any personal information. Creative Layer may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. Your continued access to and/or use of our website or Services after any such changes constitutes your acceptance of, and agreement to this Privacy Policy, as revised.",
  },
  title: {
    titleMain: "Privacy Summary",
    description: [
      {
        title: "1. What Personal Information we collect. ",
        description:
          "To register for our Services, you provide your public wallet address. If you make or buy an NFT, we collect information about your transaction, such as public wallet address, date and time, value, token ID, and transaction history. You may also choose to provide your email address, profile information such as name, social media handles, website, banner and profile picture, as well as other information you choose. We may also collect information to meet our anti-money laundering and ‘know your client’ obligations.",
      },
      {
        title: "2. What we do with the Personal Information we collect.",
        description:
          "We use the information we collect to provide our Services, including to allow you to register, make and buy NFTs, for record keeping, to improve our Services, to communicate with and respond to you, to manage, administer, maintain, service, collect and enforce our Terms and Conditions, to investigate and settle disputes, to investigate breaches, and for legal purposes, including anti-money laundering and ‘know your client’ requirements.",
      },
    ],
  },
  description: [
    {
      header: "1. What Personal Information we collect",
      title:
        "“Personal Information” is information that may identify an individual such as a first and last name, home or other address, an email address, payment information, or a phone number or other contact information. The Personal Information we may collect depends on how you choose to use our Services. For example, we may collect the following information:",
      description: [
        {
          list: "• When you join our mailing list, we collect your email address. You are not required to join our mailing list to use our Services. If you wish, you may create a new email address for this purpose, and can choose not to include any identifiable information such as your name in it,",
        },
        {
          list: "• If you make an account to use our Services, for example, to make a purchase of a token, or mint an NFT, we collect your public wallet address, and whether you are using the Services as an artist, or purchaser, or both,",
        },
        {
          list: "• If you choose to create a profile, we collect your username, email address, Twitter handle, Instagram handle, other social media handles you choose to provide, website address, and if you upload one, your banner and profile picture. Providing this information is optional,",
        },
      ],
    },
    {
      header: "2. What we do with the Personal Information we collect",
      title:
        "We use the information we collect to provide our Services in accordance with our Terms and Conditions, to understand your needs and provide you with better service, and in particular for the following reasons:",
      description: [
        {
          list: "• To allow you to register to use the Service.",
        },
        {
          list: "• To allow you to create NFTs if you register as an artist.",
        },
      ],
    },
  ],
};
