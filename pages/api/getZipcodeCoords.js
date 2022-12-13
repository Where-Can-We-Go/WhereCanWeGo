import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json("ERROR: Only GET requests are allowed.");
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("zipcodesGeocoded");

    // Loads all nonprofits in all sub-zipcodes of the client-provided zipcode
    const searchResult = await collection
      .find({ ZIP: req.query.zipCode })
      .toArray();

    console.log(searchResult);

    res.status(200).json({ searchResult: searchResult[0] });
  } catch (e) {
    console.log("Failed to gather nonprofit data!");
    console.log(e);
    res.status(400).json({ error: "Failed to gather nonprofit data!" });
  }
}
