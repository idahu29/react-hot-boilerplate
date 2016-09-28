/**
 * Created by biao on 28/9/2016.
 */
import React, { Component } from 'react';
import Remarkable from 'remarkable';
import * as d3 from "d3";

export default class Svg1 extends Component {
    componentDidUpdate (){
        const svg1 = d3.select('#svg1')
        svg1.attr('viewBox', '0 0 500 400')
        const fx = d3.scaleLinear().domain([1000,10 ]).range([10, 400])
        const fy = d3.scaleLog().domain([200, 1000000000]).range([10, 500])
        const fr = d3.scaleSqrt().domain([100,100000000]).range([5,50])
        const data = [{cx:fx('100'), cy:fy('10000000'),r:fr('50000000'),'fill':'red'}]
        var circles = svg1.selectAll('circle').data(data)

        circles.enter().append('circle').merge(circles)
            .attr('cx', function(d){ return d.cx})
            .attr('cy', function(d){ return d.cy})
            .attr('r', function(d){ return d.r})
            .attr('fill', function(d){ return d.fill})

        console.log(svg1)
        console.log(d3)
        console.log('x= '+ fx(30))
        console.log('y= ' + fy(500))
        //this.render()

    }
    render (){
        return (
           <div style={{width:'500px', height:'400px'}}>
            <h3>test</h3>
            <svg style={{width: '100%'}} id="svg1"></svg>
           </div>
        )
    }
}