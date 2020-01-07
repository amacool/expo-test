import * as React from 'react';
import { Animated, View, StyleSheet } from 'react-native';

type Props = {
    route: any,
    navigation: any,
    horizontal?: boolean,
    activeOpacity: any,
    inactiveOpacity: any,
    activeTintColor: any,
    inactiveTintColor: any,
    renderIcon: any,
    style: any,
};

export default class TabBarIcon extends React.Component<Props> {
    render() {
        const {
            route,
            activeOpacity,
            inactiveOpacity,
            activeTintColor,
            inactiveTintColor,
            renderIcon,
            horizontal,
            style,
        } = this.props;

        // render the icon twice at the same position on top of each other:
        // active and inactive one, so we can fade between them.
        return (
            <View style={style}>
                <Animated.View style={[styles.icon, { opacity: activeOpacity }]}>
                    {renderIcon({
                        route,
                        focused: true,
                        horizontal,
                        tintColor: activeTintColor,
                    })}
                </Animated.View>
                <Animated.View style={[styles.icon, { opacity: inactiveOpacity }]}>
                    {renderIcon({
                        route,
                        focused: false,
                        horizontal,
                        tintColor: inactiveTintColor,
                    })}
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        // render the icon twice at the same position on top of each other:
        // active and inactive one, so we can fade between them:
        // Cover the whole iconContainer:
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        minWidth: 25,
    },
});