/**
 * Created by zhubg on 2016/6/22.
 */

import React from 'react';
import {Button} from 'antd';

/* create factory with griddle component */
// var Griddle = React.createFactory(require('griddle-react'));

// var fakeData = require('../data/fakeData.js').fakeData;
// var columnMeta = require('../data/columnMeta.js').columnMeta;
// var resultsPerPage = 200;

export default class SupportDoneButton extends React.Component {
    render() {
        return (
            <Button type="primary" size="large"
                    style={{
                    flex:1,
                    height:30,
                    marginLeft:20,
                    marginRight:10,
                    backgroundColor:'rgba(0, 255, 0, 0.9)',
                    fontWeight:'bold',
                    fontColor:'#FFF'
                    }}
                    disabled
            >
                <span style={{color:'black'}}>已支持</span>
            </Button>
        )
    }
}
