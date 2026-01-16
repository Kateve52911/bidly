export interface Profile {
  name: string;
  email: string;
  bio: string;
  banner: {
    url: string;
    alt: string;
  };
  avatar: {
    url: string;
    alt: string;
  };
  credits: number;
  _count: {
    listings: number;
    wins: number;
  };
  listings: [
    {
      id: string;
      title: string;
      description: string;
      media: {
        url: string;
        alt: string;
      };
      tags: [string];
      createdAt: string;
      updatedAt: string;
      endsAt: string;
    },
  ];
  wins: [
    {
      id: string;
      title: string;
      description: string;
      media: {
        url: string;
        alt: string;
      };
      tags: [string];
      createdAt: string;
      updatedAt: string;
      endsAt: string;
    },
  ];
}
