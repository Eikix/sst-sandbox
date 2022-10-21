export const getApeNftEntityPK = (userId: string) => {
  return `USER_ID#${userId}`;
};

export const getApeNftEntitySK = (nftId: string) => {
  return `NFT_ID#${nftId}`;
};
