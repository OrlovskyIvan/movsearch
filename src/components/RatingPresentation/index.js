import React, { Component } from 'react';
import { PieChart, Pie } from 'recharts';
import './style/style.sass'

export default class RatingPresentation extends Component {

    render() {

        /* Формируем объекты с рейтингом и размерами чарта */
        let rating = this.props.rating,
            sizeObj = this.props.sizeObj,
            data = [{ value: ( rating * 10 ) }, {fill: '#e6ac00', value: ( Math.abs(rating * 10 - 100) ) }];

        return (
            <div>
                {sizeObj ? (
                        <PieChart width={sizeObj.width} height={sizeObj.height} className="msearch__rating-presentation rating-presentation" >
                            <Pie dataKey={"value"} data={data} cx={sizeObj.cx} cy={sizeObj.cy} innerRadius={sizeObj.innerRadius} outerRadius={sizeObj.outerRadius} fill="#82ca9d" startAngle={540} endAngle={180}/>
                            <text x={sizeObj.x} y={sizeObj.y} textAnchor="middle" fill={sizeObj.fill} className="rating-presentation__text" style={sizeObj.style}>{rating}</text>
                        </PieChart>
                ) : (
                    <PieChart width={60} height={60} className="msearch__rating-presentation rating-presentation" >
                        <Pie dataKey={"value"} data={data} cx={25} cy={25} innerRadius={13} outerRadius={25} fill="#82ca9d" startAngle={540} endAngle={180}/>
                        <text x={29} y={35} textAnchor="middle" fill={'#00000'} className="rating-presentation__text">{rating}</text>
                    </PieChart>
                )}
            </div>
        )
    }
}