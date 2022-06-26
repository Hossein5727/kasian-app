import EventDetail from "../components/EventDetail";
import EventSuggestions from "../components/EventSuggestions";

function EventDetailPage() {
  return (
    <div className="w-full px-4 py-3 flex gap-3">
      <div className="w-[30%]">
        <EventSuggestions />
      </div>
      <div className="w-[70%]">
        <EventDetail />
      </div>
    </div>
  );
}

export default EventDetailPage;
