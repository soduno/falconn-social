export type PostComment = {
  id: number;
  author: string,
  comment: string,
  date: string,
  parent: number | null,
}

export const postCommentsDummy: PostComment[] = [
  {
    id: 1,
    author: "John Doe",
    comment: "This is a great article, very informative!",
    date: "2025-01-24T10:30:00Z",
    parent: null,
  },
  {
    id: 2,
    author: "Jane Smith",
    comment: "I totally agree with your point on user experience.",
    date: "2025-01-24T11:00:00Z",
    parent: 1,
  },
  {
    id: 3,
    author: "TechGuru89",
    comment: "Have you considered adding more examples to clarify this?",
    date: "2025-01-23T15:45:00Z",
    parent: null,
  },
  {
    id: 4,
    author: "Sara Connor",
    comment: "Thanks for sharing this. It really helped me understand the topic better.",
    date: "2025-01-23T16:10:00Z",
    parent: null,
  },
  {
    id: 5,
    author: "Mark Taylor",
    comment: "Can someone explain the second point further? I'm a bit confused.",
    date: "2025-01-24T09:15:00Z",
    parent: null,
  },
  {
    id: 6,
    author: "Emily Johnson",
    comment: "Sure, Mark. The second point refers to how responsive design adapts to screen size.",
    date: "2025-01-24T09:25:00Z",
    parent: 5,
  },
  {
    id: 7,
    author: "Developer101",
    comment: "Great read! I implemented something similar in my last project.",
    date: "2025-01-23T14:30:00Z",
    parent: null,
  },
  {
    id: 8,
    author: "Alex White",
    comment: "This doesn't work for me in Safari. Any suggestions?",
    date: "2025-01-24T08:45:00Z",
    parent: null,
  },
  {
    id: 9,
    author: "Chris Blue",
    comment: "Alex, try enabling experimental features in Safari. It worked for me.",
    date: "2025-01-24T08:50:00Z",
    parent: 8,
  },
  {
    id: 10,
    author: "Sophia Green",
    comment: "I think the author could expand on accessibility a bit more.",
    date: "2025-01-23T12:00:00Z",
    parent: null,
  },
  {
    id: 11,
    author: "Michael Scott",
    comment: "Is this compatible with the latest version of Node.js?",
    date: "2025-01-24T07:30:00Z",
    parent: null,
  },
  {
    id: 12,
    author: "Dwight Schrute",
    comment: "Michael, yes it is! I tested it on Node.js v20.",
    date: "2025-01-24T07:45:00Z",
    parent: 11,
  },
  {
    id: 13,
    author: "Angela Martin",
    comment: "This saved me so much time. Thank you!",
    date: "2025-01-23T18:20:00Z",
    parent: null,
  },
  {
    id: 14,
    author: "Jim Halpert",
    comment: "You're welcome, Angela! Glad it helped.",
    date: "2025-01-23T18:35:00Z",
    parent: 13,
  },
  {
    id: 15,
    author: "Pam Beesly",
    comment: "This is such a wholesome thread. Great job, everyone!",
    date: "2025-01-24T10:00:00Z",
    parent: null,
  },
];

type postDummyProps = {
  author: string;
  content: string;
  media: string;
  createdAt: string;
}

export const postsDummy: postDummyProps[] = [
  {
    author: "John Doe",
    content: "Exploring the beauty of nature 🌿🌄 #NatureLover #TravelDiaries",
    media: "https://example.com/images/nature1.jpg",
    createdAt: '2 mins ago'
  },
  {
    author: "Emily Smith",
    content: "Just baked my first sourdough bread! 🍞✨ #BakingAdventures",
    media: "https://example.com/images/sourdough.jpg",
    createdAt: '2 mins ago'
  },
  {
    author: "TechSavvy",
    content: "The future is here! Check out this cutting-edge AI robot 🤖. Thoughts? #TechTrends",
    media: "https://example.com/images/ai_robot.jpg",
    createdAt: '2 mins ago'
  },
  {
    author: "FitnessGuru",
    content: "Morning workouts never felt this good! 💪🌞 #FitnessJourney",
    media: "https://example.com/images/workout.jpg",
    createdAt: '2 mins ago'
  },
  {
    author: "TravelNomad",
    content: "Greetings from the heart of Milan 🇮🇹🛵 #Wanderlust",
    media: "https://example.com/images/milan.jpg",
    createdAt: '2 mins ago'
  },
  {
    author: "FoodieWorld",
    content: "The best tiramisu I've ever had 😍🍮 #FoodiesParadise",
    media: "https://example.com/images/tiramisu.jpg",
    createdAt: '2 mins ago'
  },
  {
    author: "ArtEnthusiast",
    content: "Sharing my latest painting inspired by Van Gogh 🎨✨ #ArtLove",
    media: "https://example.com/images/painting.jpg",
    createdAt: '2 mins ago'
  }
];