import PushNotification from 'react-native-push-notification';
export default class NotifService {

    constructor(onRegister, onNotification) {
        this.configure(onRegister, onNotification);
    }

    configure(onRegister, onNotification) {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: onRegister,
            // (required) Called when a remote or local notification is opened or received
            onNotification: onNotification,
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: false,
            /**
              * (optional) default: true
              * - Specified if permissions (ios) and token (android and ios) will requested or not,
              * - if not, you must call PushNotificationsHandler.requestPermissions() later
              */
            requestPermissions: true,
        });
    }
}