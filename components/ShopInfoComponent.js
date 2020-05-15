import React, { Component } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { postCart } from '../redux/ActionCreators';
import { SHOP } from '../shared/shop';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        shop: state.shop,
        cart: state.cart
    };
};

const mapDispatchToProps = {
    postCart: shopId => (postCart(shopId))
};

function RenderMerch(props) {

    const {shop} = props;

    if (shop) {
        return (
            <Card
                featuredTitle={shop.name}
                image={{uri: baseUrl + shop.image}}>
                <Text style={{margin: 10}}>
                    {shop.size}
                </Text>
                <Button
                    title="Add to Cart"
                    type='font-awesome'
                    color='#03719C'
                    onPress={() => props.cart ?
                        console.log('Already in Cart') : props.markCart()}
                />
            </Card>
        );
    }
    return <View />;
}

class ShopInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            shop: SHOP,
            cart: false
        };
    }

    markCart(shopId) {
        this.props.postCart(shopId);
    }

    static navigationOptions = {
        title: 'More Information'
    };

    render() {
        const shopId = this.props.navigation.getParam('shopId');
        const shop = this.props.shop.shop.filter(shop => shop.id === shopId)[0];
        return (
            <Animatable.View animation='fadeIn' duration={1500} delay={1000}>
                <ScrollView>
                    <RenderMerch
                        shop={shop} 
                        markCart={() => this.markCart(shopId)}
                    />
                </ScrollView>
            </Animatable.View>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShopInfo);