import { ToastOptions, toast } from 'react-toastify'

const displaySuccess = (
  message: string,
  options: ToastOptions = {
    className: '!bg-light-success !text-success [&>button]:text-success',
    progressClassName: '!bg-success'
  }
) => toast.success(message, options)

const displayError = (
  message: string,
  options: ToastOptions = {
    className: '!bg-light-error !text-error [&>button]:text-error',
    progressClassName: '!bg-error'
  }
) => toast.error(message, options)

const displayWarning = (
  message: string,
  options: ToastOptions = {
    className: '!bg-light-warning !text-warning [&>button]:text-warning',
    progressClassName: '!bg-warning'
  }
) => toast.warning(message, options)

const displayInfo = (
  message: string,
  options: ToastOptions = {
    className: '!bg-light-info !text-info [&>button]:text-info',
    progressClassName: '!bg-info'
  }
) => toast.info(message, options)

export default {
  displaySuccess,
  displayError,
  displayWarning,
  displayInfo
}
