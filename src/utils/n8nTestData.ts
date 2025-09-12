import { N8NDatabaseService } from '../services/n8nDatabase';
import type { N8NStoryData } from '../types';

/**
 * Sample n8n data for testing the database implementation
 * This matches the structure provided in the user's example
 */
export const sampleN8NData: Omit<N8NStoryData, 'id' | 'createdAt'>[] = [
  {
    studentName: "Jayson",
    grade: 5,
    storyTitle: "The Tater Timer",
    storyBody: "Jayson carefully adjusted the copper wire, nudging it a millimeter to the left. His project, \"The Tater Timer,\" wasn't flashy. It was a simple digital clock powered by two potatoes. But it was his. He had spent weeks researching electrochemical reactions, **meticulous** in his notes and diagrams. He was proud of how it turned out, the little red numbers on the clock face glowing steadily.\n\nThen, Angel rolled in his project. It was a giant, papier-mâché volcano that nearly touched the ceiling of the school gymnasium. It had tubes, blinking lights, and a hidden fog machine. A sign in glittery letters read: \"The Volcanic Vindicator.\" Angel, a cool and confident sixth-grader, saw Jayson staring. \"Pretty cool, right?\" Angel said with a grin. \"Gonna simulate a pyroclastic flow with baking soda and a super-catalyst.\"\n\nJayson's heart sank. His potato clock suddenly felt tiny and boring. Who would care about a potato when there was a volcano in the room? The gym filled with students and parents. A crowd immediately formed around Angel's project, oohing and aahing as he flipped a switch that made the lights blink in an **intricate** pattern. Jayson stood by his table, feeling invisible. He watched as Angel soaked up the attention, explaining his project with big words Jayson didn't understand.\n\nFeeling **despondent**, Jayson slumped in his chair. Maybe he shouldn't have even entered. A few people glanced at his project, smiled politely, and moved on. Then, a woman with a clipboard and a warm smile stopped. It was Mrs. Davis, the head science teacher and one of the judges.\n\n\"The Tater Timer,\" she read. \"Tell me about it, Jayson.\"\n\nJayson, surprised, straightened up. He nervously explained how the phosphoric acid in the potato acts as an electrolyte, creating a small electrical current between the copper and zinc strips he'd inserted. He showed her his detailed research journal. Mrs. Davis listened intently, nodding. She asked him about the voltage and why he chose two potatoes instead of one. Jayson answered every question, his confidence growing with each sentence. He knew this stuff.\n\n\"Very impressive, well-documented work,\" she said before moving on. It was a small moment, but it felt like a lifeline.\n\nThe time for the final presentations arrived. The judges gathered, and a hush fell over the gym. They started at the far end and worked their way down the line. Finally, they arrived at Angel's volcano. It was the moment everyone was waiting for.\n\n\"And now,\" Angel announced dramatically, \"for the grand finale!\" He poured a beaker of purple liquid into the top of the volcano. The fog machine hissed. The lights blinked faster. The crowd leaned in. But nothing happened. Angel frowned and poured in another beaker. The volcano gurgled, let out a puff of smelly, green smoke, and then a single, sad bubble of foam oozed down its side. One of the blinking lights fizzled and went dark.\n\nIt was a dud. Angel's face turned bright red. One of the judges asked him what the \"super-catalyst\" was. Angel mumbled, \"It's... concentrated grape juice. I thought it would look cool.\" The judges looked at each other. His project was all for show. It was an **ostentatious** display with no real science behind it.\n\nThey moved on to Jayson's table. The little red numbers on his clock were still glowing, steady as ever. He explained his project again, this time to the full panel. He didn't use fancy words, but he spoke with certainty. He showed them how the clock had been running continuously for three hours.\n\nAt the awards ceremony, Jayson didn't win the grand prize. That went to a girl who had built a working robotic arm. But he did win the \"Scientific Integrity\" award. In his closing remarks, the head judge said, \"Science isn't always about the biggest bang. It's about curiosity, process, and proving what you know. Jayson's project is a perfect example of that.\"\n\nLater, Angel came over to Jayson's table. \"Hey,\" he said, looking at the floor. \"Your project was actually cool. I just wanted to build something that looked impressive.\"\n\nJayson looked at his humble potato clock, which was still ticking away. \"Thanks,\" he said, a genuine smile spreading across his face. He learned that being flashy wasn't as important as being real. And sometimes, the most impressive things were the ones that quietly and consistently just worked.",
    vocabulary: [
      {
        word: "Meticulous",
        definition: "Showing great attention to detail; very careful and precise."
      },
      {
        word: "Intricate",
        definition: "Having many complexly interrelated parts or details."
      },
      {
        word: "Despondent",
        definition: "Feeling or showing profound hopelessness or discouragement."
      },
      {
        word: "Ostentatious",
        definition: "Characterized by a pretentious or showy display designed to impress."
      }
    ],
    imagePrompt: "A 5th-grade boy, Jayson, stands proudly next to his science fair project, a small digital clock powered by two potatoes with wires. In the background, a much larger, more elaborate volcano project is fizzling out with a puff of smoke, and the 6th-grade boy, Angel, who built it looks embarrassed. The scene is in a bustling school gym, filled with other students and projects. The style should be a vibrant, slightly stylized digital illustration, emphasizing the contrast between the simple, working project and the flashy, failing one.",
    quiz: {
      multipleChoice: [
        {
          question: "What was Jayson's science fair project called?",
          options: [
            "The Potato Powerhouse",
            "The Tater Timer",
            "The Spud Clock",
            "The Electric Vegetable"
          ],
          answer: "The Tater Timer"
        },
        {
          question: "Why did Jayson initially feel bad about his project?",
          options: [
            "He forgot to bring the instruction manual.",
            "He thought it was too simple compared to Angel's flashy volcano.",
            "A judge told him it was boring.",
            "His clock wasn't working correctly."
          ],
          answer: "He thought it was too simple compared to Angel's flashy volcano."
        },
        {
          question: "What award did Jayson win at the science fair?",
          options: [
            "Grand Prize",
            "Most Creative Project",
            "The \"Scientific Integrity\" award.",
            "Second Place"
          ],
          answer: "The \"Scientific Integrity\" award."
        },
        {
          question: "In the context of the story, what does the word **ostentatious** mean?",
          options: [
            "Quiet and humble.",
            "Scientifically accurate.",
            "Very colorful.",
            "Designed to be flashy and attract attention."
          ],
          answer: "Designed to be flashy and attract attention."
        }
      ],
      openEnded: [
        {
          question: "Explain how Jayson's feelings about his project changed from the beginning of the story to the end. What caused this change?",
          sampleAnswer: "At the beginning, Jayson felt his project was boring and insignificant compared to Angel's. This changed after a judge showed genuine interest and he realized he could confidently answer her questions. His feelings changed completely when his project worked perfectly and won an award while Angel's flashy project failed, teaching him that substance is more important than showiness."
        },
        {
          question: "What lesson did Angel learn at the science fair? How do you know?",
          sampleAnswer: "Angel learned that it's more important to have real scientific understanding than to just create something that looks impressive. We know he learned this because his project failed, and he later admitted to Jayson that he just wanted to build something that \"looked impressive,\" implying he realized Jayson's genuinely scientific project was better."
        }
      ]
    },
    recipientType: "student",
    recipientEmail: "jaysond1020@icloud.com",
    subject: "Jayson, your daily story adventure is here! 🚀",
    status: "pending",
    metadata: {
      n8nWorkflowId: "story-generation-workflow",
      n8nExecutionId: "exec-12345",
      deliveryAttempts: 0
    }
  },
  {
    studentName: "Angel",
    grade: 6,
    storyTitle: "The Commodore's Code",
    storyBody: "The universe was about to collapse, and only Angel could stop it. On the screen, his ship, the *Stardust Drifter*, dodged a volley of plasma fire from the final boss in *Galaxy Gliders*. The boss, a mythical pilot known only as \"The Commodore,\" was notoriously impossible to beat. For three weeks, Angel had dedicated every spare moment to this fight. He was so close. His thumbs flew across the controller in a blur.\n\n\"Hey, Angel, wanna see the rocket I built?\" a voice called from the doorway. Jayson, the fifth-grader from next door, held up a contraption made of plastic bottles and cardboard fins.\n\n\"Not now, Jayson. I'm at the final level,\" Angel said, his eyes glued to the screen. He didn't have time for kid stuff. This was serious.\n\nThe Commodore's ship unleashed a new attack, a swirling vortex of energy. Angel executed a perfect counter-move he'd practiced for days. He had him. He was going to win. And then, the screen went black. The entire house fell silent, the hum of the refrigerator and the glow of the television vanishing in an instant. A power outage.\n\n\"No!\" Angel shouted, throwing his controller onto the couch. All that progress, gone. Frustrated, he stomped outside into the bright afternoon sun. The street was quiet, except for a faint, rhythmic sanding sound coming from the garage of his elderly neighbor, Mr. Kai. Angel had never spoken to him much; he was a quiet man who mostly kept to himself. Peeking into the open garage, Angel saw Mr. Kai hunched over a workbench, meticulously sanding a small, wooden object. It was a model, intricately detailed, of a spaceship. Angel's jaw dropped. It wasn't just any spaceship; it was a perfect, miniature replica of The Commodore's legendary vessel from *Galaxy Gliders*.\n\nHe walked in, a dozen questions swirling in his mind. \"How do you know that ship?\"\n\nMr. Kai looked up, his eyes crinkling at the corners as he smiled. \"This old thing? I designed it a long, long time ago. Hello, Angel. I'm Kai.\"\n\nAngel was skeptical. \"You designed it? For the game?\"\n\n\"In a way,\" Kai said, setting down the model. \"I used to be a programmer. Back in the early days. We focused on gameplay, not just fancy graphics.\" He gestured to an old, beige computer tower tucked under the bench. \"The games we made were different. They required imagination.\"\n\nAngel scoffed. \"I bet they were easy. Games today are way more complex.\"\n\nKai's smile widened. He booted up the old machine. On the black screen, green text appeared: *Zorkian Realms: The Crystal Caverns*. \"Give it a try,\" he offered. \"No controller. Just you, and the keyboard.\"\n\nThe game was entirely text. *You are in a dark cavern. A passage leads north. There is a small, glowing crystal on the ground.* Angel typed, *Go north*. The game responded, *The passage is blocked by a **byzantine** maze of tangled roots. What do you do?* Angel tried everything he could think of: *Run through roots. Break roots. Use sword.* Each time, the game responded, *You can't do that.* He was used to buttons that solved problems. This game demanded thought and description. After thirty minutes of failing to even get out of the first room, he slumped back, completely humbled.\n\n\"It's not about reflexes, is it?\" Angel admitted, his earlier arrogance gone.\n\n\"No,\" Kai said kindly. \"It's about logic. You have to think about the world, not just react to it.\"\n\nThat afternoon was the first of many. Angel stopped obsessing over *Galaxy Gliders* and started spending his afternoons in Mr. Kai's garage. He learned that Kai had been a lead developer at the company that created his favorite game, decades ago, before it was sold and rebooted. \"The Commodore\" was his old testing handle. Mr. Kai taught Angel the **rudimentary** principles of coding, showing him how simple text commands could create entire worlds. Angel's fascination grew. He wasn't just playing a game anymore; he was learning the secrets behind it.\n\nOne day, Jayson came by, hesitantly holding his plastic bottle rocket. \"Still busy?\" he asked.\n\nBefore, Angel would have brushed him off. But something had changed. He saw the hopeful, creative spark in Jayson's eyes. It was the same spark he now felt when Mr. Kai showed him a new line of code. \"Hey,\" Angel said, turning from the computer. \"That's a cool rocket. You know, I bet we could design a game about it.\"\n\nJayson's face lit up. \"Really?\"\n\n\"Yeah,\" Angel said, a new kind of excitement in his voice. \"Mr. Kai is teaching me how to build things. Let's start with something simple.\"\n\nTheir work became a **collaborative** effort. Jayson would draw spaceship designs and dream up storylines, while Angel would translate their ideas into simple commands on Mr. Kai's old computer. It was slow and often frustrating, but for the first time, Angel felt the deep satisfaction of creating something from nothing. He was no longer just a player trying to conquer someone else's world. He was a builder, an architect of his own universe, with his friend right there beside him. Weeks later, they showed Mr. Kai their first playable level: a simple rocket, made of text characters, successfully launching into a sky of twinkling asterisks. Kai didn't just praise it; he saw the future in it, and in Angel's newfound purpose. Angel had finally found a game worth winning.",
    vocabulary: [
      {
        word: "byzantine",
        definition: "(adj.) Excessively complicated, and typically involving a great deal of administrative detail."
      },
      {
        word: "rudimentary",
        definition: "(adj.) Involving or limited to basic principles."
      },
      {
        word: "collaborative",
        definition: "(adj.) Produced or conducted by two or more parties working together."
      }
    ],
    imagePrompt: "A 6th-grade boy, Angel, and a 5th-grade boy, Jayson, sit on the floor of a garage, looking up with admiration at an elderly man, Mr. Kai. Mr. Kai is pointing at a computer screen displaying simple lines of code. The garage is filled with old computer parts, schematics, and a beautifully detailed model of a futuristic spaceship on a workbench. The mood is one of mentorship, discovery, and intergenerational friendship, with warm light illuminating the scene.",
    quiz: {
      multipleChoice: [
        {
          question: "In the story, who is the legendary player known as \"The Commodore\"?",
          options: [
            "A professional gamer he met online.",
            "Jayson, his younger friend.",
            "Mr. Kai, his elderly neighbor.",
            "A character inside the video game."
          ],
          answer: "Mr. Kai, his elderly neighbor."
        },
        {
          question: "Why did Angel find Mr. Kai's text-based adventure game so difficult at first?",
          options: [
            "The computer was too old and slow to play on.",
            "The game was in a language he didn't understand.",
            "It required logic and patience, not just fast reflexes.",
            "Jayson kept distracting him while he was trying to play."
          ],
          answer: "It required logic and patience, not just fast reflexes."
        },
        {
          question: "What was Mr. Kai's connection to Angel's favorite game, \"Galaxy Gliders\"?",
          options: [
            "He had read the official strategy guide.",
            "He was one of the original designers of the game.",
            "He was secretly the world's best player.",
            "He bought the company that made the game."
          ],
          answer: "He was one of the original designers of the game."
        },
        {
          question: "How does Angel's main hobby change by the end of the story?",
          options: [
            "He sells his video game console for a new computer.",
            "He gives up on video games entirely.",
            "He beats \"Galaxy Gliders\" and loses interest.",
            "He begins creating a new game with Jayson."
          ],
          answer: "He begins creating a new game with Jayson."
        }
      ],
      openEnded: [
        {
          question: "Describe Angel's character growth in the story. How did his attitude towards gaming and other people, like Jayson, change?",
          sampleAnswer: "At the beginning, Angel was arrogant and singularly focused on conquering his video game, ignoring Jayson. After meeting Mr. Kai and being humbled, he learns to appreciate the creativity and complexity behind games. His attitude shifts from being a consumer to a creator, and he becomes more patient, curious, and collaborative, choosing to work with Jayson on their own project instead of isolating himself."
        },
        {
          question: "Explain the importance of the story's twist, when Angel discovers Mr. Kai's true identity. How does this discovery change their relationship?",
          sampleAnswer: "The twist that Mr. Kai is \"The Commodore\" and a game design legend is crucial because it shatters Angel's narrow view of success in gaming. It teaches him that true mastery lies in creation, not just performance. This discovery transforms his relationship with Mr. Kai from one of simple curiosity to deep respect and mentorship, opening the door for Angel to learn and grow in ways he never imagined."
        }
      ]
    },
    recipientType: "student",
    recipientEmail: "angeld0427@icloud.com",
    subject: "Angel, your new mission awaits! 🗺️",
    status: "pending",
    metadata: {
      n8nWorkflowId: "story-generation-workflow",
      n8nExecutionId: "exec-12346",
      deliveryAttempts: 0
    }
  }
];

