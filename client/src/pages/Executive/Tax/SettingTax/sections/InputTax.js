import React from 'react'

function InputTax(props) {
  //console.log('inputtax',props.value)                step="5"

    return (
        <>
         <label htmlFor={`${props.title}`}>{props.title}</label>
            <div className="input-group mb-3">
              <input
                defaultValue={props.value}
                type="number"
                className="form-control"
                id={`${props.id}`}
                placeholder={props.title.split(':')[0]}
                min="0"
                max="100"
                readOnly={props.readOnly}
                onChange={props.onChange}
              />
              <div className="input-group-append">
                <span className="input-group-text" id="percent11"
                >{props.unit}
                </span>
              </div>
            </div>   
        </>
    )
}

export default InputTax
