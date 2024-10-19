import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'
import { StateContext } from '../utils/context/StateContext'
import Script from 'next/script'
import '../styles/app.sass'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.fbq) {
        window.fbq('track', 'PageView')
      }
    }

    // Track the first page load
    handleRouteChange()

    // Track subsequent route changes
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <StateContext>
      <Toaster />
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1042474660944310');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* Meta Pixel Noscript for Non-JS Users */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1042474660944310&ev=PageView&noscript=1"
        />
      </noscript>
      <Component {...pageProps} />
    </StateContext>
  )
}

export default MyApp
