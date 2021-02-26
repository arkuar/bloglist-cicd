import React from 'react'

const Notification = ({ message, errorMessage }) => {
  if (message === null && errorMessage === null) {
    return null
  }

  return (
    <div className={message ? 'success' : errorMessage ? 'error' : ''}>
      {message || errorMessage}
    </div>
  )
}

export default Notification