/**
 * Test function to demonstrate n8n database operations
 * This function can be called from the browser console or a test component
 */
export async function testN8NDatabase(): Promise<void> {
  console.log('🧪 Testing N8N Database Service...');
  
  try {
    // Test 1: Create batch story data
    console.log('📝 Creating batch story data...');
    const createResult = await N8NDatabaseService.createBatchStoryData(sampleN8NData);
    
    if (createResult.success && createResult.data) {
      console.log('✅ Successfully created', createResult.data.length, 'stories');
      console.log('📊 Created stories:', createResult.data.map(s => ({ id: s.id, title: s.storyTitle })));
      
      // Test 2: Get collection stats
      console.log('📈 Getting collection statistics...');
      const statsResult = await N8NDatabaseService.getCollectionStats();
      
      if (statsResult.success && statsResult.data) {
        console.log('📊 Collection Stats:', statsResult.data);
      }
      
      // Test 3: Get stories by status
      console.log('🔍 Getting pending stories...');
      const pendingResult = await N8NDatabaseService.getStoryDataByStatus('pending');
      
      if (pendingResult.success && pendingResult.data) {
        console.log('⏳ Pending stories:', pendingResult.data.length);
      }
      
      // Test 4: Update a story status
      if (createResult.data.length > 0) {
        const firstStoryId = createResult.data[0].id;
        console.log('🔄 Updating story status to sent...');
        
        const updateResult = await N8NDatabaseService.updateStoryStatus(
          firstStoryId, 
          'sent',
          { deliveryAttempts: 1 }
        );
        
        if (updateResult.success) {
          console.log('✅ Story status updated successfully');
        }
      }
      
    } else {
      console.error('❌ Failed to create story data:', createResult.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
  
  console.log('🏁 N8N Database test completed');
}

/**
 * Utility function to seed the database with sample data
 * Call this function to populate your database for testing
 */
export async function seedN8NDatabase(): Promise<void> {
  console.log('🌱 Seeding N8N database with sample data...');
  
  const result = await N8NDatabaseService.createBatchStoryData(sampleN8NData);
  
  if (result.success) {
    console.log('✅ Database seeded successfully with', result.data?.length, 'stories');
  } else {
    console.error('❌ Failed to seed database:', result.error);
  }
}
