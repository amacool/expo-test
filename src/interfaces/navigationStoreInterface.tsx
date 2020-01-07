interface INavigationStore {
    _navigator: any;    setRef: (ref: any) => void;
    navigateTo: (routeName: string, params?: any) => void;
    resetTo: (routeName: string, params?: any) => void;
    back: () => void;
}