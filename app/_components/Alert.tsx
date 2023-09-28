'use client'

import useAlertService from '@/app/_services/useAlertService'

export default function Alert() {
  // const pathname = usePathname();
  const alertService = useAlertService()
  const alert = alertService.alert

  // useEffect(() => {
  //   void alertService.clear();
  // }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!alert) return null

  return (
    <dialog open>
      <div className='m-3'>
        {alert.message}
        <br />
        <button type='button' onClick={alertService.clear}>
          好
        </button>
      </div>
    </dialog>
  )
}
