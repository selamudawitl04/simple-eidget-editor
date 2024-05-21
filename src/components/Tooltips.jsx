import React, { useState } from "react";

import { Icon } from "@iconify-icon/react";

function Tooltips() {
  const [widgets, setWidgets] = useState([
    {
      name: "Button",
      type: "button",
      icon: "fluent-emoji-high-contrast:ok-button",
    },
  ]);

  const [currentTab, setCurrentTab] = useState("widgets");

  const dragObject = React.useRef();

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="py-2 text-xl text-center text-white bg-gray-800">
        Toolbox
      </h1>
      <div className="flex items-center bg-gray-200">
        <button
          className={
            currentTab === "widgets"
              ? "bg-white px-5 py-2 "
              : "bg-gray-200 px-5 py-2 "
          }
          onClick={() => setCurrentTab("widgets")}
        >
          Widgets
        </button>
        <button
          className={
            currentTab === "projects"
              ? "px-5 py-2 bg-white"
              : "px-5 py-2 bg-gray-200"
          }
          onClick={() => setCurrentTab("projects")}
        >
          Projects
        </button>
      </div>

      <div className="flex-grow">
        <h2 className="px-5 py-2 bg-white">Basics</h2>
        {/* Widgets */}
        <div className="h-full">
          <div className="flex flex-wrap h-full gap-3 p-3 bg-sky-950">
            {widgets.map((widget, i) => {
              return (
                <div
                  value={widget}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("widget", JSON.stringify(widget));
                    dragObject.current = e.target.value;
                  }}
                  key={i}
                  className="flex flex-col items-center px-10 py-2 rounded-lg cursor-pointer h-max bg-sky-400"
                >
                  <button key={i} className="text-sky-950">
                    <Icon icon={widget.icon} className="text-3xl" />
                  </button>
                  <span>{widget.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tooltips;
