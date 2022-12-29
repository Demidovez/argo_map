import {
  Map,
  Placemark,
  Polygon,
  useYMaps,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import { Fragment, useEffect, useMemo, useState } from "react";

const POLYGON_OPTIONS = {
  fillColor: "#FFFFFF00",
  strokeColor: "#FFFFFF",
  opacity: 1,
  strokeWidth: 3,
};

const ArgoMap = ({ fields = [] }) => {
  const ymaps = useYMaps(["templateLayoutFactory"]);

  const [stateOfMap, setStateOfMap] = useState();

  useEffect(() => {
    if (fields.length) {
      setStateOfMap({
        zoom: 14,
        type: "yandex#satellite",
        center: fields[0].Location?.Center,
      });
    }
  }, [fields]);

  // Layout of marker by yandex design
  const MarkerLayout = useMemo(
    () =>
      ymaps &&
      ymaps.templateLayoutFactory.createClass(
        '<div class="field-marker">{{ properties.name|default:"?" }}</div>'
      ),
    [ymaps]
  );

  return (
    <>
      {stateOfMap && (
        <Map state={stateOfMap} width={"100%"} height={"100%"}>
          <ZoomControl />
          {fields.map((field) => (
            <Fragment key={field.Id}>
              <Placemark
                geometry={field.Location?.Center}
                options={{
                  iconLayout: MarkerLayout,
                }}
                properties={{ name: field.Name }}
              />
              <Polygon
                geometry={[field.Location?.Polygon]}
                options={POLYGON_OPTIONS}
              />
            </Fragment>
          ))}
        </Map>
      )}
    </>
  );
};

export default ArgoMap;
