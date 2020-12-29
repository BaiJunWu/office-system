import React from 'react'
import styles from './index.less'

const Loader = ({ spinning = false, fullScreen }) => {
  return (
    <div
      className={spinning ? styles.hidden : styles.loader}
    >
      <div className={styles.warpper}>
        <div className={styles.inner} />
        <div className={styles.text}>LOADING</div>
      </div>
    </div>
  )
}

export default Loader