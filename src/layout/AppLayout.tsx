import { Outlet } from "react-router-dom";
import SideNavBar from "../components/NavBar";
import Header from "../components/Header";

export default function AppLayout() {
    return (
        <>
            <Header />
            <div className="flex">
                <div className="bg-gray-800 h-216 py-5 overflow-y-auto ">
                    <SideNavBar />
                </div>
                <div style={{ paddingLeft: "8rem" }} className="flex flex-col flex-1 gap-96 content-center py-6 bg-amber-100 text-gray-950">
                    <Outlet />
                </div>
            </div>
        </>
    )
}   