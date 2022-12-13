import dynamic from "next/dynamic";
import { ScrollArea, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import Display from "../components/display";
import create from "zustand";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { signIn, signOut, useSession } from "next-auth/react";
import useNonprofitStore from "../lib/nonprofits";

const Map = dynamic(() => import("../components/map"), {
  ssr: false,
});

const useFilterStore = create((set, get) => ({
  filter: "",
  setFilter: (newFilter) => {
    // Set new filter value
    // If the new filter is the same as the current, deselect it
    if (newFilter === get().filter) {
      newFilter = "";
    }
    set((state) => ({
      filter: newFilter,
    }));
  },
}));

// Maps each nonprofit classification code to
const letterCodeMap = {
  F: "health",
  I: "social",
  J: "social",
  K: "food",
  L: "shelter",
  M: "social",
  O: "social",
  P: "social",
  R: "social",
};

export default function Home() {
  const nonprofits = useNonprofitStore((state) => state.nonprofits);
  const getNonprofitData = useNonprofitStore((state) => state.getNonprofitData);
  const setInputZip = useNonprofitStore((state) => state.setInputZip); //Sets the zipcode to what the user inputs
  const filter = useFilterStore((state) => state.filter);
  const setFilter = useFilterStore((state) => state.setFilter);

  const { data: session } = useSession();

  const form = useForm({
    //Handles the value for the search bar
    initialValues: {
      searchVal: "",
    },
    //Handles the validation for the search bar inputs
    validate: {
      searchVal: (value) =>
        value.length != 5 || /[^\d]/.test(value) //If the zipcode is not 5 digits long or if it is non-numerical
          ? "Please enter a valid 5-digit zipcode" //If the zipcode is invalid
          : null, //If the zipcode is valid
    },
  });

  return (
    <div className="h-screen w-full">
      <div className="h-1/2 min-[1200px]:h-screen w-full min-[1200px]:w-2/3 block min-[1200px]:float-right min-[1620px]:w-3/4">
        {/* Loads the map component */}
        <Map></Map>
      </div>
      <div className="h-1/2 min-[1200px]:h-full w-full min-[1200px]:w-1/3 block min-[1200px]:float-left min-[1620px]:w-1/4">
        {/* Search container */}
        <div className="w-full p-4 h-1/3 max-[1200px]:h-1/2">
          <div className="flex justify-center">
            <form //Handles the submission of the zipcode input
              onSubmit={form.onSubmit((values) => {
                setInputZip(values.searchVal); //Sets the value of the user's input
                getNonprofitData(); //Loads the nonprofit data based on input
                form.reset(); //Clears the search bar
              })}
            >
              <div className="grid grid-cols-3">
                <div className="col-span-2">
                  <TextInput //Textbox for the search bar
                    className="w-full"
                    placeholder="Enter a zipcode..."
                    {...form.getInputProps("searchVal")} //Store the user input in the searchVal variable
                  />
                </div>
                <div>
                  {/* Submits the input from the search bar */}
                  <Button variant="default" type="submit" className="w-full">
                    Search
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="h-3/4">
            <div className="h-3/4 text-center items-center grid grid-flow-col auto-cols-auto gap-2 justify-center">
              <div>
                {/* Shelter/housing filter button */}
                <Button
                  variant="default"
                  className={
                    "rounded-full w-[75px] h-[75px] max-[1200px]:w-[50px] max-[1200px]:h-[50px] hover:border-4 hover:bg-slate-100" +
                    (filter === "shelter" ? " border-4 bg-slate-100" : "")
                  }
                  onClick={() => {
                    setFilter("shelter");
                  }}
                >
                  <img src="\images\034-house.png" className="w-[50px]"></img>
                </Button>
                <p className="center text-sm">Shelter/Housing</p>
              </div>
              <div>
                {/* Food filter button */}
                <Button
                  variant="default"
                  className={
                    "rounded-full w-[75px] h-[75px] max-[1200px]:w-[50px] max-[1200px]:h-[50px] hover:border-4 hover:bg-slate-100" +
                    (filter === "food" ? " border-4 bg-slate-100" : "")
                  }
                  onClick={() => {
                    setFilter("food");
                  }}
                >
                  <img src="\images\030-food.png" className="w-[50px]"></img>
                </Button>
                <p className="center text-sm">Food</p>
              </div>
              <div>
                {/* Social services filter button */}
                <Button
                  variant="default"
                  className={
                    "rounded-full w-[75px] h-[75px] max-[1200px]:w-[50px] max-[1200px]:h-[50px] hover:border-4 hover:bg-slate-100" +
                    (filter === "social" ? " border-4 bg-slate-100" : "")
                  }
                  onClick={() => {
                    setFilter("social");
                  }}
                >
                  <img
                    src="\images\021-teamwork.png"
                    className="w-[50px]"
                  ></img>
                </Button>
                <p className="center text-sm">Social Services</p>
              </div>
              <div>
                {/* Health fiter button */}
                <Button
                  variant="default"
                  className={
                    "rounded-full w-[75px] h-[75px] max-[1200px]:w-[50px] max-[1200px]:h-[50px] hover:border-4 hover:bg-slate-100" +
                    (filter === "health" ? " border-4 bg-slate-100" : "")
                  }
                  onClick={() => {
                    setFilter("health");
                  }}
                >
                  <img
                    src="\images\018-stethoscope.png"
                    className="w-[50px]"
                  ></img>
                </Button>
                <p className="center text-sm">Health</p>
              </div>
            </div>
            <div className="h-1/4 text-center">
              {/* Conditionally display sign-in or sign-out button depending on current user login state */}
              {session ? (
                <Button
                  variant="default"
                  className="rounded-full hover:bg-slate-100"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="rounded-full hover:bg-slate-100"
                  onClick={() => {
                    signIn();
                  }}
                >
                  Sign In
                </Button>
              )}
              {session ? <div>Welcome, {session.user.name}!</div> : null}
            </div>
          </div>
        </div>
        {/* Info boxes container */}
        <div className="w-full overflow-auto h-2/3 flex justify-center max-[1200px]:h-1/2 ">
          <ScrollArea type="hover" className="w-5/6">
            {" "}
            {/* Scrolling container for the nonprofit info boxes */}
            {nonprofits.map((npInfo, i) => {
              if (
                filter === "" ||
                letterCodeMap[npInfo["Classification Code"]] === filter
              ) {
                return (
                  <Display // displays nonprofit information in a box
                    key={npInfo.EIN}
                    name={npInfo.NAME}
                    address={
                      npInfo.STREET +
                      ", " +
                      npInfo.CITY +
                      ", " +
                      npInfo.STATE +
                      " " +
                      npInfo.ZIP
                    }
                    orgType={npInfo["Classification Code"]}
                  ></Display>
                );
              }

              return null;
            })}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
