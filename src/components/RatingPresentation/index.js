import React, { Component } from 'react';
import { PieChart, Pie } from 'recharts';
import './style/style.sass'

export default class RatingPresentation extends Component {

    constructor(props) {
        super(props)

    }

    render() {

        /* Формируем объекты с рейтингом и размерами чарта */
        let rating = this.props.rating,
            data = [{ value: ( rating * 10 ) }, {fill: '#e6ac00', value: ( Math.abs(rating * 10 - 100) ) }];
            console.log(data)
            // [value: 6.6}, {fill: '#00000', value: 3.4}];

        return (
            <PieChart width={60} height={60} className="msearch__rating-presentation rating-presentation" >
                <Pie data={data} cx={25} cy={25} innerRadius={13} outerRadius={25} fill="#82ca9d" startAngle={540} endAngle={180}/>
                <text x={29} y={35} textAnchor="middle" fill={'#00000'} className="rating-presentation__text">{rating}</text>
            </PieChart>
        )
    }
}