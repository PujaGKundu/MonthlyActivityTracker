import React from "react";

class Activity extends React.Component {
  render() {
    return (
      <>
        <div className="block">
          <div className="flex">
            <div className="activity">
              <div className="data">
                <h2>{this.props.details.name}</h2>

                <p className="month">{this.props.month}</p>
              </div>
            </div>
            <div className="grid">
              {this.props.details.days.map((day) => {
                return (
                  <button
                    onClick={() => {
                      this.props.handleToggle(day.id, this.props.details.name);
                    }}
                    className={day.isDone ? "date active" : "date"}
                  >
                    {day.id}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            name="delete"
            onClick={(e) => {
              this.props.handleDelete(e, this.props.index);
            }}
            className="cross"
          >
            X
          </button>
        </div>
      </>
    );
  }
}

export default Activity;
