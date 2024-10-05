import React, { useState, useCallback, useEffect, useRef } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import AppLink from '../AppLink'
import Loader from '../Loader'
import registerFields from '../../utils/constants/registerFields'
import { useStateContext } from '../../utils/context/StateContext'
import styles from './Newsletter.module.sass'
import creatNewsletterFields from '../../utils/constants/createNewsletterFields'
import toast from 'react-hot-toast'

const OAuth = ({ className, handleClose, handleOAuth, disable }) => {
  const { push } = useRouter()

  const [{ email }, setFields] = useState(() => creatNewsletterFields)
  const [fillFiledMessage, setFillFiledMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleGoHome = () => {
    push('/')
  }

  const handleChange = ({ target: { name, value } }) =>
    setFields(prevFields => ({
      ...prevFields,
      [name]: value,
    }))

  const submitForm = useCallback(
    async e => {
      e.preventDefault()
      fillFiledMessage?.length && setFillFiledMessage('')
      if (email) {
        fillFiledMessage && setFillFiledMessage(false)
        setLoading(true)
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
          }),
        })

        const createdNewsletterDetail = await response.json()

        if (createdNewsletterDetail['object']) {
          setFillFiledMessage('Congrats!')
          toast.success(
            `Successfully added your email address ${createdNewsletterDetail['object']['title']}`,
            {
              position: 'top-right',
            }
          )
          setSubmitted(true)
        }
      } else {
        setFillFiledMessage('Please fill all fields')
      }
    },
    [fillFiledMessage, push, email]
  )

  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn('h4', styles.title)}>
        Subcribe to{' '}
        <AppLink target="_blank" href={`#`}>
          <div>Zecon</div>
        </AppLink>
      </div>
      <div className={styles.text}>
        for the latest vehicles, exclusive offers, and showroom updates straight
        to your inbox!{' '}
      </div>
      <div className={styles.error}>{fillFiledMessage}</div>
      <form className={styles.form} action="submit" onSubmit={submitForm}>
        <div className={styles.field}>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={email}
            required
          />
        </div>
        <div className={styles.btns}>
          {!submitted && (
            <button
              type="submit"
              onClick={submitForm}
              className={cn('button', styles.button)}
            >
              {loading ? <Loader /> : 'Subscribe'}
            </button>
          )}
          <button
            onClick={disable ? handleGoHome : handleClose}
            className={cn('button-stroke', styles.button)}
          >
            {disable ? 'Return Home Page' : 'Close'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default OAuth
