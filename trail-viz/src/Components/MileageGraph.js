import React from "react"
import { useState } from 'react';
import * as d3 from "d3";

function MileageGraph() {

    const [selected_state, change_selected_state] = useState("")

    function getStates() {
        return [
            "Georgia",
            "North Carolina",
            "North Carolina / Tennessee",
            "Tennessee",
            "Virginia",
            "West Virginia",
            "Maryland",
            "Pennsylvania",
            "New Jersey",
            "New York",
            "Connecticut",
            "Massachusetts",
            "Vermont",
            "New Hampshire",
            "Maine"
        ]
    }

    function getColors(state="") {
        const ret = [
            "#40493B",
            "#40493B",
            "#40493B",
            "#40493B",
            "#40493B",
            "#40493B",
            "#40493B",
            "#0093CD",
            "#40493B",
            "#40493B",
            "#40493B",
            "#40493B",
            "#40493B",
            "#40493B",
            "#40493B"
        ]
        const states = getStates()
        if (state === "" || state === "all") {
            for (let i = 0; i < states.length; ++i) {
                ret.push("#40493B")
            }
        }
        else {
            const idxToChange = states.indexOf(state)
            for (let i = 0; i < states.length; ++i) {
                if (i === idxToChange) {
                    ret.push("#0093CD")
                }
                else {
                    ret.push("#40493B")
                }
            }
        }
        return ret  
    }

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 30, bottom: 100, left: 90},
        width = 250 - margin.left - margin.right,
        height = 900 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#daily-mileage")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    /*
    d3.csv("../data/tigger-AT-thru-hike-2016.csv", (data) => {
        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, 26])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .call(d3.axisBottom(x).ticks(5));
        svg.append("text")             
            .attr("transform",
                    "translate(" + (width/2) + " ," + 
                                (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("Daily Mileage");
            
        // Y axis
        console.log(data)
        var y = d3.scaleBand()
            .range([ 0, height ])
            .domain(data.map((d) => { return 149 - d.DaySinceStart; }))
            .padding(.1);
        svg.append("g")
            .selectAll("text").remove()
            .call(d3.axisLeft(y))
            .select(".domain").remove()
            .call(d3.axisLeft(y).tickSize(0))
            
        var myColor = d3.scaleOrdinal().domain(getStates()).range(getColors(selected_state));
            
        //Bars
        svg.selectAll("myRect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", x(0) )
            .attr("y", function(d) { return y(d.DaySinceStart); })
            .attr("width", function(d) { return x(d.MileageForDay); })
            .attr("height", y.bandwidth() )
            .attr("fill", function (d){ return myColor(d.State); });
    })
    */

    const dropDownStates = ([""].concat(getStates())).map((x, idx) => <option value={x} key={idx}>{x}</option>)

    return (
        <div>
            <p>Currently selected state: {selected_state} </p>
            <select
                onChange={(event) => change_selected_state(event.target.value)}>
                {dropDownStates}
            </select>
        </div>
    )
}

export default MileageGraph