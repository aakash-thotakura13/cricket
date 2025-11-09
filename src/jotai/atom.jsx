import { atom } from "jotai";

export const teamOne = atom({});
export const teamTwo = atom({});

export const startGame = atom(false);

export const inningsOne = atom(false);
export const inningsTwo = atom(false);

export const inningsOneBattingScoreCard = atom([]);
export const inningsOneBowlingScoreCard = atom([]);
export const inningsOnePartnershipCard = atom([]);

export const inningsTwoBattingScoreCard = atom([]);
export const inningsTwoBowlingScoreCard = atom([]);
export const inningsTwoPartnershipCard = atom([]);

export const playerOne = atom({});
export const playerTwo = atom({});

export const bowler = atom({});
export const prevBowler = atom({});

export const partnerOne = atom({});
export const partnerTwo = atom({});

export const run = atom(0);
export const overRuns = atom([]);
export const onStrike = atom(true);
export const activePartnership = atom([]);

export const inningsOneAllOvers = atom([]);
export const inningsTwoAllOvers = atom([]);


