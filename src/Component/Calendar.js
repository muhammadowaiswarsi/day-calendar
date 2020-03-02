import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import Events from "./data.json";

import "./main.scss";

export default class DemoApp extends React.Component {
  calendarComponentRef = React.createRef();
  state = {
    calendarEvents: []
  };

  handleDateClick = arg => {
    const title = prompt("Enter Event Name");
    const end = prompt("Enter End Time With Format 00:00");
    let endDate = arg.dateStr && arg.dateStr.split("T")[0];

    this.setState({
      // add new event data
      calendarEvents: this.state.calendarEvents.concat({
        // creates a new array
        title: title,
        start: arg.date,
        end: `${endDate}T${end}`,
        allDay: arg.allDay
      })
    });
  };

  componentDidUpdate() {
    var item = document.querySelectorAll(
      "#root > div > div > div > div.fc-view-container > div.fc-view.fc-timeGridDay-view.fc-timeGrid-view > table > tbody > tr > td > div.fc-day-grid > div > div.fc-content-skeleton > table > tbody > tr > td.fc-event-container > a"
    )[0];
    item && item.classList.add("fc_first");
  }

  componentDidMount() {
    let events = Events.map(item => {
      return {
        title: item.title,
        start: new Date(item.start),
        end: item.end,
        allDay: item.allDay
      };
    });
    this.setState({
      calendarEvents: events
    });
  }

  render() {
    return (
      <div className="demo-app">
        <div className="demo-app-calendar">
          <FullCalendar
            defaultView="timeGridDay"
            header={{
              left: "",
              center: "",
              right: "title"
            }}
            plugins={[
              timeGridPlugin,
              interactionPlugin,
              resourceTimeGridPlugin
            ]}
            ref={this.calendarComponentRef}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
          />
        </div>
      </div>
    );
  }
}
