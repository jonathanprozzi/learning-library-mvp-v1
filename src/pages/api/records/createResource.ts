import {
  requestsTable,
  minifyRecords,
  getMinifiedRecord,
} from "./utils/Airtable";

const createResource = async (req, res) => {
  const { category, contactOptIn, name, email, phone } = req.body;
  try {
    const createdResource = await requestsTable.create([
      {
        fields: {
          category: category,
          contactOptIn: contactOptIn,
          name: name,
          email: email,
          phone: phone,
        },
      },
    ]);
    res.statusCode = 200;
    res.json(getMinifiedRecord(createdResource));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong with the update." });
  }
};
export default createResource;
