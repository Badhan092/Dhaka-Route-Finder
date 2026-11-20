import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => (
    <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
            {children}
        </main>
        <Footer />
    </div>
);


export default MainLayout;