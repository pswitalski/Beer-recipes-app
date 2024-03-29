import React from 'react';

import {button} from 'components/Button/Button.module.scss';

const Button = ({content, clickHandler, style, type, submitHandler}) => {
    return(
        <button className={button} onClick={clickHandler} style={style} type={type} onSubmit={submitHandler}  >{content}</button>
    )
}

export default Button;