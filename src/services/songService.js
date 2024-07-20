const getAllSongs = async () =>
  await fetch("https://cms.samespace.com/items/songs");

export { getAllSongs };
