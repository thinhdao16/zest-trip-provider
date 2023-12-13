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
      "Removal of Your Personal Data To the extent permitted by applicable law, you may have the right to request us to remove your Personal Data that we hold from our systems. You may submit a deletion request to us at our contact details listed below.We, without undue delay or within a time period as stipulated under the applicable law, shall use reasonable effort to erase your Personal Data or will use reasonable efforts to remove the means or personal identifiers by which the Personal Data can be associated with you as an individual, if         The purpose for which Personal Data was collected is no longer being served by the retention of that Personal Data;    We are not otherwise permitted or required by applicable law to retain the Personal Data; and/or     In case it is mandated by applicable law, based on your request to delete your Personal Data.      Please note that by requesting us to remove your Personal Data, we may not be able to continue providing you with some of our services and you agree that we will not be liable to you for any losses or damages arising out of or in relation to such termination of services.",
  },
  title: {
    titleMain: "Privacy Summary",
    description: [
      {
        title: "1. Retention of Your Personal Data ",
        description:
          "Unless we remove your Personal Data from our systems following the receipt of a request from you, your Personal Data will be retained by us for as long as your account is in existence, and as needed to provide you with our services, and/or for our legitimate business interests, or for as long as such retention is obligated or authorized by applicable law.",
      },
      {
        title: "2. What we do with the Personal Information we collect.",
        description:
          "We will delete your Personal Data after 5 (five) years or a longer period as required by applicable laws and regulations from the date you terminated/de-registered your account with us. Protection of Your Personal Data          We will protect your Personal Data by maintaining reasonable security arrangements, including physical, technical, and organizational measures, to prevent unauthorized access, collection, use, disclosure, copying, modification, disposal or similar risks. It is important to remember that even though we have several safeguards in place to protect your information, nothing within the internet is 100% secured and we cannot guarantee the safety of your Personal Data.",
      },
    ],
  },
  description: [
    {
      header: "1. What Personal Information we collect",
      title:
        "If we are subject to a data breach that relates to your Personal Data, to the extent required by applicable law, we will notify you through our channels, whether directly or indirectly, to give you sufficient information regarding such data breach and will work to protect against the misuse of your Personal Data. Links to Other Websites        The Site may contain links to other websites. You should note that we do not have any control over such other websites. Please note that we are not responsible for the privacy Notice or practices of such other websites and advise you to read the privacy Notice of each website you visit that collects any of your Personal Data.",
      description: [
        {
          list: "• We will contact you within a reasonable time after receipt of your complaint to discuss it and to outline options regarding how your complaint may be resolved.",
        },
        {
          list: "• If you have a complaint regarding the treatment of your Personal Data that is not resolved by us, you may be able to make a complaint to the relevant regulatory authority.",
        },
        {
          list: "• Any Personal Data that we collect while processing or resolving your complaint will be used solely for that purpose.",
        },
      ],
    },
    {
      header: "2. What we do with the Personal Information we collect",
      title:
        "Unless the laws state otherwise, if there is a third-party individual who is a full-7-year-old or older child, you undertake and warrant to us that you have already obtained properly documented consent of the child and his/her parent or legal guardian to the processing of his/her Personal Data by us. ",
      description: [
        {
          list: "• The Personal Data we collect shall include date of birth for age verification and others depending on the queries or services you wish to acquire.",
        },
        {
          list: "• We commit that the processing of children’s personal data is always done in accordance with the principle of protecting the rights and in the best interests of children.",
        },
      ],
    },
  ],
};
