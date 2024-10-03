import {
  FiFacebook,
  FiTwitter,
  FiYoutube,
  FiLinkedin,
  FiSlack,
  FiInstagram 
} from 'react-icons/fi'
import AppLink from '../AppLink'

import styles from './SocialMedia.module.sass'

const socialMedia = [
  {
    Icon: FiFacebook,
    url: 'https://www.facebook.com/cosmicjs',
  },
  {
    Icon: FiInstagram,
    url: 'https://cosmcijs.slack.com',
  },
  {
    Icon: FiTwitter,
    url: 'https://twitter.com/cosmicjs',
  },
  {
    Icon: FiLinkedin,
    url: 'https://www.linkedin.com/company/cosmicjs/',
  },
  {
    Icon: FiYoutube,
    url: 'https://www.youtube.com/cosmicjs',
  }
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
