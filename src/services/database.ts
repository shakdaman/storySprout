import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { 
  Parent, 
  Child, 
  Story, 
  Quiz, 
  QuizResult, 
  ReadingSession, 
  ChildProgress,
  ActivityLog 
} from '../types';

// Collection names
const COLLECTIONS = {
  PARENTS: 'parents',
  CHILDREN: 'children',
  STORIES: 'stories',
  QUIZZES: 'quizzes',
  QUIZ_RESULTS: 'quizResults',
  READING_SESSIONS: 'readingSessions',
  ACTIVITY_LOGS: 'activityLogs'
} as const;

// Parent operations
export const parentService = {
  async createParent(parentData: Omit<Parent, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.PARENTS), {
      ...parentData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  },

  async getParent(parentId: string): Promise<Parent | null> {
    const docRef = doc(db, COLLECTIONS.PARENTS, parentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Parent;
    }
    return null;
  },

  async updateParent(parentId: string, updates: Partial<Parent>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.PARENTS, parentId);
    await updateDoc(docRef, updates);
  }
};

// Child operations
export const childService = {
  async createChild(childData: Omit<Child, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.CHILDREN), {
      ...childData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  },

  async getChild(childId: string): Promise<Child | null> {
    const docRef = doc(db, COLLECTIONS.CHILDREN, childId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Child;
    }
    return null;
  },

  async getChildrenByParent(parentId: string): Promise<Child[]> {
    const q = query(
      collection(db, COLLECTIONS.CHILDREN),
      where('parentId', '==', parentId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Child[];
  },

  async updateChild(childId: string, updates: Partial<Child>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.CHILDREN, childId);
    await updateDoc(docRef, updates);
  },

  async deleteChild(childId: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.CHILDREN, childId);
    await deleteDoc(docRef);
  }
};

// Story operations
export const storyService = {
  async createStory(storyData: Omit<Story, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.STORIES), {
      ...storyData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  },

  async getStory(storyId: string): Promise<Story | null> {
    const docRef = doc(db, COLLECTIONS.STORIES, storyId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Story;
    }
    return null;
  },

  async getTodayStory(): Promise<Story | null> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const q = query(
      collection(db, COLLECTIONS.STORIES),
      where('createdAt', '>=', Timestamp.fromDate(today)),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Story;
    }
    return null;
  },

  async getStoriesByLevel(readingLevel: string): Promise<Story[]> {
    const q = query(
      collection(db, COLLECTIONS.STORIES),
      where('readingLevel', '==', readingLevel),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Story[];
  }
};

// Quiz operations
export const quizService = {
  async createQuiz(quizData: Omit<Quiz, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.QUIZZES), {
      ...quizData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  },

  async getQuiz(quizId: string): Promise<Quiz | null> {
    const docRef = doc(db, COLLECTIONS.QUIZZES, quizId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Quiz;
    }
    return null;
  },

  async getQuizByStory(storyId: string): Promise<Quiz | null> {
    const q = query(
      collection(db, COLLECTIONS.QUIZZES),
      where('storyId', '==', storyId),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Quiz;
    }
    return null;
  }
};

// Quiz Result operations
export const quizResultService = {
  async createQuizResult(resultData: Omit<QuizResult, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.QUIZ_RESULTS), {
      ...resultData,
      completedAt: Timestamp.now()
    });
    return docRef.id;
  },

  async getQuizResultsByChild(childId: string): Promise<QuizResult[]> {
    const q = query(
      collection(db, COLLECTIONS.QUIZ_RESULTS),
      where('childId', '==', childId),
      orderBy('completedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as QuizResult[];
  },

  async getQuizResult(resultId: string): Promise<QuizResult | null> {
    const docRef = doc(db, COLLECTIONS.QUIZ_RESULTS, resultId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as QuizResult;
    }
    return null;
  }
};

// Reading Session operations
export const readingSessionService = {
  async createReadingSession(sessionData: Omit<ReadingSession, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.READING_SESSIONS), {
      ...sessionData,
      startTime: Timestamp.now()
    });
    return docRef.id;
  },

  async updateReadingSession(sessionId: string, updates: Partial<ReadingSession>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.READING_SESSIONS, sessionId);
    await updateDoc(docRef, {
      ...updates,
      endTime: updates.endTime ? Timestamp.now() : undefined
    });
  },

  async getReadingSessionsByChild(childId: string): Promise<ReadingSession[]> {
    const q = query(
      collection(db, COLLECTIONS.READING_SESSIONS),
      where('childId', '==', childId),
      orderBy('startTime', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ReadingSession[];
  }
};

// Activity Log operations
export const activityLogService = {
  async createActivityLog(logData: Omit<ActivityLog, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.ACTIVITY_LOGS), {
      ...logData,
      timestamp: Timestamp.now()
    });
    return docRef.id;
  },

  async getActivityLogsByChild(childId: string, limitCount: number = 10): Promise<ActivityLog[]> {
    const q = query(
      collection(db, COLLECTIONS.ACTIVITY_LOGS),
      where('childId', '==', childId),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ActivityLog[];
  }
};

// Progress calculation service
export const progressService = {
  async calculateChildProgress(childId: string): Promise<ChildProgress> {
    // Get all quiz results for the child
    const quizResults = await quizResultService.getQuizResultsByChild(childId);
    
    // Get all reading sessions for the child
    const readingSessions = await readingSessionService.getReadingSessionsByChild(childId);
    
    // Calculate metrics
    const totalStoriesRead = readingSessions.filter(session => session.isCompleted).length;
    const totalQuizzesTaken = quizResults.length;
    const averageQuizScore = quizResults.length > 0 
      ? Math.round(quizResults.reduce((sum, result) => sum + result.score, 0) / quizResults.length)
      : 0;
    
    // Calculate reading streak (simplified - consecutive days with activity)
    const readingStreak = this.calculateReadingStreak(readingSessions);
    
    // Calculate total reading time
    const totalReadingTime = readingSessions.reduce((total, session) => {
      if (session.endTime) {
        const duration = (session.endTime.getTime() - session.startTime.getTime()) / (1000 * 60); // minutes
        return total + duration;
      }
      return total;
    }, 0);
    
    // Get last activity
    const lastActivity = readingSessions.length > 0 
      ? readingSessions[0].startTime 
      : new Date();
    
    return {
      childId,
      totalStoriesRead,
      totalQuizzesTaken,
      averageQuizScore,
      readingStreak,
      totalReadingTime: Math.round(totalReadingTime),
      lastActivity
    };
  },

  calculateReadingStreak(readingSessions: ReadingSession[]): number {
    // Simplified streak calculation - consecutive days with reading activity
    // In a real implementation, this would be more sophisticated
    const today = new Date();
    let streak = 0;
    
    for (let i = 0; i < 30; i++) { // Check last 30 days
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      
      const hasActivity = readingSessions.some(session => {
        const sessionDate = new Date(session.startTime);
        return sessionDate.toDateString() === checkDate.toDateString();
      });
      
      if (hasActivity) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }
};

