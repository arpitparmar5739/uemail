import { createStore, Store } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { ApplicationState, rootReducer } from './store';

export default function configureStore(initialState: ApplicationState): Store<ApplicationState> {
  return createStore<ApplicationState>(
    rootReducer,
    (<any>Object).assign({}, initialState),
    devToolsEnhancer({}));
}
