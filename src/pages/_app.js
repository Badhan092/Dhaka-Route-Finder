import "../styles/globals.scss";
import { LanguageProvider } from "@/context/LanguageContext";
import MainLayout from "@/components/Layouts/MainLayout";


export default function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </div>
    </LanguageProvider>
  );
}
