import React from "react";
import FullCalendar, {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventInput,
  ViewMountArg,
} from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FunctionComponent } from "react";
import { useSetRecoilState } from "recoil";
import { contents, focusEventIdState } from "../stores/event-store";
import {
  selectedEndState,
  selectedStartState,
} from "../stores/select-range-store";
import mockDB from "../db";

const Calendar: FunctionComponent = () => {
  const setFocusEventId = useSetRecoilState(focusEventIdState);
  const setStart = useSetRecoilState(selectedStartState);
  const setEnd = useSetRecoilState(selectedEndState);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    //const calendarApi = selectInfo.view.calendar;
    setStart(selectInfo.start);
    setEnd(selectInfo.end);
    //calendarApi.unselect();
    //calendarApi.addEvent({
    //  id: "hoge",
    //  title: "hoge title",
    //  start: selectInfo.startStr,
    //  end: selectInfo.endStr,
    //  allDay: selectInfo.allDay,
    //  durationEditable: false,
    //});
  };
  const handleEventClick = (clickInfo: EventClickArg) => {
    setFocusEventId(clickInfo.event.id);
  };
  const renderEventContent = (contentInfo: EventContentArg) => {
    return {
      html: contentInfo.event.title.replace(/\n/g, "<br>"),
    };
  };
  const handleViewMount = (viewInfo: ViewMountArg) => {
    const currentCalendar = viewInfo.view;
    setStart(currentCalendar.currentStart);
    setEnd(currentCalendar.currentEnd);
  };
  // mock
  const INITIAL_EVENTS: EventInput[] = contents.map((content) => {
    return {
      id: content.id,
      title: content.name,
      start: content.start,
      color: mockDB.plan[content.plan].color,
    };
  });
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      initialView="timeGridWeek"
      editable={true}
      selectable={true}
      //selectMirror={true}
      //dayMaxEvents={true}
      //weekends={this.state.weekendsVisible}
      initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
      select={handleDateSelect}
      //businessHours={true}
      locale="ja"
      timeZone="Asia/Tokyo"
      slotMinTime="08:00"
      slotMaxTime="20:00"
      viewDidMount={handleViewMount}
      allDaySlot={false}
      expandRows={true}
      nowIndicator={true}
      eventContent={renderEventContent} // custom render function
      eventClick={handleEventClick}
      //eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
      // you can update a remote database when these fire:
      //eventAdd={function () {}}
      //eventChange={function () {}}
      //eventRemove={function () {}}
      //
    />
  );
};

export default Calendar;
