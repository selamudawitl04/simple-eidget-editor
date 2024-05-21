import { Icon } from "@iconify-icon/react";
import React, { useEffect, useState } from "react";

function PropertyEditor({
  activeWidget,
  activeWidgetIndex,
  setWidgets,
  widgets,
}) {
  const [currentTab, setCurrentTab] = useState("property");

  const [xValue, setXValue] = useState();
  const [yValue, setYValue] = useState();
  const [widthValue, setWidthValue] = useState();
  const [heightValue, setHeightValue] = useState();
  const [fillValue, setFillValue] = useState();
  const [cornerRadiusValue, setCornerRadiusValue] = useState();
  const [strokeValue, setStrokeValue] = useState();
  const [strokeWidthValue, setStrokeWidthValue] = useState();

  useEffect(() => {
    setXValue(activeWidget?.x);
    setYValue(activeWidget?.y);
    setWidthValue(activeWidget?.width);
    setHeightValue(activeWidget?.height);
    setFillValue(activeWidget?.fill);
    setCornerRadiusValue(activeWidget?.cornerRadius);
    setStrokeValue(activeWidget?.stroke);
    setStrokeWidthValue(activeWidget?.strokeWidth);
  }, [activeWidget]);

  const emitEvent = () => {
    const widget = {
      x: xValue,
      y: yValue,
      width: widthValue,
      height: heightValue,
      fill: fillValue,
      cornerRadius: cornerRadiusValue,
      stroke: strokeValue,
      strokeWidth: strokeWidthValue,
    };

    console.log("emitting change", widget);

    const updatedWidgets = [...widgets];

    updatedWidgets[activeWidgetIndex] = {
      ...updatedWidgets[activeWidgetIndex],
      ...widget,
    };
    setWidgets(updatedWidgets);
  };

  useEffect(() => {
    const widget = {
      x: parseFloat(xValue) || 0,
      y: parseFloat(yValue) || 0,
      width: parseFloat(widthValue) || 0,
      height: parseFloat(heightValue) || 0,
      fill: fillValue || "#000000",
      cornerRadius: parseFloat(cornerRadiusValue) || 0,
      stroke: strokeValue || "#000000",
      strokeWidth: parseFloat(strokeWidthValue) || 0,
    };

    const updatedWidgets = [...widgets];

    updatedWidgets[activeWidgetIndex] = {
      ...updatedWidgets[activeWidgetIndex],
      ...widget,
    };

    setWidgets(updatedWidgets);
  }, [
    xValue,
    yValue,
    widthValue,
    heightValue,
    fillValue,
    cornerRadiusValue,
    strokeValue,
    strokeWidthValue,
  ]);
  return (
    <div>
      <h2 className="py-2 text-xl text-center text-white bg-gray-600">
        Button Settings
      </h2>
      <div className="flex items-center bg-gray-200">
        <button
          className={
            currentTab === "property"
              ? "bg-white px-5 py-2 "
              : "bg-gray-200 px-5 py-2 "
          }
          onClick={() => setCurrentTab("property")}
        >
          <Icon icon={"fluent:settings-20-regular"} />
          Property
        </button>
        <button
          className={
            currentTab === "events"
              ? "px-5 py-2 bg-white"
              : "px-5 py-2 bg-gray-200"
          }
          onClick={() => setCurrentTab("events")}
        >
          <Icon icon={"fluent:calendar-20-regular"} />
          Events
        </button>
      </div>
      <div className="px-2">
        <div>
          <p>Name</p>
          <input type="text" name="name" id="name" placeholder="~btn1" />
        </div>

        <div>
          <h1>Layout Transform</h1>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p>X:</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="border-4 border-black bg-gray-100 max-w-[100px]"
                  name="x"
                  id="x"
                  value={xValue}
                  onChange={(e) => {
                    setXValue(e.target.value);
                  }}
                />
                <span className="text-lg">px</span>
              </div>
            </div>

            <div>
              <p>Y:</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="border-4 border-black bg-gray-100 max-w-[100px]"
                  name="y"
                  id="y"
                  value={yValue}
                  onChange={(e) => {
                    setYValue(e.target.value);
                  }}
                />
                <span className="text-lg">px</span>
              </div>
            </div>

            <div>
              <p>Width:</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="border-4 border-black bg-gray-100 max-w-[100px]"
                  name="width"
                  id="width"
                  value={widthValue}
                  onChange={(e) => {
                    setWidthValue(e.target.value);
                  }}
                />
                <span className="text-lg">px</span>
              </div>
            </div>

            <div>
              <p>Height:</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="border-4 border-black bg-gray-100 max-w-[100px]"
                  name="height"
                  id="height"
                  value={heightValue}
                  onChange={(e) => {
                    setHeightValue(e.target.value);
                  }}
                />
                <span className="text-lg">px</span>
              </div>
            </div>

            <div>
              <p>Layout Align:</p>
              <div className="flex items-center gap-2">
                <select
                  name="alignment"
                  id="alignment"
                  value={"center"}
                  className="w-[100px] py-2"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1>Style</h1>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p>Background Color:</p>
              <input
                type="color"
                name="backgroundColor"
                id="backgroundColor"
                value={fillValue || "#000000"}
                onChange={(e) => {
                  setFillValue(e.target.value);
                }}
              />
            </div>

            <div>
              <p>Border Radius:</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="border-4 border-black bg-gray-100 max-w-[100px]"
                  name="borderRadius"
                  id="borderRadius"
                  value={cornerRadiusValue || 0}
                  onChange={(e) => {
                    setCornerRadiusValue(e.target.value);
                  }}
                />
                <span className="text-lg">px</span>
              </div>
            </div>

            <div>
              <p>Border Color:</p>
              <input
                type="color"
                name="borderColor"
                id="borderColor"
                value={strokeValue || "#000000"}
                onChange={(e) => {
                  setStrokeValue(e.target.value);
                }}
              />
            </div>

            <div>
              <p>Border Width:</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="border-4 border-black bg-gray-100 max-w-[100px]"
                  name="borderWidth"
                  id="borderWidth"
                  value={strokeWidthValue || 0}
                  onChange={(e) => {
                    setStrokeWidthValue(e.target.value);
                  }}
                />
                <span className="text-lg">px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyEditor;
