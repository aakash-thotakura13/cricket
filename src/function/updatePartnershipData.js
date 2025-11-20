export default function updatePartnershipData(
  strike,
  run,
  partnerOnStrike,
  partnerOnNonStrike
) {
  const newPartnershipEntry = strike
    ? {
        partnerOne: {
          ...partnerOnStrike,
          runs: [...partnerOnStrike.runs, run],
        },
        partnerTwo: partnerOnNonStrike,
      }
    : {
        partnerOne: partnerOnNonStrike,
        partnerTwo: {
          ...partnerOnStrike,
          runs: [...partnerOnStrike.runs, run],
        },
      };

  const updatePartnership = strike
    ? {
        partnerOne: {},
        partnerTwo: partnerOnNonStrike,
      }
    : {
        partnerOne: partnerOnNonStrike,
        partnerTwo: {},
      };

  return {
    newPartnershipEntry,
    updatePartnership,
  };
}
