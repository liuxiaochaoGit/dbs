/**
 *  @Description:
 *  @date   $
 *  @author liuzhenchao
 *
 **/
import React, {Component} from 'react';

class Mine extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id='mine'>
                <h1>mine</h1>
                <a href="/">toApp</a>
            </div>
        )
    }
}

export default Mine