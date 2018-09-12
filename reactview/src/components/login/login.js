import React, {Component} from 'react';
import {Button, WhiteSpace, WingBlank, List, InputItem} from 'antd-mobile';
import './login.css'


class Login extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id='login'>
                <InputItem placeholder="你的名字">
                   <i className='icon icon-camera icon_gray6'></i>
                </InputItem>
                <Button inline size="small">dsnvowur</Button>
            </div>
        )
    }
}

export default Login