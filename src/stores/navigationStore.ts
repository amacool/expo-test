import { action, observable } from 'mobx';
import { NavigationActions, StackActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';

class NavigationStore implements INavigationStore {
    _navigator;

    @action setRef = (navigationRef) => {
        this._navigator = navigationRef;
    }

    @action navigateTo = (routeName: string, params?: any) => {
        this._navigator.dispatch(
            StackActions.push({ routeName, params })
        );
    }
    setNavigation = async () => {
        const isRestarting = await AsyncStorage.getItem('isRestarting');
        if (isRestarting === 'true') {
            AsyncStorage.removeItem('isRestarting');
        } else {
            this.resetTo('splash');
        }
    }

    @action resetTo = (routeName: string, params?: any) => {
        try {
            this._navigator.dispatch(
                StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName, params }),
                    ],
                })
            );
        } catch (error) {
            console.log(error);
        }
    }

    @action back = () => {
        this._navigator.dispatch(
            StackActions.pop(null)
        );
    }
}

export default new NavigationStore();
