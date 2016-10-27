/**
 * Created by biao on 28/9/2016.
 */
'use strict'
import React, { Component } from 'react';
import Remarkable from 'remarkable';
import * as d3 from "d3";
import * as topojson from "topojson";

export default class Svg1 extends Component {
    renderHistogram (){
        let data = d3.range(1000).map(d3.randomUniform(0,1));

        let formatCount = d3.format(",.0f");

        let margin = {top: 10, right: 30, bottom: 30, left: 30},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        let x = d3.scaleLinear()
            .rangeRound([0, width]);

        let bins = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(20))
            (data);

        let y = d3.scaleLinear()
            .domain([0, d3.max(bins, function(d) { return d.length; })])
            .range([height, 0]);
        let svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let bar = svg.selectAll(".bar")
            .data(bins)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

        bar.append("rect")
            .merge(bar)
            .attr("fill",'lightblue')
            .attr("x", 1)
            .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
            .attr("height", function(d) { return height - y(d.length); });

        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", 6)
            .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
            .attr("text-anchor", "middle")
            .text(function(d) { return formatCount(d.length); });

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
    }
    renderCircle (){
        const svg1 = d3.select('#svg1')
        svg1.attr('viewBox', '0 0 500 400')
        const fx = d3.scaleLinear().domain([1000,10 ]).range([10, 400])
        const fy = d3.scaleLog().domain([200, 1000000000]).range([10, 500])
        const fr = d3.scaleSqrt().domain([100,100000000]).range([5,50])
        const data = [{cx:fx('100'), cy:fy('10000000'),r:fr('50000000'),'fill':'red'}]
        let circles = svg1.selectAll('circle').data(data)

        circles.enter().append('circle').merge(circles)
            .attr('cx', function(d){ return d.cx})
            .attr('cy', function(d){ return d.cy})
            .attr('r', function(d){ return d.r})
            .attr('fill', function(d){ return d.fill})

        console.log(svg1)
        console.log(d3)
        console.log('x= '+ fx(30))
        console.log('y= ' + fy(500))
    }
    draw (geo){
        const margin = 75, width = 1920 - margin, height = 1080 - margin
        let svg = d3.select("#map1")
            .attr("width", width + margin)
            .attr("height", height + margin)
            .append("g")

        const projection = d3.geoMercator()
        const path = d3.geoPath().projection(projection)
        console.log('path')
        console.log(path)
        let map = svg.selectAll('path').data(geo.features)
                    .enter().append('path').attr('d', path)

    }
    draw_top (geo){
        const margin = 75, width = 1920 - margin, height = 1080 - margin
        let svg = d3.select("#map2")
            .attr("width", width + margin)
            .attr("height", height + margin)
            .append("g")

        const projection = d3.geoMercator()
        const path = d3.geoPath().projection(projection)
        console.log('path')
        console.log(path)
        let map = svg.selectAll('path').data(topojson.feature(geo, geo.objects.countries).features)
            .enter().append('path').attr('d', path)
    }
    renderMap(){
        d3.json('countries.geo.json', (geo) => {
            this.draw(geo)
        })
        d3.json('countries.topo.json', (geo) => {
            this.draw_top(geo)
        })
    }
    renderRange(){
        const data = d3.range(10).map(d3.randomUniform(5,20));
        const svg = d3.select('#svg1').attr('width', 200).attr('height', 200)
        let circles = svg.selectAll('circle').data(data)
        let color = d3.scaleLinear().domain([5,20]).range(['#000000','#ffffff'])
        let color2 = d3.scaleLinear().domain([5,20]).range(['#0000ff','#ff0000'])
        //console.log(color.interpolate(d3.interpolateHcl)(10))
        circles
            .attr('fill', function(d){ return color(d)})
            .enter().append('circle')
            .attr('fill', function(d){ return color2(d)})
            .merge(circles)
            .attr('cx', function(d, i){ return i*20+30})
            .attr('cy', 100)
            .attr('r', function(d){ return d })

        circles.exit().remove()
           //
    }
    componentDidUpdate (){
        //d3.select("body").selectAll('svg').filter(function(d){ return d.id != '#svg'}).remove()
        //let svg = d3.select('#svg1').html('')
        let map = d3.select('#map1').html('')
        let map1 = d3.select('#map2').html('')
        this.renderRange()
        console.log('2')
        //this.renderHistogram()
        //this.renderCircle()
        this.renderMap()
    }
    componentDidMount () {
        //this.renderCircle()
        //
        this.componentDidUpdate()
    }
    render (){
        return (
           <div>
            <h3>test</h3>
            <div style={{width:'500px', height:'400px', padding:'30px'}}>
            <svg style={{width: '100%'}} id="svg1"></svg>
            </div>
            <div style={{width:'100%', padding:'30px'}}>
            <svg style={{width: '100%'}} id="map1"></svg>
            <svg style={{width: '100%'}} id="map2"></svg>
            </div>
            </div>
        )
    }
}