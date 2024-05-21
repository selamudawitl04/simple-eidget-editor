import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import Konva from "konva";

function CanvaContainer({
  setActiveWidgetIndex,
  widgets,
  setWidgets,
  activeWidgetIndex,
}) {
  const handleDragStart = (e, index) => {
    setActiveWidgetIndex(index);
    e.target.setAttrs({
      scaleX: 1.1,
      scaleY: 1.1,
    });
  };

  const handleDragEnd = (e) => {
    // change the widget position
    const updatedWidgets = [...widgets];

    updatedWidgets[activeWidgetIndex] = {
      ...updatedWidgets[activeWidgetIndex],
      x: e.target.x(),
      y: e.target.y(),
    };

    setWidgets(updatedWidgets);

    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
    });
  };

  const addRectangle = (x, y) => {
    const newRect = {
      x: x,
      y: y,
      width: 100,
      height: 50,
      fill: "#318CE7",
      cornerRadius: 10,
      draggable: true,
      label: "Button",
      labelSize: 15,
      labelAlignment: "center",
      labelColor: "#ffffff",
    };

    setWidgets([...widgets, newRect]);
  };

  const [stageDimensions, setStageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const stageContainer = stageRef.current?.parentNode;
      if (stageContainer) {
        setStageDimensions({
          width: stageContainer.clientWidth,
          height: stageContainer.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const stageRef = React.useRef();

  const handleWidgetSelection = (ev, index) => {
    setActiveWidgetIndex(index);
  };

  return (
    <div
      className="relative w-full h-full"
      ref={stageRef}
      onDrop={(e) => {
        e.preventDefault();
        stageRef.current.setPointersPositions(e);

        const data = JSON.parse(e.dataTransfer.getData("widget"));

        const position = stageRef.current.getPointerPosition();

        if (data.type === "button") {
          addRectangle(position.x, position.y);
        }
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <Stage
        width={stageDimensions.width}
        height={stageDimensions.height}
        className="w-full h-full bg-gray-100"
        ref={stageRef}
      >
        <Layer>
          {widgets.length > 0 &&
            widgets.map((shape, i) => {
              if (shape.width && shape.height) {
                return (
                  <Rect
                    key={i}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    {...shape}
                    onDragStart={(ev) => handleDragStart(ev, i)}
                    onDragEnd={handleDragEnd}
                    onClick={(ev) => handleWidgetSelection(ev, i)}
                  />
                );
              }
              return null;
            })}
        </Layer>
      </Stage>
    </div>
  );
}

export default CanvaContainer;
