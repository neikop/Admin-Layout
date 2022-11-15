import { io } from 'socket.io-client';
import { newBalance, ProfileState } from 'reducers/profileSlice';
import { store } from 'reducers/store';
import { saveSystem } from 'reducers/systemSlice';

export class Socket {
  private socket;
  constructor() {
    this.socket = io(`${process.env.REACT_APP_API_URI}`, { autoConnect: false });
  }

  connect() {
    const { isLoggedIn, accessToken }: ProfileState = store.getState().profile;
    if (isLoggedIn) {
      this.socket.auth = {
        token: `Bearer ${accessToken}`,
      };
      this.socket.connect();
      this.setupListeners();
    }
  }

  setupListeners() {
    this.socket.on('STATUS', (data) => {
      store.dispatch(saveSystem(data));
    });
    this.socket.on('NEW_SESSION', (data) => {
      store.dispatch(saveSystem(data));
    });

    this.socket.on('NEW_BALANCE', (balance) => {
      store.dispatch(newBalance(balance));
    });
  }
}
