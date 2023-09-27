import {create} from 'zustand';

export {useAlertService};

const alertStore = create<IAlertStore>(() => ({}));

function useAlertService(): IAlertService {
  const {alert} = alertStore();

  return {
    alert,
    show: (message: string) => {
      alertStore.setState({
        alert: {message}
      });
    },
    clear: () => {
      alertStore.setState({
        alert: undefined
      });
    }
  }
}

interface IAlert {
  message: string,
}

interface IAlertStore {
  alert?: IAlert
}

interface IAlertService extends IAlertStore {
  show: (message: string) => void,
  clear: () => void,
}