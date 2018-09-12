/**
 *  @Description:
 *  @date   $
 *  @author liuzhenchao
 *
 **/
import React, {Component} from 'react';

class List extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id='list'>
                <h1>list</h1>
                <a href="/mine">tomine</a>
            </div>
        )
    }
}

export default List