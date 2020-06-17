const allRecordsFetch = async (req, res) => {
  const apiKey = process.env.API_KEY;
  const baseId = process.env.BASE_ID;
  const initialData = await fetch(
    `https://api.airtable.com/v0/${baseId}/Content%20Resources?view=Approved%20Resources&api_key=${apiKey}`
  );
  const { records } = await initialData.json();

  return res.status(200).json({
    records,
  });
};

export default allRecordsFetch;
