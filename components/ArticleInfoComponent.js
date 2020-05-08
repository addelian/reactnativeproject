import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

function RenderArticle({article}) {
    if (article) {
        return (
            <Card
                featuredTitle={article.title}
                image={require('./images/hazy.jpg')}>
                <Text style={{margin: 10}}>
                    {article.text}
                </Text>
            </Card>
        );
    }
    return <View />;
}

function ArticleInfo(props) {
    return <RenderArticle article={props.article} />;
}

export default ArticleInfo;