import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ScrollArea } from "@mantine/core";
import { Button } from "@mantine/core";
const Map = dynamic(() => import("../components/map"), {
  ssr: false,
});

const Display = dynamic(() => import("../components/display"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="h-screen w-full">
      <div className="h-full w-1/4 block float-left">
        {/* search container */}
        <div className="w-full h-1/6 p-4">
          <div className="flex justify-center">
            <input
              className="w-5/6 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md p-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              name="search"
            />
          </div>
          <div className="pt-2 flex justify-center">
            <Button.Group>
              <Button variant="default">Filter 1</Button>
              <Button variant="default">Filter 2</Button>
              <Button variant="default">Filter 3</Button>
              <Button variant="default">Filter 4</Button>
              <Button variant="default">Filter 5</Button>
            </Button.Group>
          </div>
          <div className="pt-1 flex justify-center">
            <Button.Group>
              <Button variant="default">Filter 1</Button>
              <Button variant="default">Filter 2</Button>
              <Button variant="default">Filter 3</Button>
              <Button variant="default">Filter 4</Button>
            </Button.Group>
          </div>
        </div>
        {/* Info boxes container */}
        <div className="w-full h-5/6 flex justify-center">
          <ScrollArea type="hover" className="w-5/6 h-full">
            <Display></Display>
            <Display></Display>
            <Display></Display>
            <Display></Display>
            <Display></Display>
            <Display></Display>
            <Display></Display>
            <Display></Display>
            <Display></Display>
            <Display></Display>
            <Display></Display>
          </ScrollArea>
        </div>
      </div>
      <div className="h-screen w-3/4 block float-right">
        <Map></Map>
      </div>
    </div>
  );
}
