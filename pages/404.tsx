/** @jsx h */
/** @jsxFrag f */
import { h, Fragment as f } from "../libs/nano_jsx.ts";
import Navbar from "../components/Navbar.tsx";

export default function Home() {
    return (
        <>
            <Navbar />
            <div class="w-screen h-screen flex justify-center items-center">
                <p class="font-bold text-2xl">Page not found</p>
            </div>
        </>
    )
}
