import React, { useState, useCallback, useEffect } from 'react'
import cn from 'classnames'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useStateContext } from '../utils/context/StateContext'
import Layout from '../components/Layout'
import Icon from '../components/Icon'
import TextInput from '../components/TextInput'
import Loader from '../components/Loader'
import Modal from '../components/Modal'
import OAuth from '../components/OAuth'
import Preview from '../screens/UploadDetails/Preview'
import Cards from '../screens/UploadDetails/Cards'
import { getAllDataByType } from '../lib/cosmic'
import { OPTIONS } from '../utils/constants/appConstants'
import createFormFields from '../utils/constants/createFormFields'
import { getToken } from '../utils/token'

import styles from '../styles/pages/UploadDetails.module.sass'
import { PageMeta } from '../components/Meta'

const Contact = ({ navigationItems, categoriesType }) => {
  const { categories, navigation, cosmicUser } = useStateContext()
  const { push } = useRouter()

  const [color, setColor] = useState(OPTIONS[1])
  const [uploadMedia, setUploadMedia] = useState('')
  const [uploadFile, setUploadFile] = useState('')
  const [chooseCategory, setChooseCategory] = useState('')

  const [fillFiledMessage, setFillFiledMessage] = useState(false)

  const [{ name, email, message }, setFields] = useState(() => createFormFields)
  const [visibleAuthModal, setVisibleAuthModal] = useState(false)
  const [visiblePreview, setVisiblePreview] = useState(false)

  useEffect(() => {

  }, [])

  const handleOAuth = useCallback(
    async user => {
      !cosmicUser.hasOwnProperty('id') && setVisibleAuthModal(true)

      if (!user && !user?.hasOwnProperty('id')) return
      user && uploadFile && (await handleUploadFile(uploadFile))
    },
    [cosmicUser, uploadFile]
  )

  const handleChange = ({ target: { name, value } }) =>
    setFields(prevFields => ({
      ...prevFields,
      [name]: value,
    }))

  const previewForm = useCallback(() => {
    if (title && count && price && uploadMedia) {
      fillFiledMessage && setFillFiledMessage(false)
      setVisiblePreview(true)
    } else {
      setFillFiledMessage(true)
    }
  }, [name, email, message])

  const submitForm = useCallback(
    async e => {
      e.preventDefault()

      if (name && email && message) {
        fillFiledMessage && setFillFiledMessage(false)

        const response = await fetch('/api/form', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        })

        const createdContactDetail = await response.json()

        console.log(createFormFields)

        if (createdContactDetail['object']) {
          toast.success(
            `Successfully added ${createdContactDetail['object']['title']} item`,
            {
              position: 'bottom-right',
            }
          )
        }
      } else {
        setFillFiledMessage(true)
      }
    },
    [fillFiledMessage, push, name, email, message]
  )

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata || navigation}>
      <PageMeta
        title={'Create Item | uNFT Marketplace'}
        description={
          'uNFT Marketplace built with Cosmic CMS, Next.js, and the Stripe API'
        }
      />
      <div className={cn('section', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <div className={cn('h2', styles.title)}>Contact Us</div>
            </div>
            <form className={styles.form} action="" onSubmit={submitForm}>
              <div className={styles.list}>
                <div className={styles.item}>
                  <div className={styles.category}>
                    Please Enter Your Details
                  </div>
                  <div className={styles.fieldset}>
                    <TextInput
                      className={styles.field}
                      label="Your Name"
                      name="name"
                      type="text"
                      placeholder="e. g. Akshat Kumar"
                      onChange={handleChange}
                      value={name}
                      required
                    />
                    <TextInput
                      className={styles.field}
                      label="Your Email"
                      name="email"
                      type="email"
                      placeholder="e. g. akshat20kumar@gmail.com"
                      onChange={handleChange}
                      value={email}
                      required
                    />
                    <TextInput
                      className={styles.field}
                      label="Message"
                      name="message"
                      type="text"
                      placeholder="e. g. Hey i am interested in Mihos Electric Scooter"
                      onChange={handleChange}
                      value={message}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={styles.foot}>
                <button
                  className={cn('button', styles.button)}
                  onClick={submitForm}
                  type="submit"
                >
                  <span>Submit</span>
                  <Icon name="arrow-next" size="10" />
                </button>
                {fillFiledMessage && (
                  <div className={styles.saving}>
                    <span>Please fill all fields</span>
                    <Loader className={styles.loader} />
                  </div>
                )}
              </div>
            </form>
          </div>
          <Preview
            className={cn(styles.preview, { [styles.active]: visiblePreview })}
            info={{ name, email, message }}
            image={uploadMedia?.['imgix_url']}
            onClose={() => setVisiblePreview(false)}
          />
        </div>
      </div>
      <Modal
        visible={visibleAuthModal}
        disable={!cosmicUser?.hasOwnProperty('id')}
        onClose={() => setVisibleAuthModal(false)}
      >
        {/* <OAuth
          className={styles.steps}
          handleOAuth={handleOAuth}
          handleClose={() => setVisibleAuthModal(false)}
          disable={!cosmicUser?.hasOwnProperty('id')}
        /> */}
      </Modal>
    </Layout>
  )
}

export default Contact

export async function getServerSideProps() {
  const navigationItems = (await getAllDataByType('navigation')) || []
  return {
    props: { navigationItems },
  }
}
