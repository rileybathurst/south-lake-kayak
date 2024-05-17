// ! urg this became a mess

import React from "react";

export interface LocationCardTypes {
  map: object;
  location?: {
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
  };

  id?: React.Key;
  link?: string;
  svg: string;
  name?: string;
  address?: {
    data: {
      address: string;
    };
  };
  description?: {
    data: {
      description: string;
    };
  };
  opening_time?: string;
  closing_time?: string;

  locale?: {
    season_start: string;
    season_end: string;
  };

  background?: boolean;
}
