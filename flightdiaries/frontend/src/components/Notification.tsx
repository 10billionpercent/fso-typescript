const success = {
  color: '#12e607',
  padding: '10px',
  border: '1px solid #12e607',
  borderRadius: '10px'
}

const error = {
  color: '#e52929ff',
  padding: '10px',
  border: '1px solid #e52929ff',
  borderRadius: '10px'
}

interface NotificationProps {
    message: string;
    isError?: boolean;
}

const Notification = ({ message, isError = false}: NotificationProps) => {
  if (message === null) {
    return null
  }
  return (
    <div id="notification" style = {isError ? error : success}>
      {message}
    </div>
  )
}

export default Notification