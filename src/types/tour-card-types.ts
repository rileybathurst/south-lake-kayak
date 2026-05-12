import type { PaddleCardTypes } from "@rileybathurst/paddle";

export type TourCardTypes = PaddleCardTypes & {
  peek: string;
  paddleBookNow?: {
    name: string;
    peek_base: string;
    strapiBranchName?: string;
    specificName?: string;
    specificLink?: string;
  };
};
