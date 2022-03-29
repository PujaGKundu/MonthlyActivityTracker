import React from "react";
import Activity from "./Activity";
import { emptyMonth } from "../data";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      inputValue: "",
    };
    //binding methods
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    let activities = localStorage.getItem("activity-monitor")
      ? JSON.parse(localStorage.getItem("activity-monitor"))
      : [];
    this.setState({ activities });
  }

  componentDidUpdate() {
    localStorage.setItem(
      "activity-monitor",
      JSON.stringify(this.state.activities)
    );
  }

  handleToggle(id, name) {
    const activities = JSON.parse(JSON.stringify(this.state.activities));
    activities.forEach((activity) => {
      if (activity.name === name) {
        activity.days.forEach((day) => {
          if (day.id === id) {
            day.isDone = !day.isDone;
          }
        });
      }
    });
    this.setState({
      activities: activities,
    });
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  handleClick(e, index) {
    let activityArray = [...this.state.activities];

    if (e.target.name === "delete") {
      activityArray.splice(index, 1);
      this.setState({
        activities: [...activityArray],
      });
      return;
    }

    if (this.state.inputValue) {
      this.setState(
        (prevState) => {
          return {
            activities: prevState.activities.concat([
              {
                name: this.state.inputValue,
                days: [...emptyMonth],
              },
            ]),
          };
        },
        () => {
          this.setState({ inputValue: "" });
        }
      );
    }
  }

  render() {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    /*
    const year = new Date().getFullYear();
    function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }
    let days = daysInMonth(date.getMonth() + 1, year);
    
    let dates = [];

    for (let i = 1; i <= days; i++) {
      dates.push(
        <li
          key={i}
          onClick={() => this.handleClick(i)}
          className={this.state.click ? "date active" : "date"}
        >
          {i}
        </li>
      );
    }
    */
    return (
      <>
        {/*
        <h1>Monthly Activity Tracker!</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="e.g. coding" />
          <button>Add Activity</button>
        </form>
        
        {inputs.map((i, index) => (
          <div key={index} className={i !== [] ? "block" : "hidden"}>
            <span onClick={() => this.handleClose(index)} className="cross">
              X
            </span>
            <div className="flex">
              <div className="activity">
                <h2>{i}</h2>
                <div className="month">{month}</div>
              </div>
              <ul className="grid">{dates}</ul>
            </div>
          </div>
        ))}
        */}
        <div>
          <h1>Monthly Activity Tracker!</h1>
          <div>
            <form onSubmit={this.handleClick}>
              <input
                type="text"
                name="activity"
                onChange={this.handleChange}
                value={this.state.inputValue}
                placeholder="e.g. coding"
              />

              <button onClick={this.handleClick} type="submit">
                Add Activity
              </button>
            </form>
          </div>
          {this.state.activities.map((activity, index) => {
            return (
              <Activity
                details={activity}
                index={index}
                handleToggle={this.handleToggle}
                handleDelete={this.handleClick}
                month={month}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default App;
