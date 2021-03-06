const allPlaylistsFetch = async (req, res) => {
  const apiKey = process.env.API_KEY;
  const baseId = process.env.BASE_ID;
  const initialData = await fetch(
    `https://api.airtable.com/v0/${baseId}/Playlists?view=Approved%20Playlists&api_key=${apiKey}`
  );
  const { records } = await initialData.json();
  console.log(records);

  if (records) {
    return res.status(200).json({
      records,
    });
  } else {
    return res.status(404).json;
  }
};

export default allPlaylistsFetch;
