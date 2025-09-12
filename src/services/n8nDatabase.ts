import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  writeBatch,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';
import type { 
  N8NStoryData, 
  N8NCollectionStats, 
  EmailCampaign,
  ApiResponse 
} from '../types';

// Collection names
const N8N_STORIES_COLLECTION = 'n8nStories';
const EMAIL_CAMPAIGNS_COLLECTION = 'emailCampaigns';

/**
 * N8N Database Service
 * Handles all database operations for n8n automation data
 */
export class N8NDatabaseService {
  
  /**
   * Store n8n story data with auto-generated unique ID
   */
  static async createStoryData(storyData: Omit<N8NStoryData, 'id' | 'createdAt'>): Promise<ApiResponse<N8NStoryData>> {
    try {
      const storyRef = collection(db, N8N_STORIES_COLLECTION);
      
      const newStory: Omit<N8NStoryData, 'id'> = {
        ...storyData,
        createdAt: new Date(),
        status: storyData.status || 'pending'
      };

      const docRef = await addDoc(storyRef, {
        ...newStory,
        createdAt: serverTimestamp()
      });

      return {
        success: true,
        data: {
          ...newStory,
          id: docRef.id
        },
        message: 'Story data created successfully'
      };
    } catch (error) {
      console.error('Error creating story data:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Store multiple n8n story data entries in a batch
   */
  static async createBatchStoryData(storiesData: Omit<N8NStoryData, 'id' | 'createdAt'>[]): Promise<ApiResponse<N8NStoryData[]>> {
    try {
      const batch = writeBatch(db);
      const createdStories: N8NStoryData[] = [];

      for (const storyData of storiesData) {
        const storyRef = doc(collection(db, N8N_STORIES_COLLECTION));
        const newStory: N8NStoryData = {
          ...storyData,
          id: storyRef.id,
          createdAt: new Date(),
          status: storyData.status || 'pending'
        };

        batch.set(storyRef, {
          ...newStory,
          createdAt: serverTimestamp()
        });

        createdStories.push(newStory);
      }

      await batch.commit();

      return {
        success: true,
        data: createdStories,
        message: `Successfully created ${createdStories.length} story entries`
      };
    } catch (error) {
      console.error('Error creating batch story data:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get story data by ID
   */
  static async getStoryDataById(id: string): Promise<ApiResponse<N8NStoryData>> {
    try {
      const storyRef = doc(db, N8N_STORIES_COLLECTION, id);
      const storySnap = await getDoc(storyRef);

      if (!storySnap.exists()) {
        return {
          success: false,
          error: 'Story data not found'
        };
      }

      const data = storySnap.data();
      const storyData: N8NStoryData = {
        ...data,
        id: storySnap.id,
        createdAt: data.createdAt?.toDate() || new Date(),
        processedAt: data.processedAt?.toDate()
      } as N8NStoryData;

      return {
        success: true,
        data: storyData
      };
    } catch (error) {
      console.error('Error getting story data:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get all story data with pagination
   */
  static async getAllStoryData(
    pageSize: number = 10,
    lastDoc?: any
  ): Promise<ApiResponse<{ stories: N8NStoryData[], hasMore: boolean, lastDoc: any }>> {
    try {
      let q = query(
        collection(db, N8N_STORIES_COLLECTION),
        orderBy('createdAt', 'desc'),
        limit(pageSize + 1)
      );

      if (lastDoc) {
        q = query(
          collection(db, N8N_STORIES_COLLECTION),
          orderBy('createdAt', 'desc'),
          startAfter(lastDoc),
          limit(pageSize + 1)
        );
      }

      const querySnapshot = await getDocs(q);
      const stories: N8NStoryData[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const storyData: N8NStoryData = {
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate() || new Date(),
          processedAt: data.processedAt?.toDate()
        } as N8NStoryData;
        stories.push(storyData);
      });

      const hasMore = stories.length > pageSize;
      if (hasMore) {
        stories.pop(); // Remove the extra document used for pagination
      }

      const lastDocument = stories.length > 0 ? querySnapshot.docs[stories.length - 1] : null;

      return {
        success: true,
        data: {
          stories,
          hasMore,
          lastDoc: lastDocument
        }
      };
    } catch (error) {
      console.error('Error getting all story data:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get story data by status
   */
  static async getStoryDataByStatus(status: N8NStoryData['status']): Promise<ApiResponse<N8NStoryData[]>> {
    try {
      const q = query(
        collection(db, N8N_STORIES_COLLECTION),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const stories: N8NStoryData[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const storyData: N8NStoryData = {
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate() || new Date(),
          processedAt: data.processedAt?.toDate()
        } as N8NStoryData;
        stories.push(storyData);
      });

      return {
        success: true,
        data: stories
      };
    } catch (error) {
      console.error('Error getting story data by status:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Update story data status
   */
  static async updateStoryStatus(
    id: string, 
    status: N8NStoryData['status'],
    metadata?: Partial<N8NStoryData['metadata']>
  ): Promise<ApiResponse<void>> {
    try {
      const storyRef = doc(db, N8N_STORIES_COLLECTION, id);
      const updateData: any = {
        status,
        processedAt: serverTimestamp()
      };

      if (metadata) {
        updateData.metadata = metadata;
      }

      await updateDoc(storyRef, updateData);

      return {
        success: true,
        message: 'Story status updated successfully'
      };
    } catch (error) {
      console.error('Error updating story status:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Delete story data
   */
  static async deleteStoryData(id: string): Promise<ApiResponse<void>> {
    try {
      const storyRef = doc(db, N8N_STORIES_COLLECTION, id);
      await deleteDoc(storyRef);

      return {
        success: true,
        message: 'Story data deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting story data:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get collection statistics
   */
  static async getCollectionStats(): Promise<ApiResponse<N8NCollectionStats>> {
    try {
      const allStories = await getDocs(collection(db, N8N_STORIES_COLLECTION));
      const pendingStories = await getDocs(
        query(collection(db, N8N_STORIES_COLLECTION), where('status', '==', 'pending'))
      );
      const sentStories = await getDocs(
        query(collection(db, N8N_STORIES_COLLECTION), where('status', '==', 'sent'))
      );
      const failedStories = await getDocs(
        query(collection(db, N8N_STORIES_COLLECTION), where('status', '==', 'failed'))
      );

      const stats: N8NCollectionStats = {
        totalStories: allStories.size,
        pendingStories: pendingStories.size,
        sentStories: sentStories.size,
        failedStories: failedStories.size
      };

      return {
        success: true,
        data: stats
      };
    } catch (error) {
      console.error('Error getting collection stats:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Create email campaign record
   */
  static async createEmailCampaign(campaign: Omit<EmailCampaign, 'id'>): Promise<ApiResponse<EmailCampaign>> {
    try {
      const campaignRef = collection(db, EMAIL_CAMPAIGNS_COLLECTION);
      const docRef = await addDoc(campaignRef, campaign);

      const newCampaign: EmailCampaign = {
        ...campaign,
        id: docRef.id
      };

      return {
        success: true,
        data: newCampaign,
        message: 'Email campaign created successfully'
      };
    } catch (error) {
      console.error('Error creating email campaign:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get email campaigns by story data ID
   */
  static async getEmailCampaignsByStoryId(storyDataId: string): Promise<ApiResponse<EmailCampaign[]>> {
    try {
      const q = query(
        collection(db, EMAIL_CAMPAIGNS_COLLECTION),
        where('storyDataId', '==', storyDataId),
        orderBy('sentAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const campaigns: EmailCampaign[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const campaign: EmailCampaign = {
          ...data,
          id: doc.id,
          sentAt: data.sentAt?.toDate()
        } as EmailCampaign;
        campaigns.push(campaign);
      });

      return {
        success: true,
        data: campaigns
      };
    } catch (error) {
      console.error('Error getting email campaigns:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}

// Export individual functions for easier importing
export const {
  createStoryData,
  createBatchStoryData,
  getStoryDataById,
  getAllStoryData,
  getStoryDataByStatus,
  updateStoryStatus,
  deleteStoryData,
  getCollectionStats,
  createEmailCampaign,
  getEmailCampaignsByStoryId
} = N8NDatabaseService;
