import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: [],
      click: false,
    };
  }

  componentDidMount() {
    if (localStorage.inputs) {
      this.setState({ input: JSON.parse(localStorage.inputs) || [] });
    }
    window.addEventListener("beforeunload", this.handleUpdateLocalStorage);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleUpdateLocalStorage);
  }

  handleUpdateLocalStorage = () => {
    localStorage.setItem("inputs", JSON.stringify(this.state.input));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState((previousState) => ({
      input: previousState.input.concat(event.target[0].value),
    }));
  };

  handleClick = () => {
    this.setState((previousState) => ({
      click: !previousState.click,
    }));
  };

  handleClose = (index) => {
    this.setState((previousState) => ({
      input: previousState.input.splice(index, 1),
    }));
  };

  render() {
    const inputs = this.state.input;

    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
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
    return (
      <>
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
      </>
    );
  }
}

export default App;
