import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisible,
    }
  })

  return (
    <div>
      {!visible && <button onClick={toggleVisible}>{props.openLabel}</button>}
      {visible && props.children}
      {visible && <button onClick={toggleVisible}>{props.closeLabel}</button>}
    </div>
  )
})

Togglable.propTypes = {
  openLabel: PropTypes.string.isRequired,
  closeLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
