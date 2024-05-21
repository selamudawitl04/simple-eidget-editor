// App.js
import React, { useEffect, useState } from "react";

import Tooltips from "./components/Tooltips";
import CanvaContainer from "./components/CanvaContainer";
import PropertyEditor from "./components/PropertyEditor";

function App() {
  const [activeWidgetIndex, setActiveWidgetIndex] = useState();

  const [widgets, setWidgets] = useState([]);

  // Listen for updateWidget event
  window.addEventListener("updateWidget", (e) => {
    const { index, widget } = e.detail;
    const updatedWidgets = [...widgets];
    console.log("listening to event", widget, updatedWidgets[index]);
    updatedWidgets[index] = { ...updatedWidgets[index], ...widget };
    setWidgets(updatedWidgets);
  });

  return (
    <div className="flex flex-col h-[100vh] w-[100vw]">
      <div className="flex h-full overflow">
        <div className="h-full w-[25%] col-span-3">
          <Tooltips />
        </div>
        <div className="h-full w-[50%]">
          <CanvaContainer
            setActiveWidgetIndex={setActiveWidgetIndex}
            activeWidgetIndex={activeWidgetIndex}
            widgets={widgets}
            setWidgets={setWidgets}
          />
        </div>
        <div className="h-full w-[25%]">
          <PropertyEditor
            activeWidgetIndex={activeWidgetIndex}
            activeWidget={widgets[activeWidgetIndex]}
            setWidgets={setWidgets}
            widgets={widgets}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
