import { io } from 'socket.io-client';
import { newBalance, ProfileState } from '../reducers/profileSlice';
import { store } from '../reducers/store';
import { save } from '../reducers/systemSlice';

export class Socket {
  private socket;
  constructor() {
    this.socket = io(`${process.env.REACT_APP_API_URI}`, { autoConnect: false });
  }

  connect() {
    const { accessToken }: ProfileState = store.getState().profile;
    if (accessToken) {
      this.socket.auth = {
        token: `Bearer ${accessToken}`,
      };
      this.socket.connect();
      this.setupListeners();
    }
  }

  setupListeners() {
    this.socket.on('STATUS', (data) => {
      store.dispatch(save(data));
    });

    this.socket.on('NEW_SESSION', (data) => {
      store.dispatch(save(data));
    });
    this.socket.on('NEW_BALANCE', (_newBalance) => {
      store.dispatch(newBalance(_newBalance));
    });

    this.socket.on('NOTIFICATION', ({ content }) => {
      // const modalStore = useModalStore();
      // modalStore.openModal(WinPrizeModal, { content });
    });

    this.socket.on('connect_error', (error) => {
      console.log(error);
    });
  }
}
