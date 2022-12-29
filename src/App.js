import React, { useEffect, useState } from "react";
import ArgoMap from "./components/ArgoMap";
import { YMaps } from "@pbe/react-yandex-maps";
import { API } from "./api";

function App() {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    API.getFields().then((fields) => setFields(fields));
  }, []);

  return (
    <div className="app">
      <YMaps>
        <ArgoMap fields={fields} />
      </YMaps>
    </div>
  );
}

export default App;
