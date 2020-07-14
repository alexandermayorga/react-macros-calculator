import React from 'react'

export default function RadioInput(props) {
    return <input type="radio" name={props.name} value={props.value} onChange={props.changed} /> 
}
