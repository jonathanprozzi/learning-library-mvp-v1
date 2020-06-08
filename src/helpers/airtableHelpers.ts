const Airtable = require("airtable");
Airtable.configure({
  apiKey: process.env.API_KEY,
});

module.exports = {
  getAllRecords: () => {
    const base = new Airtable.base(process.env.BASE_ID);

    return new Promise((resolve, reject) => {
      const allRecords = [];

      base(process.env.TABLE_NAME)
        .select({
          sort: [
            {
              field: "Resource Title",
              direction: "desc",
            },
          ],
        })
        .eachPage(
          (records, fetchNextPage) => {
            // Get the fields
            records.forEach((record) => {
              const item = {
                id: record.id,
                title: record.get("Resource Title"),
                // content: record.get("content"),
                // publish_date: record.get("publish_date"),
              };

              // Push post to
              allRecords.push(item);
              console.log(allRecords);
            });

            fetchNextPage();
          },
          (error) => {
            if (error) {
              console.error(error);
              reject({ error });
            }
            resolve(allRecords);
          }
        );
    });
  },

  getRecordsByField: (fieldName) => {
    const base = new Airtable.base(process.env.BASE_ID);

    return new Promise((resolve, reject) => {
      const allRecords = [];

      base(process.env.TABLE_NAME)
        .select({
          fields: [fieldName],
        })
        .eachPage(
          (records, fetchNextPage) => {
            // Get the fields
            records.forEach((record) => {
              const item = {
                // id: record.id,
                // title: record.get("Resource Title"),
                // // content: record.get("content"),
                // // publish_date: record.get("publish_date"),
                record,
              };

              // Push post to
              allRecords.push(item);
              console.log(allRecords);
            });

            fetchNextPage();
          },
          (error) => {
            if (error) {
              console.error(error);
              reject({ error });
            }
            resolve(allRecords);
          }
        );
    });
  },
};