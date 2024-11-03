import React from "react";
import Modal from "./components/Modal/Modal";
import BentoGrid from "./components/Bento/bentoGrid";
import { useGetApi } from "./Hooks/useGetApi";
import ToolBar from "./components/ToolBar/toolBar";
import { CountryProvider } from "./utils/countryContext";

const App: React.FC = () => {
  const { countries, continents, loading, error } = useGetApi();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <CountryProvider
      initialCountries={countries}
      initialContinents={continents}
    >
      <ToolBar />

      <BentoGrid />
      <Modal />
    </CountryProvider>
  );
};

export default App;
