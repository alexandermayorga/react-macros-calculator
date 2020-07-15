import React from 'react'

export default function RadioInput(props) {

    const checked = (props.checked === props.value ? true : false)

    return <input type="radio" name={props.name} value={props.value} onChange={props.changed} checked={checked}/> 
}
