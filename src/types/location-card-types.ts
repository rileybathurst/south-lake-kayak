export interface LocationCardTypes {
  id: React.Key;
  svg: string;
  name: string;
  link: string;
  address: {
    data: {
      address: string;
    };
  };
  description: {
    data: {
      description: string;
    };
  };
  opening_time: string;
  closing_time: string;

  locale: {
    season_start: string;
    season_end: string;
  };
  background?: string;
}
