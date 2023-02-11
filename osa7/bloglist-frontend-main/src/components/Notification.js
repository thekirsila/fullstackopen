import React, { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const [notification] = useContext(NotificationContext)

  if (!notification) return null

  if (!notification && notification.length === 0) return null

  return <div>{notification}</div>
}

export default Notification
