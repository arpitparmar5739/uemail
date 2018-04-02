import { createStore, Store } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { ApplicationState, reducers } from './store';

export default function configureStore(
  initialState: ApplicationState,
): Store<ApplicationState> {
  return createStore<ApplicationState>(
    reducers,
    initialState,
    devToolsEnhancer({}));
}
