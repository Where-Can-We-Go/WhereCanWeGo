const csv = require("csvtojson");
const fsPromises = require("fs/promises");

async function parseCSV() {
  const csvFilePath = "files/Nonprofit-Database.csv";
  const nonprofits = await csv().fromFile(csvFilePath);
  //console.log(nonprofits);
  // Only keep locations in Florida to match Nominatim DB data
  const trimmedNonprofits = [];
  nonprofits.forEach((nonprofit) => {
    if (nonprofit.STATE === "FL") {
      trimmedNonprofits.push(nonprofit);
    }
  });

  const geocodedNonprofits = [];
  let i = 0;
  for (const nonprofit of trimmedNonprofits) {
    const res = await fetch(
      `http://127.0.0.1:8083/nominatim/search.php?street=${nonprofit.STREET}&city=${nonprofit.CITY}&state=${nonprofit.STATE}&postalcode=${nonprofit.ZIP}`
    );
    // If the query is successful
    const nominatimQueryData = await res.json();
    if (nominatimQueryData.length > 0) {
      let nonprofitWithGeocodeData = nonprofit;
      nonprofitWithGeocodeData.lat = nominatimQueryData[0].lat;
      nonprofitWithGeocodeData.lon = nominatimQueryData[0].lon;
      geocodedNonprofits.push(nonprofitWithGeocodeData);
    }
    i++;
    if (i % 100 === 0) {
      console.log(i);
    }
  }

  console.log(geocodedNonprofits);

  await fsPromises.writeFile(
    "output/nonprofits.json",
    JSON.stringify(geocodedNonprofits, null, 2)
  );
}

parseCSV();
