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

    var margin = { top: 30, bot: 30, left: 40, right: 40 };
    var w = 600 - margin.left - margin.right;
    var h = 500 - margin.top - margin.bot;

    var container = d3
      .select(".graphContainer")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bot)
      .select(".g1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // x-axis
    data.forEach(function (d) {
      d.Date = d3.timeDay.offset(new Date(d.Date), 1);
    });
    var x_data = data.map((d) => d.Date);
    console.log(x_data);

    const x_scale = d3
      .scaleTime()
      .domain([d3.min(x_data), d3.timeMonth.offset(d3.max(x_data), -1)])
      .range([margin.left, w])
      .nice();

    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h + 5})`)
      .call(d3.axisBottom(x_scale).tickFormat(d3.timeFormat("%b")));

    const y_scale = d3.scaleLinear().domain([-300, 300]).range([h, 0]);
    // container
    //   .selectAll(".y_axis_g")
    //   .data([0])
    //   .join("g")
    //   .attr("class", "y_axis_g")
    //   .attr("transform", `translate(${margin.left - 5}, 0)`)
    //   .call(d3.axisLeft(y_scale));

    // streamdata
    var keys = ["GPT-4", "Gemini", "PaLM-2", "Claude", "LLaMA-3.1"];
    var stacked = d3.stack().offset(d3.stackOffsetSilhouette).keys(keys)(data);
    var color = d3
      .scaleOrdinal()
      .domain(keys)
      .range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"]);

    const area = d3
      .area()
      .curve(d3.curveNatural)
      .x(function (d) {
        return x_scale(d.data.Date);
      })
      .y0(function (d) {
        return y_scale(d[0]);
      })
      .y1(function (d) {
        return y_scale(d[1]);
      });

    container
      .selectAll("mylayers")
      .data(stacked)
      .enter()
      .append("path")
      .attr("class", "myArea")
      .style("fill", function (d) {
        return color(d.key);
      })
      .attr("d", area);
    
    // tooltip
  }

  render() {
    return (
      <div className="streamgraph">
        <svg className="graphContainer">
          <g className="g1"></g>
        </svg>
        <div className="legend">
          <div className="legitem">
            <div className="box" style={{ backgroundColor: "#ff7f00" }}></div>
            GPT-4
          </div>
          <div className="legitem">
            <div className="box" style={{ backgroundColor: "#984ea3" }}></div>
            Gemini
          </div>
          <div className="legitem">
            <div className="box" style={{ backgroundColor: "#4daf4a" }}></div>
            PaLM-2
          </div>
          <div className="legitem">
            <div className="box" style={{ backgroundColor: "#377eb8" }}></div>
            Claude
          </div>
          <div className="legitem">
            <div className="box" style={{ backgroundColor: "#e41a1c" }}></div>
            LLaMA-3.1
          </div>
        </div>
      </div>
    );
  }
}

export default Streamgraph;
