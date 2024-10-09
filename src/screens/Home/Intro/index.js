import React from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import Slider from 'react-slick'
import Image from '../../../components/Image'

import styles from './Intro.module.sass'

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
}

const Intro = ({ info }) => {
  const { push } = useRouter()

  const handleClick = href => {
    const queryParams = {
      category: '66fec72d68de981763c22745',
    }
    push({
      pathname: href, // The page you want to navigate to
      query: queryParams, // The query parameters
    })
  }

  return (
    <div className={cn('section', styles.section)}>
      <div className={cn('container', styles.container)}>
        <div className={styles.head}>
          <div className={styles.stage}>{info?.title}</div>
          <h3 className={cn('h3', styles.title)}>{info?.metadata?.subtitle}</h3>
        </div>
        <div className={styles.wrapper}>
          <Slider className="creative-slider" {...settings} aria-hidden="true">
            <div className={styles.slide}>
              <div className={styles.row}>
                <Image
                  size={{ width: '100%', height: '50vh' }}
                  className={styles.player}
                  srcSet={info?.metadata?.image?.imgix_url}
                  srcSetDark={info?.metadata?.image?.imgix_url}
                  src={info?.metadata?.image?.imgix_url}
                  srcDark={info?.metadata?.image?.imgix_url}
                  alt="Introduction"
                  objectFit="contain"
                />
                <div className={styles.details}>
                  <h3 className={cn('h3', styles.subtitle)}>
                    {info?.metadata?.title}
                  </h3>
                  <div className={styles.wrap}>
                    <div className={styles.info}>Featured</div>
                    <div className={styles.price}>
                      {info?.metadata?.description}
                    </div>
                  </div>
                  <div className={styles.btns}>
                    <button
                      onClick={() => handleClick(`/search`)}
                      className={cn('button-stroke', styles.button)}
                    >
                      Explore more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Intro
