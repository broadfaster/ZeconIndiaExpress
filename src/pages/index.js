import { useEffect, useCallback, useState } from 'react'
import { useStateContext } from '../utils/context/StateContext'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import {
  Intro,
  Selection,
  Partners,
  HotBid,
  Categories,
  Discover,
  Description,
} from '../screens/Home'
import chooseBySlug from '../utils/chooseBySlug'
import { getDataByCategory, getAllDataByType } from '../lib/cosmic'
import Offer from '../components/Offer'

const Home = ({
  reviews,
  landing,
  categoriesGroup,
  categoryTypes,
  navigationItems,
}) => {
  const [visibleAuthModal, setVisibleAuthModal] = useState(false)
  const { categories, onCategoriesChange, setNavigation } = useStateContext()

  const handleContextAdd = useCallback(
    (category, data, navigation) => {
      onCategoriesChange({ groups: category, type: data })
      setNavigation(navigation)
    },
    [onCategoriesChange, setNavigation]
  )

  useEffect(() => {
    // SALE IS LIVE MODAL SWITCH
    setVisibleAuthModal(false)

    let isMounted = true
    if (!categories['groups']?.length && isMounted) {
      handleContextAdd(
        categoriesGroup?.groups,
        categoriesGroup?.type,
        navigationItems[0]?.metadata
      )
    }

    return () => {
      isMounted = false
    }
  }, [
    categories,
    categoriesGroup,
    categoryTypes,
    handleContextAdd,
    navigationItems,
  ])

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <Description info={chooseBySlug(landing, 'marketing')} />
      <HotBid classSection="section" info={categoriesGroup['groups'][0]} />
      <Categories
        info={categoriesGroup['groups']}
        type={categoriesGroup['type']}
      />
      <Intro info={chooseBySlug(landing, 'introduction')} />
      <Selection info={categoriesGroup['groups']} type={categoryTypes} />
      <Partners info={reviews} />
      <Discover
        info={categoriesGroup['groups']}
        type={categoriesGroup['type']}
      />
      <Modal
        visible={visibleAuthModal}
        onClose={() => setVisibleAuthModal(false)}
      >
        <Offer handleClose={() => setVisibleAuthModal(false)} />
      </Modal>
    </Layout>
  )
}

export default Home

export async function getServerSideProps() {
  const reviews = (await getAllDataByType('reviews')) || []
  const landing = (await getAllDataByType('landings')) || []
  const categoryTypes = (await getAllDataByType('categories')) || []
  const categoriesData = await Promise.all(
    categoryTypes?.map(category => {
      return getDataByCategory(category?.id)
    })
  )
  const navigationItems = (await getAllDataByType('navigation')) || []

  const categoriesGroups = categoryTypes?.map(({ id }, index) => {
    return { [id]: categoriesData[index] }
  })

  const categoriesType = categoryTypes?.reduce((arr, { title, id }) => {
    return { ...arr, [id]: title }
  }, {})

  const categoriesGroup = { groups: categoriesGroups, type: categoriesType }

  return {
    props: {
      reviews,
      landing,
      categoriesGroup,
      categoryTypes,
      navigationItems,
    },
  }
}
