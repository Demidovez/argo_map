import React from "react";
import ArgoMap from "./components/ArgoMap";
import { YMaps } from "@pbe/react-yandex-maps";

function App() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <YMaps>
        <ArgoMap />
      </YMaps>
    </div>
  );
}

export default App;
