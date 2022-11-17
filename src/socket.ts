import { io } from 'socket.io-client';
import { newBalance, ProfileState } from 'reducers/profileSlice';
import { store } from 'reducers/store';
import { initSession, newSession } from 'reducers/systemSlice';

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
      store.dispatch(initSession(data));
    });
    this.socket.on('NEW_SESSION', (data) => {
      store.dispatch(newSession(data));
    });

    this.socket.on('NEW_BALANCE', (data) => {
      console.log('NEW_BALANCE', data);
      store.dispatch(newBalance(data));
    });
    this.socket.on('NOTIFICATION', (data) => {
      console.log('NOTIFICATION', data);
    });
  }
}
