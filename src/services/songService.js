const getAllSongs = async () =>
  await fetch("https://cms.samespace.com/items/songs");

const getCover = async (COVER_IMAGE_ID) =>
  await fetch(`https://cms.samespace.com/assets/${COVER_IMAGE_ID}`);

export { getAllSongs, getCover };
