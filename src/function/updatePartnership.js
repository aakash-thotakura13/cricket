export default function updateActivePartnership(
  strike,
  run,
  partnerOnStrike,
  partnerOnNonStrike
) {
  const singlePartnerUpdate = {
    playerName: partnerOnStrike.playerName,
    runs: [...partnerOnStrike.runs, run],
  };

  const updatePartnership = strike
    ? {
        partnerOne: singlePartnerUpdate,
        partnerTwo: partnerOnNonStrike,
      }
    : {
        partnerOne: partnerOnNonStrike,
        partnerTwo: singlePartnerUpdate,
      };

  return {
    singlePartnerUpdate,
    updatePartnership,
  };
}
