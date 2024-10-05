import {
  FiFacebook,
  FiTwitter,
  FiYoutube,
  FiLinkedin,
  FiSlack,
  FiInstagram,
} from 'react-icons/fi'
import AppLink from '../AppLink'

import styles from './SocialMedia.module.sass'

const socialMedia = [
  {
    Icon: FiFacebook,
    url: 'https://www.facebook.com/people/Zecon-EV-Motors/61558117237470/',
  },
  {
    Icon: FiInstagram,
    url: 'https://www.instagram.com/zeconmotors/',
  },
  {
    Icon: FiTwitter,
    url: '#',
  },
  {
    Icon: FiLinkedin,
    url: '#',
  },
  {
    Icon: FiYoutube,
    url: '#',
  },
]

const SocialMedia = () => {
  return (
    <div className={styles.social}>
      {socialMedia?.map(({ Icon, url }, index) => (
        <AppLink key={index} target="_blank" href={url}>
          <Icon className={styles.icon} />
        </AppLink>
      ))}
    </div>
  )
}

export default SocialMedia
