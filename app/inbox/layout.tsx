"use client";

import { useQuery } from "convex/react";


import { api } from "@/convex/_generated/api";

import { Sidebar } from "./components/sidebar";
import ConversationList from "./components/sidebar/conversation-list";
import Navbar from "../(dashboard)/components/navbar";

export default function ConversationsLayout({
    children
}: {
    children: React.ReactNode,
}) {
    return (
        <>
            <div className="fixed z-10 w-full">
                <Navbar />
            </div>
            <div className="pt-[88px]">
                <Sidebar>
                    <div className="h-full">
                        <ConversationList />
                    </div>
                </Sidebar>
                <div className="h-full lg:pl-[300px]">
                    {children}
                </div>
            </div>

        </>
    );
}