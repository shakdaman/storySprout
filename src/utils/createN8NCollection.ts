import { 
  collection, 
  doc, 
  addDoc, 
  getDocs,
  deleteDoc,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';
import type { N8NStoryData } from '../types';

/**
 * Utility to recreate the n8n collection in the correct database
 * This ensures we're working with the right Firebase project
 */
export class N8NCollectionManager {
  
  /**
   * Clear all existing n8n data (for testing purposes)
   */
  static async clearN8NCollection(): Promise<void> {
    try {
      console.log('🧹 Clearing existing n8n collection...');
      
      const n8nStoriesRef = collection(db, 'n8nStories');
      const emailCampaignsRef = collection(db, 'emailCampaigns');
      
      // Get all documents and delete them
      const [storiesSnapshot, campaignsSnapshot] = await Promise.all([
        getDocs(n8nStoriesRef),
        getDocs(emailCampaignsRef)
      ]);
      
      const batch = writeBatch(db);
      
      // Delete all story documents
      storiesSnapshot.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });
      
      // Delete all campaign documents
      campaignsSnapshot.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });
      
      await batch.commit();
      
      console.log('✅ N8N collections cleared successfully');
      console.log(`📊 Deleted ${storiesSnapshot.size} stories and ${campaignsSnapshot.size} campaigns`);
      
    } catch (error) {
      console.error('❌ Error clearing n8n collection:', error);
      throw error;
    }
  }
  
  /**
   * Create a test document to verify the collection works
   */
  static async createTestDocument(): Promise<string> {
    try {
      console.log('🧪 Creating test document...');
      
      const testData: Omit<N8NStoryData, 'id' | 'createdAt'> = {
        studentName: "Test Student",
        grade: 5,
        storyTitle: "Test Story",
        storyBody: "This is a test story to verify the n8n collection is working properly.",
        vocabulary: [
          {
            word: "Test",
            definition: "A procedure intended to establish the quality, performance, or reliability of something."
          }
        ],
        imagePrompt: "A simple test illustration",
        quiz: {
          multipleChoice: [
            {
              question: "What is this?",
              options: ["A test", "A real story", "A mistake", "Nothing"],
              answer: "A test"
            }
          ],
          openEnded: [
            {
              question: "Is this working?",
              sampleAnswer: "Yes, this is a test to verify the collection is working."
            }
          ]
        },
        recipientType: "student",
        recipientEmail: "test@example.com",
        subject: "Test Story - Collection Verification",
        status: "pending",
        metadata: {
          n8nWorkflowId: "test-workflow",
          n8nExecutionId: "test-execution",
          deliveryAttempts: 0
        }
      };
      
      const docRef = await addDoc(collection(db, 'n8nStories'), {
        ...testData,
        createdAt: serverTimestamp()
      });
      
      console.log('✅ Test document created with ID:', docRef.id);
      return docRef.id;
      
    } catch (error) {
      console.error('❌ Error creating test document:', error);
      throw error;
    }
  }
  
  /**
   * Verify the collection exists and is accessible
   */
  static async verifyCollection(): Promise<boolean> {
    try {
      console.log('🔍 Verifying n8n collection...');
      
      const n8nStoriesRef = collection(db, 'n8nStories');
      const snapshot = await getDocs(n8nStoriesRef);
      
      console.log(`✅ Collection verified. Found ${snapshot.size} documents.`);
      
      // Log document IDs for verification
      snapshot.forEach((doc) => {
        console.log(`📄 Document ID: ${doc.id}`);
      });
      
      return true;
      
    } catch (error) {
      console.error('❌ Error verifying collection:', error);
      return false;
    }
  }
  
  /**
   * Full collection recreation process
   */
  static async recreateCollection(): Promise<void> {
    try {
      console.log('🚀 Starting n8n collection recreation...');
      console.log('📍 Target database: storysprout-a1166');
      
      // Step 1: Clear existing data
      await this.clearN8NCollection();
      
      // Step 2: Create test document
      const testDocId = await this.createTestDocument();
      
      // Step 3: Verify collection
      const isVerified = await this.verifyCollection();
      
      if (isVerified) {
        console.log('🎉 N8N collection recreation completed successfully!');
        console.log(`📋 Test document ID: ${testDocId}`);
        console.log('🌐 You can now access: http://localhost:5173/parent/n8n-test');
      } else {
        throw new Error('Collection verification failed');
      }
      
    } catch (error) {
      console.error('💥 Collection recreation failed:', error);
      throw error;
    }
  }
}

// Export convenience functions
export const clearN8NCollection = N8NCollectionManager.clearN8NCollection;
export const createTestDocument = N8NCollectionManager.createTestDocument;
export const verifyCollection = N8NCollectionManager.verifyCollection;
export const recreateCollection = N8NCollectionManager.recreateCollection;
