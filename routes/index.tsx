/** @jsx h */
import { h, Fragment as frag } from "preact";
import { tw } from "@twind";
import Navbar from "../islands/Navbar.tsx";

export default function Home() {
  return (
    <div class={tw`overflow-x-hidden`}>
        <Navbar />
        <div class={tw`w-screen h-screen flex justify-center items-center`}>
            <p class={tw`font-bold text-2xl`}>Hello, world!</p>
        </div>
    </div>
  );
}
