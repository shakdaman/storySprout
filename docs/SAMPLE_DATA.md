# Sample Data for StorySprout Testing

## Sample Stories

Add these to your Firestore `stories` collection:

### Story 1: "The Magic Garden"
```json
{
  "title": "The Magic Garden",
  "content": "Once upon a time, in a small village, there lived a little girl named Lily. She loved flowers more than anything in the world. One day, while walking through the forest, she discovered a hidden garden filled with the most beautiful flowers she had ever seen.\n\nThe garden was magical! The flowers could talk and sing. They told Lily that they had been waiting for someone special to care for them. Lily promised to visit every day and help the flowers grow.\n\nFrom that day forward, Lily became the guardian of the magic garden. She learned that kindness and love could make even the smallest things bloom into something wonderful.",
  "author": "StorySprout AI",
  "createdAt": "2024-01-15T10:00:00Z",
  "readingLevel": "beginner",
  "estimatedReadingTime": 3,
  "tags": ["magic", "flowers", "friendship", "nature"],
  "quizId": "quiz_magic_garden"
}
```

### Story 2: "The Brave Little Robot"
```json
{
  "title": "The Brave Little Robot",
  "content": "In a world where robots and humans lived together, there was a small robot named Robo. Unlike other robots, Robo was curious about everything around him. He wanted to explore the world beyond his factory.\n\nOne day, Robo decided to go on an adventure. He met talking animals, climbed tall mountains, and even helped a lost child find their way home. Through his journey, Robo learned that being different was actually a superpower.\n\nWhen Robo returned home, he shared his stories with other robots. Soon, many robots began exploring and helping humans in new ways. Robo had started a revolution of kindness and curiosity!",
  "author": "StorySprout AI",
  "createdAt": "2024-01-16T10:00:00Z",
  "readingLevel": "intermediate",
  "estimatedReadingTime": 5,
  "tags": ["robots", "adventure", "bravery", "technology"],
  "quizId": "quiz_brave_robot"
}
```

### Story 3: "The Star Collector"
```json
{
  "title": "The Star Collector",
  "content": "High above the clouds, in a castle made of starlight, lived an old astronomer named Celeste. She had spent her entire life studying the stars and collecting their stories. Each star had a unique tale to tell about distant worlds and ancient civilizations.\n\nOne evening, a shooting star crashed into her observatory. Inside the glowing meteorite, Celeste found a message from a planet far away. The inhabitants were asking for help because their sun was dying.\n\nCeleste knew she had to act quickly. She gathered her collection of star stories and used their combined wisdom to create a new sun for the distant planet. The grateful inhabitants sent her a constellation as a thank you gift, which still shines in our night sky today.",
  "author": "StorySprout AI",
  "createdAt": "2024-01-17T10:00:00Z",
  "readingLevel": "advanced",
  "estimatedReadingTime": 7,
  "tags": ["space", "stars", "helping", "science"],
  "quizId": "quiz_star_collector"
}
```

## Sample Quizzes

Add these to your Firestore `quizzes` collection:

### Quiz 1: Magic Garden Quiz
```json
{
  "id": "quiz_magic_garden",
  "storyId": "story_magic_garden",
  "title": "The Magic Garden Quiz",
  "createdAt": "2024-01-15T10:00:00Z",
  "questions": [
    {
      "id": "q1",
      "question": "What was the little girl's name in the story?",
      "options": ["Rose", "Lily", "Daisy", "Violet"],
      "correctAnswer": 1,
      "explanation": "The little girl's name was Lily."
    },
    {
      "id": "q2",
      "question": "What did Lily love more than anything?",
      "options": ["Toys", "Flowers", "Books", "Candy"],
      "correctAnswer": 1,
      "explanation": "Lily loved flowers more than anything in the world."
    },
    {
      "id": "q3",
      "question": "What made the garden special?",
      "options": ["It was very big", "The flowers could talk and sing", "It had rare flowers", "It was hidden"],
      "correctAnswer": 1,
      "explanation": "The garden was magical because the flowers could talk and sing."
    },
    {
      "id": "q4",
      "question": "What did Lily promise to do?",
      "options": ["Take flowers home", "Visit every day", "Tell her friends", "Draw pictures"],
      "correctAnswer": 1,
      "explanation": "Lily promised to visit every day and help the flowers grow."
    }
  ]
}
```

### Quiz 2: Brave Robot Quiz
```json
{
  "id": "quiz_brave_robot",
  "storyId": "story_brave_robot",
  "title": "The Brave Little Robot Quiz",
  "createdAt": "2024-01-16T10:00:00Z",
  "questions": [
    {
      "id": "q1",
      "question": "What was the robot's name?",
      "options": ["Robo", "Bot", "Cyborg", "Android"],
      "correctAnswer": 0,
      "explanation": "The robot's name was Robo."
    },
    {
      "id": "q2",
      "question": "What made Robo different from other robots?",
      "options": ["He was bigger", "He was curious", "He was faster", "He was older"],
      "correctAnswer": 1,
      "explanation": "Robo was curious about everything around him."
    },
    {
      "id": "q3",
      "question": "What did Robo help during his adventure?",
      "options": ["A lost robot", "A lost child", "A lost animal", "A lost toy"],
      "correctAnswer": 1,
      "explanation": "Robo helped a lost child find their way home."
    },
    {
      "id": "q4",
      "question": "What did Robo learn about being different?",
      "options": ["It was bad", "It was a superpower", "It was scary", "It was hard"],
      "correctAnswer": 1,
      "explanation": "Robo learned that being different was actually a superpower."
    }
  ]
}
```

## Sample Child Profile

Add this to your Firestore `children` collection (replace parentId with actual parent ID):

```json
{
  "parentId": "your-parent-id-here",
  "name": "Emma",
  "username": "emma123",
  "pin": "1234",
  "avatar": "🐰",
  "createdAt": "2024-01-15T09:00:00Z",
  "preferences": {
    "readingLevel": "beginner",
    "interests": ["magic", "animals", "nature"]
  }
}
```

## How to Add Sample Data

### Method 1: Firebase Console
1. Go to Firebase Console > Firestore Database
2. Click on the collection name (e.g., "stories")
3. Click "Add document"
4. Copy and paste the JSON data
5. Click "Save"

### Method 2: Firebase CLI
1. Create a file called `sample-data.json` with the data above
2. Use Firebase CLI to import:
```bash
firebase firestore:import sample-data.json
```

### Method 3: Programmatically
You can also add this data programmatically using the Firebase SDK in your application.

## Testing the Application

1. **Create a parent account** using Google OAuth
2. **Add a child profile** using the parent dashboard
3. **Login as the child** using username and PIN
4. **Read the sample stories** from the child dashboard
5. **Take the quizzes** and verify scoring works
6. **Check progress tracking** in the parent dashboard

## Customization

Feel free to modify these sample stories and quizzes to:
- Match your target age group
- Include your brand voice
- Test different reading levels
- Add more complex quiz questions
- Include multimedia elements

Remember to update the `quizId` references in stories to match the actual quiz IDs in your Firestore database.
