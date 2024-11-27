import { Component } from "react";
import "./Streamgraph.css";
import * as d3 from "d3";

class Streamgraph extends Component {
  state = {
    data: [
      {
        Date: "2024-01-01T00:00:00.000Z",
        "GPT-4": 120,
        Gemini: 20,
        "PaLM-2": 90,
        Claude: 50,
        "LLaMA-3.1": 60,
      },
      {
        Date: "2024-02-01T00:00:00.000Z",
        "GPT-4": 130,
        Gemini: 75,
        "PaLM-2": 35,
        Claude: 60,
        "LLaMA-3.1": 70,
      },
      {
        Date: "2024-03-01T00:00:00.000Z",
        "GPT-4": 50,
        Gemini: 50,
        "PaLM-2": 95,
        Claude: 65,
        "LLaMA-3.1": 80,
      },
      {
        Date: "2024-04-01T00:00:00.000Z",
        "GPT-4": 100,
        Gemini: 65,
        "PaLM-2": 80,
        Claude: 70,
        "LLaMA-3.1": 90,
      },
      {
        Date: "2024-05-01T00:00:00.000Z",
        "GPT-4": 60,
        Gemini: 50,
        "PaLM-2": 150,
        Claude: 75,
        "LLaMA-3.1": 100,
      },
      {
        Date: "2024-06-01T00:00:00.000Z",
        "GPT-4": 100,
        Gemini: 55,
        "PaLM-2": 60,
        Claude: 80,
        "LLaMA-3.1": 110,
      },
      {
        Date: "2024-07-01T00:00:00.000Z",
        "GPT-4": 180,
        Gemini: 50,
        "PaLM-2": 130,
        Claude: 85,
        "LLaMA-3.1": 120,
      },
      {
        Date: "2024-08-01T00:00:00.000Z",
        "GPT-4": 190,
        Gemini: 45,
        "PaLM-2": 100,
        Claude: 90,
        "LLaMA-3.1": 130,
      },
      {
        Date: "2024-09-01T00:00:00.000Z",
        "GPT-4": 200,
        Gemini: 40,
        "PaLM-2": 50,
        Claude: 95,
        "LLaMA-3.1": 140,
      },
      {
        Date: "2024-10-01T00:00:00.000Z",
        "GPT-4": 110,
        Gemini: 135,
        "PaLM-2": 80,
        Claude: 100,
        "LLaMA-3.1": 150,
      },
    ],
  };

  componentDidMount() {
    this.setState({ ...this.state });
  }

  componentDidUpdate() {
    var data = this.state.data;
    console.log(data);

    var margin = { top: 30, bot: 30, left: 40, right: 40 };
    var w = 700 - margin.left - margin.right;
    var h = 500 - margin.top - margin.bot;

    var container = d3
      .select(".graphContainer")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bot)
      .select(".g1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var keys = ["GPT-4", "Gemini", "PaLM-2", "Claude", "LLaMa-3.1"];

    // x-axis
    var x_data = data.map((d) => d3.timeMonth.offset(new Date(d.Date), 1));
    const x_scale = d3
      .scaleUtc()
      .domain([d3.min(x_data), d3.max(x_data)])
      .range([margin.left, w])
      .nice();
    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale).tickFormat(d3.timeFormat("%b")));

    // y-axis
    var y_data = data.map((d) => {
      let { Date, ...modelNames } = d;
      return modelNames;
    });
    const y_scale = d3.scaleLinear().domain([-200, 200]).range([h, 0]);
    container
      .selectAll(".y_axis_g")
      .data([0])
      .join("g")
      .attr("class", "y_axis_g")
      .call(d3.axisLeft(y_scale));

    // data
    var stacked = d3.stack().offset(d3.stackOffsetSilhouette).keys(keys)(data);
  }

  render() {
    return (
      <div className="streamgraph">
        <svg className="graphContainer">
          <g className="g1"></g>
        </svg>
      </div>
    );
  }
}

export default Streamgraph;
