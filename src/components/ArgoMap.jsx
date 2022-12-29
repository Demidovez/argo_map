import {
  YMaps,
  Map,
  Placemark,
  Polygon,
  useYMaps,
} from "@pbe/react-yandex-maps";
import { useEffect, useMemo, useState } from "react";
import { API } from "../api";

const state = {
  zoom: 12,
  type: "yandex#satellite",
};

const ArgoMap = () => {
  const [fields, setFields] = useState([]);
  const [placeMarker, setPlaceMarker] = useState([]);
  const ymaps = useYMaps(["Map", "Placemark", "Template"]);

  useEffect(() => {
    const fields = API.getFields();

    // console.log(fields)

    setFields(fields);
    setPlaceMarker(JSON.parse(fields?.[0].Location)?.Center);
  }, []);

  //fields?.[0].Location.Center ||

  const MyIconContentLayout = useMemo(
    () =>
      ymaps &&
      ymaps.templateLayoutFactory?.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">111111</div>'
      ),
    [ymaps, ymaps?.templateLayoutFactory]
  );

  console.log(ymaps, ymaps?.templateLayoutFactory)

  return (
    <Map
      state={{ ...state, center: placeMarker }}
      width={"100%"}
      height={"100%"}
    >
      <Placemark
        geometry={placeMarker}
        options={{
          // iconContentLayout: '<div>1111</div>',
          // iconLayout: 'default#imageWithContent',
          iconContentLayout: MyIconContentLayout,
          // iconImageSize: [50, 50],
          // iconImageHref: n
        }}
       
      />
      {fields.map((field, index) => {
        const location = JSON.parse(field.Location);

        if (index === 0) {
          console.log(location?.Polygon);
        }

        return (
          <Polygon
            geometry={[location?.Polygon]}
            key={field.Id}
            options={{
              fillColor: "#FFFFFF00",
              strokeColor: "#FFFFFF",
              opacity: 1,
              strokeWidth: 3,
            }}
          />
        );
      })}
    </Map>
  );
};

export default ArgoMap;
