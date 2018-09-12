import React, {Component} from 'react';
import List from '../list/list'

class Main extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id='main'>
                <h1>main</h1>
                <a href="/login">tologin</a>
                <List></List>
            </div>
        )
    }
}

export default Main