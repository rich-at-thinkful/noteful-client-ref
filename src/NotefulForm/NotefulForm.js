import React from 'react'
import './NotefulForm.css'

export default function NotefulForm(props) {
  const { className, onSubmit, children, ...otherProps } = props
  return (
    <form
      className={['Noteful-form', className].join(' ')}
      action='#'
      onSubmit={onSubmit}
      {...otherProps}
    >
      {children}
    </form>
  )
}
