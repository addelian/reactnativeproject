import React, { Component } from 'react';
import Newsfeed from './NewsfeedComponent';
import { ARTICLES } from '../shared/articles';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: ARTICLES
        };
    }

    render() {
        return <Newsfeed articles={this.state.articles} />;
    }
}

export default Main;