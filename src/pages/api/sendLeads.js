export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, message, latitude, longitude } = req.body

    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID // Replace with your Pixel ID
    const accessToken = process.env.NEXT_PUBLIC_META_PIXEL_ACCESS_TOKEN // Replace with your access token

    const url = `https://graph.facebook.com/v13.0/${pixelId}/events?access_token=${accessToken}`

    const eventData = {
      data: [
        {
          event_name: 'Lead', // This should match your event name
          event_time: Math.floor(Date.now() / 1000),
          user_data: {
            email: email ? email.toLowerCase() : null,
            phone: phone || null,
            name: name || null,
          },
          custom_data: {
            message: message || null,
            latitude: latitude || null,
            longitude: longitude || null,
          },
        },
      ],
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })

      const result = await response.json()
      return res.status(200).json(result)
    } catch (error) {
      console.error('Error sending event:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
