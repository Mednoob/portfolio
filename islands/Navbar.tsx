/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Navbar() {
    return (
        <div class={tw`w-screen p-5 flex justify-center items-center bg-slate-700 text-gray-300`}>
            <a class={tw`font-bold text-xl`} href="/">Home</a>
        </div>
    )
}
