import { createStore, Store } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { ApplicationState, rootReducer } from './store';

export default function configureStore(initialState: ApplicationState,
                                       devmode: boolean = false): Store<ApplicationState> {
  if (devmode) {
    return createStore<ApplicationState>(
      rootReducer,
      (<any>Object).assign({}, initialState),
      devToolsEnhancer({}));
  } else {
    return createStore<ApplicationState>(
      rootReducer,
      (<any>Object).assign({}, initialState)
    );
  }
}
