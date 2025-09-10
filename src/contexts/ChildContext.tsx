import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Child, ChildContextType } from '../types';
import { useAuth } from './AuthContext';

const ChildContext = createContext<ChildContextType | undefined>(undefined);

export const useChild = () => {
  const context = useContext(ChildContext);
  if (context === undefined) {
    throw new Error('useChild must be used within a ChildProvider');
  }
  return context;
};

interface ChildProviderProps {
  children: React.ReactNode;
}

export const ChildProvider: React.FC<ChildProviderProps> = ({ children: childElements }) => {
  const [currentChild, setCurrentChild] = useState<Child | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchChildren();
    } else {
      setChildren([]);
      setCurrentChild(null);
      setLoading(false);
    }
  }, [user]);

  const fetchChildren = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const childrenRef = collection(db, 'children');
      const q = query(childrenRef, where('parentId', '==', user.id));
      const querySnapshot = await getDocs(q);
      
      const childrenData: Child[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        childrenData.push({
          id: doc.id,
          parentId: data.parentId,
          name: data.name,
          username: data.username,
          pin: data.pin,
          avatar: data.avatar,
          createdAt: data.createdAt?.toDate() || new Date(),
          preferences: data.preferences || {
            readingLevel: 'beginner',
            interests: []
          }
        });
      });

      setChildren(childrenData);
    } catch (error) {
      console.error('Error fetching children:', error);
    } finally {
      setLoading(false);
    }
  };

  const getChildById = async (childId: string): Promise<Child | null> => {
    try {
      const childRef = doc(db, 'children', childId);
      const childSnap = await getDoc(childRef);
      
      if (childSnap.exists()) {
        const data = childSnap.data();
        return {
          id: childSnap.id,
          parentId: data.parentId,
          name: data.name,
          username: data.username,
          pin: data.pin,
          avatar: data.avatar,
          createdAt: data.createdAt?.toDate() || new Date(),
          preferences: data.preferences || {
            readingLevel: 'beginner',
            interests: []
          }
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching child:', error);
      return null;
    }
  };

  const value: ChildContextType = {
    currentChild,
    setCurrentChild,
    children,
    loading,
    getChildById
  };

  return (
    <ChildContext.Provider value={value}>
      {childElements}
    </ChildContext.Provider>
  );
};
