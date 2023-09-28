import { create } from 'zustand'

const alertStore = create<IAlertStore>(() => ({}))

export default function useAlertService(): IAlertService {
  const { alert } = alertStore()

  return {
    alert,
    show: (message: string) => {
      alertStore.setState({
        alert: { message },
      })
    },
    clear: () => {
      alertStore.setState({
        alert: undefined,
      })
    },
  }
}

interface IAlert {
  message: string
}

interface IAlertStore {
  alert?: IAlert
}

interface IAlertService extends IAlertStore {
  show: (message: string) => void
  clear: () => void
}
