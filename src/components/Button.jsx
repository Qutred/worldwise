import React from 'react'
import styles from './Button.module.css'

const Button = ({children, onClick, type}) => {
  return (
    <button
      className={`${styles.btn} ${type && styles[type]}`}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
