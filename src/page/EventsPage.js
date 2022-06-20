import React from "react";
import Events from "../components/Events";
import FilterEvents from "../components/FilterEvents";

function EventsPage() {
  return (
    <div>
      <FilterEvents />
      <Events />
    </div>
  );
}

export default EventsPage;
