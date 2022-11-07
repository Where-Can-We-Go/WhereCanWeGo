import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json("ERROR: Only GET requests are allowed.");
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("nonprofitData");

    // Loads all nonprofits in all sub-zipcodes of the client-provided zipcode
    const searchResult = await collection
      .find({ ZIP: { $regex: req.query.zipCode + "-[0-9]*" } })
      .toArray();

    res.status(200).json({ searchResult: searchResult });
  } catch (e) {
    console.log("Failed to gather nonprofit data!");
    console.log(e);
    res.status(400).json({ error: "Failed to gather nonprofit data!" });
  }
}
