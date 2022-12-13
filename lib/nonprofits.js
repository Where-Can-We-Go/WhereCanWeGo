import create from "zustand";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";

const useNonprofitStore = create((set, get) => ({
  nonprofits: [],
  inputZip: "32608",
  zipCoords: [29.6436, -82.3549],
  getNonprofitData: async () => {
    const npData = await getData(get().inputZip);
    set({ nonprofits: npData });
  },
  setInputZip: async (newInputZip) => {
    const zipcodeData = await getZipcodeCoords(newInputZip);
    console.log(zipcodeData);
    //Changes the zipcode from default to the user value
    set((state) => ({
      inputZip: newInputZip,
      zipCoords: [zipcodeData.lat, zipcodeData.lon],
    }));
    get().getNonprofitData();
  },
}));

async function getData(inputZip) {
  const res = await fetch(
    "/api/getMapData?" + new URLSearchParams({ zipCode: inputZip })
  );
  const data = await res.json();
  return data.searchResult;
}

async function getZipcodeCoords(inputZip) {
  const res = await fetch(
    "/api/getZipcodeCoords?" + new URLSearchParams({ zipCode: inputZip })
  );
  const data = await res.json();
  return data.searchResult;
}

export default useNonprofitStore;
