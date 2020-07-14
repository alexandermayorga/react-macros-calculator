import React from 'react'

export default function NumberInput(props) {
    return <input 
        type="number" 
        className="form-control" 
        onChange={props.changed}
        value={props.value || 0}
        step={props.step}
        min={props.min}
        max={props.max}
        />
}
