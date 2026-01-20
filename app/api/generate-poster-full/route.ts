export interface PosterText {
  heading: string
  subheading: string
  body: string
}

const posterCaptions: Record<string, PosterText[]> = {
  event: [
    {
      heading: 'ANNUAL TECH SUMMIT 2024',
      subheading: 'Innovation Meets Tomorrow',
      body: 'Join industry leaders for groundbreaking insights and networking opportunities. Register Now!',
    },
    {
      heading: 'CREATIVE WORKSHOP',
      subheading: 'Unlock Your Artistic Potential',
      body: 'Master new techniques from expert instructors. Limited seats available. Enroll today!',
    },
    {
      heading: 'NETWORKING CONFERENCE',
      subheading: 'Connect with Professionals',
      body: 'Expand your network and discover new opportunities. Early bird discounts ending soon!',
    },
  ],
  workshop: [
    {
      heading: 'MASTER CLASS: DIGITAL DESIGN',
      subheading: 'Learn from Industry Experts',
      body: 'Transform your skills in just one day. Interactive sessions and hands-on projects included.',
    },
    {
      heading: 'PROFESSIONAL DEVELOPMENT',
      subheading: 'Elevate Your Career',
      body: 'Gain certifications and boost your professional growth. Flexible scheduling available.',
    },
    {
      heading: 'CODING BOOTCAMP',
      subheading: 'Launch Your Tech Career',
      body: 'Intensive 12-week program. Job placement guaranteed. Apply with special discount!',
    },
  ],
  promotion: [
    {
      heading: 'MEGA SALE EVENT',
      subheading: 'Up to 70% OFF Everything',
      body: 'Limited time offer. Shop now and save big. Free shipping on orders over $50!',
    },
    {
      heading: 'NEW PRODUCT LAUNCH',
      subheading: 'Be First to Experience It',
      body: 'Revolutionary features you will love. Pre-order today for exclusive launch price.',
    },
    {
      heading: 'EXCLUSIVE DEAL',
      subheading: 'VIP Members Only',
      body: 'Special pricing for loyal customers. Become a member and unlock premium benefits.',
    },
  ],
  announcement: [
    {
      heading: 'IMPORTANT ANNOUNCEMENT',
      subheading: 'New Updates Available',
      body: 'Stay informed about latest changes and improvements. Visit our website for more details.',
    },
    {
      heading: 'COMMUNITY NOTICE',
      subheading: 'Exciting News Coming',
      body: 'Something big is happening! Follow us for announcements and be part of the journey.',
    },
    {
      heading: 'SPECIAL CELEBRATION',
      subheading: 'Join Us in Celebrating',
      body: 'Mark your calendars for an unforgettable experience. Spread the word!',
    },
  ],
  general: [
    {
      heading: 'CREATE YOUR MOMENT',
      subheading: 'Make It Memorable',
      body: 'Stand out from the crowd. Your journey starts here. Let us help you shine.',
    },
    {
      heading: 'DREAM BIG',
      subheading: 'Achieve More Together',
      body: 'Collaborate with like-minded individuals. Build something extraordinary today.',
    },
    {
      heading: 'BE INSPIRED',
      subheading: 'Transform Your Vision',
      body: 'Every great achievement begins with a single step. Take yours now!',
    },
  ],
}

export async function POST(request: Request) {
  try {
    const { category = 'general' } = await request.json()

    const captions = posterCaptions[category] || posterCaptions.general
    const randomText = captions[Math.floor(Math.random() * captions.length)]

    return Response.json({ text: randomText })
  } catch (error) {
    console.log('[v0] Poster text generation error:', error)
    return Response.json({ error: 'Failed to generate poster text' }, { status: 500 })
  }
}
