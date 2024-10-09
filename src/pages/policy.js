import React from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { useStateContext } from '../utils/context/StateContext'
import Layout from '../components/Layout'
import Image from 'next/image'
import chooseBySlug from '../utils/chooseBySlug'
import { getAllDataByType } from '../lib/cosmic'

import styles from '../styles/pages/NotFound.module.sass'
import { PageMeta } from '../components/Meta'

const Policy = ({ navigationItems, landing }) => {
  const { push } = useRouter()

  const handleClick = href => {
    push(href)
  }

  const infoAbout = chooseBySlug(landing, 'Policy')

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <PageMeta
        title={'About | Zecon India Express'}
        description={
          'Explore electric scooters and e-bikes in India. Choose Zecon that connects the nation from Kashmir to Kerala, a clean mobility solution.'
        }
      />
      <div className={cn('section', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.wrap}>
            <h2 className={cn('h2', styles.title)}>
              {infoAbout?.metadata?.title}
            </h2>
            <h3 className={styles.info}>{infoAbout?.metadata?.subtitle}</h3>
            <p className={styles.info}>{infoAbout?.metadata?.description}</p>
            <div className={styles.foot}>
              <button
                onClick={() => handleClick(`/search`)}
                className={cn('button-stroke', styles.button)}
              >
                Start your search
              </button>
              <button
                onClick={() => handleClick(`/contact`)}
                className={cn('button-stroke', styles.button, styles.greenbtn)}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Policy

export async function getServerSideProps() {
  const navigationItems = (await getAllDataByType('navigation')) || []
  const landing = (await getAllDataByType('landings')) || []

  return {
    props: { navigationItems, landing },
  }
}