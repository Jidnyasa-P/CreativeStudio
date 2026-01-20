type Tone = 'funny' | 'sarcastic' | 'professional' | 'gen-z' | 'formal'

const captionDatabase: Record<string, Record<Tone, string[]>> = {
  'Drake Meme': {
    funny: [
      'Studying for exams | Playing video games',
      'Eating healthy | Ordering pizza at 2am',
      'Going to bed early | Scrolling TikTok until 3am',
      'Working hard | Getting promoted for luck',
      'My resume | My actual skills',
    ],
    sarcastic: [
      'Trying to be productive | Actually productive',
      'My goals | My reality',
      'What I want to do | What I have to do',
      'My expectations | My life',
      'Healthy lifestyle | junk food',
    ],
    professional: [
      'Strategic planning | Execution excellence',
      'Team collaboration | Project success',
      'Innovation focus | Market leadership',
      'Process improvement | Efficiency gains',
      'Skill development | Career growth',
    ],
    'gen-z': [
      'No cap this hits different | Actually no',
      'Giving main character | Plot twist I am not',
      'It is serving | It is not serving',
      'Periodt | Actually wait',
      'No literally | I was joking lol',
    ],
    formal: [
      'Objective one | Objective two',
      'First consideration | Second consideration',
      'Primary focus | Secondary focus',
      'Initial approach | Alternative approach',
      'Preferred outcome | Adverse outcome',
    ],
  },
  'Distracted Boyfriend': {
    funny: [
      'Me ignoring homework | New meme template',
      'My diet plan | That pizza slice',
      'My productivity | Social media',
      'My goals | Procrastination',
      'Work | Reddit',
    ],
    sarcastic: [
      'My responsibilities | My hobbies',
      'What I should do | What I want to do',
      'Real life | My fantasy life',
      'Commitment | Distraction',
      'Adulthood | Anything else',
    ],
    professional: [
      'Client needs | Alternative solutions',
      'Project priority | Resource allocation',
      'Market strategy | Competitive advantage',
      'Stakeholder value | Cost optimization',
      'Business growth | Market expansion',
    ],
    'gen-z': [
      'Me being responsible | Me when freedom calls',
      'My job | My mental health',
      'Growing up | My childhood',
      'Responsibilities | Vibes',
      'Commitment | No cap this is cringe',
    ],
    formal: [
      'Primary objective | Secondary objective',
      'Assigned duty | Competing interest',
      'Mandatory task | Discretionary activity',
      'Work obligation | Personal preference',
      'Scheduled commitment | Alternative engagement',
    ],
  },
  'Loss Meme': {
    funny: [
      'Feeling great | Reading bad news | Crying | Moving on',
      'Getting a promotion | Losing it immediately | Fake laughing | Internally screaming',
      'Planning my day | Existing | Forgetting my plan | Existing',
      'Monday morning | Monday at work | Monday afternoon | Monday night',
      'Summer plans | Reality of summer | My savings | My mental health',
    ],
    sarcastic: [
      'My potential | My effort | My results | My future',
      'Expectations | Reality | Acceptance | Denial',
      'Hope | Disappointment | Acceptance | Crying',
      'Me | Also me | Still me | Definitely still me',
      'My confidence | First setback | Depression | Recovery',
    ],
    professional: [
      'Quarter 1 goals | Quarter 2 outcomes | Quarter 3 analysis | Quarter 4 forecast',
      'Project initiation | Development phase | Testing phase | Deployment phase',
      'Strategy formation | Implementation | Evaluation | Adjustment',
      'Market entry | Growth phase | Maturity phase | Exit planning',
      'Problem identification | Solution development | Rollout | Optimization',
    ],
    'gen-z': [
      'New year new me | Still the same | Giving up | Already forgot',
      'My motivation | Actual motivation | Coping mechanism | Acceptance',
      'Hype | Reality check | Denial era | Healing journey',
      'The vibe | Plot twist | Character development | Redemption',
      'The dream | The struggle | The pain | The lessons',
    ],
    formal: [
      'Phase One | Phase Two | Phase Three | Phase Four',
      'Initial state | Transitional state | Critical state | Final state',
      'Stage A | Stage B | Stage C | Stage D',
      'Period one | Period two | Period three | Period four',
      'Step one | Step two | Step three | Step four',
    ],
  },
  'Motivational Poster': {
    funny: [
      'You miss 100% of the shots you do not take',
      'I am not lazy, I am just on energy-saving mode',
      'Be yourself; everyone else is already taken',
      'Coffee: because murder is illegal',
      'Adulting is like being a beginner at everything',
    ],
    sarcastic: [
      'Because giving up is not an option... unfortunately',
      'Success is just failure that has not happened yet',
      'Believe in yourself when no one else does',
      'The struggle is real, the coffee is realer',
      'Excellence is not a destination, it is exhausting',
    ],
    professional: [
      'Excellence through continuous improvement',
      'Leadership through vision and execution',
      'Innovation drives market transformation',
      'Synergy creates sustainable growth',
      'Strategic alignment enables success',
    ],
    'gen-z': [
      'Your potential is literally immaculate',
      'Manifest that energy and watch it happen',
      'No cap you are that person',
      'The universe is conspiring in your favor',
      'Literally just believe and it will happen periodt',
    ],
    formal: [
      'Strive for excellence in all endeavors',
      'Pursue your objectives with determination',
      'Commit to ongoing professional development',
      'Embrace challenges as opportunities',
      'Foster an environment of continuous growth',
    ],
  },
  'Event Poster': {
    funny: [
      'SAVE THE DATE - You will definitely want to be here',
      'YOU ARE INVITED - (Please send regrets beforehand)',
      'MARK YOUR CALENDAR - We are too excited',
      'DO NOT MISS THIS - Unlike your other plans',
      'COMING SOON - Probably',
    ],
    sarcastic: [
      'SAVE THE DATE - If you feel like it',
      'YOU ARE CORDIALLY INVITED - Probably not really',
      'MARK YOUR CALENDAR - We are not sure you will come',
      'DO NOT MISS OUT - Jk we will be fine either way',
      'COMING SOON - Whenever we finish planning',
    ],
    professional: [
      'ATTEND OUR PREMIER EVENT - Transform Your Business',
      'EXCLUSIVE OPPORTUNITY - Network with Industry Leaders',
      'REGISTER NOW - Limited Capacity Available',
      'JOIN US - Innovation Meets Excellence',
      'SAVE YOUR SEAT - Executive Summit 2024',
    ],
    'gen-z': [
      'THIS EVENT WILL HIT DIFFERENT - Come through',
      'YOU NEED TO BE THERE - Literally periodt',
      'MARK YOUR CALENDAR - No cap it is giving main character',
      'RSVP ASAP - Spots filling up fr fr',
      'COMING SOON - Prepare to have the time of your life',
    ],
    formal: [
      'ATTEND OUR DISTINGUISHED GATHERING',
      'YOU ARE CORDIALLY INVITED TO A SPECIAL OCCASION',
      'PLEASE MARK YOUR CALENDAR FOR THIS IMPORTANT EVENT',
      'RESERVE YOUR ATTENDANCE AT THIS EXCLUSIVE OCCASION',
      'ATTENDEES REQUESTED FOR THIS PREMIER GATHERING',
    ],
  },
  'Blank Canvas': {
    funny: ['Add your own text', 'Make something amazing', 'Your creativity here', 'Start creating now'],
    sarcastic: ['Your text goes here', 'If you feel inspired', 'Make it funny', 'Or not, whatever'],
    professional: ['Add your headline', 'Insert your message', 'Place your text here', 'Your content here'],
    'gen-z': ['Slay here', 'Make it pop', 'This is your moment', 'Go off bestie'],
    formal: ['Insert your heading', 'Provide your text', 'Your message here', 'Insert content'],
  },
}

export async function POST(request: Request) {
  try {
    const { template, currentText, tone = 'funny' } = await request.json()

    const toneKey = tone as Tone
    const templateCaptions = captionDatabase[template] || captionDatabase['Drake Meme']
    const toneCaptions = templateCaptions[toneKey] || templateCaptions.funny
    const randomCaption = toneCaptions[Math.floor(Math.random() * toneCaptions.length)]

    return Response.json({ caption: randomCaption })
  } catch (error) {
    console.log('[v0] Caption generation error:', error)
    return Response.json({ error: 'Failed to generate caption' }, { status: 500 })
  }
}
