/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import PopupDialogExample from './src/DialogComponent/react-native-popup-dialog/PopupDialogExample';
import SelectDateDialog from './src/DialogComponent/react-native-popup-dialog/SelectDateDialog';
import TraceComponentIndex from './src/TraceComponent/TraceComponentIndex';
import RNLinearGradientExample from './src/RNLinearGradient/RNLinearGradientExample';
import IndexListComponentExample from './src/IndexListComponent/IndexListComponentExample';

AppRegistry.registerComponent(appName, () => IndexListComponentExample);
