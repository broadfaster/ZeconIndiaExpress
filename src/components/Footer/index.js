import React, { useState } from 'react'
import cn from 'classnames'
import AppLink from '../AppLink'
import Group from './Group'
import Theme from '../Theme'
import Image from '../Image'
import SocialMedia from '../SocialMedia'
import { FiPhoneCall } from 'react-icons/fi'
import { IoLocationOutline } from 'react-icons/io5'

import styles from './Footer.module.sass'
import Icon from '../Icon'

const Footers = ({ navigation }) => {
  return (
    <footer className={styles.footer}>
      <div className={cn('container', styles.container)}>
        <div className={styles.row}>
          <div className={styles.col} aria-hidden="true">
            <AppLink className={styles.logo} href="/">
              <Image
                size={{ width: '92px', height: '92px' }}
                className={styles.pic}
                src={navigation['logo']?.imgix_url}
                srcDark={navigation['logo']?.imgix_url}
                alt="Logo"
                objectFit="cntain"
              />
            </AppLink>
            <div className={styles.address}>
              <FiPhoneCall className={styles.icon}/>
              <div className={styles.info}>+91 9792199994</div>
            </div>
            <div className={styles.address}>
              <IoLocationOutline className={styles.icon}/>
              <div className={styles.info}>
                Shop No-632, 167, Ayodhya Road, near New High Court, Shankar
                Puri, Kamta, Lucknow, Uttar Pradesh 226028
              </div>
            </div>

            <div className={styles.version}>
              <div className={styles.details}>Night Mode</div>
              <Theme className="theme-big" />
            </div>
          </div>
          <div className={styles.col}>
            <Group className={styles.group} item={navigation?.['menu']} />
          </div>
          <div className={styles.col}>
            <AppLink href={`#`}>
              <p className={styles.category}>Know More</p>
            </AppLink>
            <AppLink href={`https://docs.cosmicjs.com/`}>
              <p className={styles.text}>Google Map Address</p>
            </AppLink>
            <AppLink href={`https://www.cosmicjs.com/contact`}>
              <p className={styles.text}>Schedule a Meeting</p>
            </AppLink>
            <SocialMedia className={styles.form} />
            <AppLink
              href={`https://cosmicjs.us5.list-manage.com/subscribe/post?u=15433aab34aefd5450c23fd94&id=028c29b6ca`}
            >
              <button
                aria-hidden="true"
                className={cn('button', styles.button, styles.newsletterbtn)}
              >
                Subscribe Newsletter
              </button>
            </AppLink>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.copyright} aria-hidden="true">
          <span className={styles.cosmicGroup}>
            <p className={styles.powered}>Made with ❤️ by</p>
            <a href="https://www.broadfaster.com">
              <Image
                className={styles.cosmic}
                size={{ width: '110px', height: '90px' }}
                src="/cosmic.svg"
                alt="Broadfaster Logo"
                objectFit="contain"
              />
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footers
