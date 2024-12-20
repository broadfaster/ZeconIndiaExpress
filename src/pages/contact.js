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
import gmap from '../../public/images/content/gmap.png'

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

  const [{ name, phone, email, message }, setFields] = useState(
    () => createFormFields
  )
  const [visibleAuthModal, setVisibleAuthModal] = useState(false)
  const [visiblePreview, setVisiblePreview] = useState(false)
  const [loading, setLoading] = useState(false)
  const [locationData, setLocationData] = useState(null)

  useEffect(() => {
    // Fetch geolocation data
    const fetchGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords
            setLocationData({ latitude, longitude })
          },
          error => {
            console.error('Geolocation error:', error)
          }
        )
      }
    }

    fetchGeolocation()
    window.fbq('track', 'ContactPageVisit')
  }, [])

  const handleOAuth = useCallback(
    async user => {
      !cosmicUser.hasOwnProperty('id') && setVisibleAuthModal(true)

      if (!user && !user?.hasOwnProperty('id')) return
      user && uploadFile && (await handleUploadFile(uploadFile))
    },
    [cosmicUser, uploadFile]
  )

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'phone') {
      // Remove any non-numeric characters
      const phoneNumber = value.replace(/\D/g, '')

      if (phoneNumber.length <= 10) {
        setFields(prevFields => ({
          ...prevFields,
          [name]: phoneNumber,
        }))
      }
    } else {
      setFields(prevFields => ({
        ...prevFields,
        [name]: value,
      }))
    }
  }

  const previewForm = useCallback(() => {
    if ((name, phone, email, message)) {
      fillFiledMessage && setFillFiledMessage(false)
      setLoading(true)
      setVisiblePreview(true)
    } else {
      setFillFiledMessage(true)
    }
  }, [name, phone, email, message])

  const submitForm = useCallback(
    async e => {
      e.preventDefault()

      if (name && phone && email && message) {
        setFillFiledMessage(false)
        setLoading(true)

        // Prepare data for the lead
        const leadData = {
          name,
          phone,
          email,
          message,
          latitude: locationData?.latitude || null, // Include geolocation
          longitude: locationData?.longitude || null,
        }

        try {
          // Send the lead data to your /api/form
          const response = await fetch('/api/form', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadData), // Send all the lead data
          })

          const createdContactDetail = await response.json()
          console.log(createdContactDetail)
          if (response.ok) {
            // If the first API call was successful, call the sendLeads API
            const sendLeadsResponse = await fetch('/api/sendLeads', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(leadData), // Send lead data to sendLeads
            })

            if (sendLeadsResponse.ok) {
              toast.success(
                `Thank you, we will reach you soon at ${createdContactDetail['object']['title']}!`,
                {
                  position: 'bottom-right',
                }
              )
              setFields(createFormFields) // Reset form fields
              setVisiblePreview(false) // Hide preview after successful submission
            } else {
              toast.error('Failed to send lead data. Please try again.', {
                position: 'bottom-right',
              })
            }
          } else {
            toast.error(`Error: ${createdContactDetail.error}`, {
              position: 'bottom-right',
            })
          }
        } catch (error) {
          console.error('Submission error:', error)
          toast.error('Submission failed. Please try again later.', {
            position: 'bottom-right',
          })
        } finally {
          setLoading(false)
        }
      } else {
        setFillFiledMessage(true) // Show error if fields are not filled
      }
    },
    [name, phone, email, message, locationData] // Add locationData as a dependency
  )
  return (
    <Layout navigationPaths={navigationItems[0]?.metadata || navigation}>
      <PageMeta
        title={'Create Item | Zecon India Express'}
        description={
          'Explore electric scooters and e-bikes in India. Choose Zecon that connects the nation from Kashmir to Kerala, a clean mobility solution.'
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
                      label="Your Phone"
                      name="phone"
                      type="tel"
                      placeholder="e. g. 98978378XX"
                      onChange={handleChange}
                      value={phone}
                      required
                    />
                    <TextInput
                      className={styles.field}
                      label="Your Email"
                      name="email"
                      type="email"
                      placeholder="e. g. kumar@gmail.com"
                      onChange={handleChange}
                      value={email}
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
                  {loading ? <Loader /> : 'Submit'}
                </button>
                {fillFiledMessage && (
                  <div className={styles.saving}>
                    <span className={styles.fillmessage}>
                      Please fill all fields
                    </span>
                  </div>
                )}
              </div>
            </form>
          </div>
          {/* <Preview
            className={cn(styles.preview, { [styles.active]: visiblePreview })}
            info={{ name, phone, email, message }}
            image={uploadMedia?.['imgix_url']}
            onClose={() => setVisiblePreview(false)}
          /> */}
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
