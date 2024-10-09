import React, { useState, useCallback, useEffect, useRef } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import AppLink from '../AppLink'
import Loader from '../Loader'
import registerFields from '../../utils/constants/registerFields'
import { useStateContext } from '../../utils/context/StateContext'
import styles from './Offer.module.sass'
import creatNewsletterFields from '../../utils/constants/createNewsletterFields'
import toast from 'react-hot-toast'

const Offer = ({ className, handleClose, handleOAuth, disable }) => {
  const { push } = useRouter()

  const [{ email }, setFields] = useState(() => creatNewsletterFields)
  const [fillFiledMessage, setFillFiledMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  const handleGoHome = () => {
    push('/')
  }

  const handleClick = href => {
    const queryParams = {
      category: '66fec72d68de981763c22746',
    }
    push({
      pathname: href, // The page you want to navigate to
      query: queryParams, // The query parameters
    })
  }

  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn('h4', styles.title)}>
        Welcome to{' '}
        <AppLink target="_blank" href={`#`}>
          <div>Zecon</div>
        </AppLink>
      </div>
      <div className={styles.text}>Diwali Sale is live 🎉</div>
      <div className={styles.error}>{fillFiledMessage}</div>
      <button onClick={() => handleClick(`/search`)} className={cn('button', styles.button)}>
        {loading ? <Loader /> : 'Special Offers'}
      </button>
      <button
        onClick={disable ? handleGoHome : handleClose}
        className={cn('button-stroke', styles.button)}
      >
        {disable ? 'Return Home Page' : 'Close'}
      </button>
    </div>
  )
}

export default Offer
