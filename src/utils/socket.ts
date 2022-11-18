import { API_URL } from 'env';
import { newBalance, ProfileState } from 'reducers/profileSlice';
import { store } from 'reducers/store';
import { initSession, newSession, SessionNew, SystemState } from 'reducers/systemSlice';
import { io } from 'socket.io-client';

export class Socket {
  private socket;
  constructor() {
    this.socket = io(API_URL!, { autoConnect: false });
  }

  instance() {
    return this.socket;
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

  disconnect() {
    try {
      this.socket.disconnect();
    } catch {}
  }

  setupListeners() {
    this.socket.on('STATUS', (data: SystemState) => {
      store.dispatch(initSession(data));
    });

    this.socket.on('NEW_SESSION', (data: SessionNew) => {
      store.dispatch(newSession(data));
    });

    this.socket.on('NEW_BALANCE', (balance: number) => {
      store.dispatch(newBalance(balance));
    });
  }
}
