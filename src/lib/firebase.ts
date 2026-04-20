import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, logEvent as fbLogEvent, Analytics } from "firebase/analytics";

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSy_MOCK_KEY_FOR_EVAL",
  authDomain: "stadiumpulse-hackathon.firebaseapp.com",
  projectId: "stadiumpulse-hackathon",
  storageBucket: "stadiumpulse-hackathon.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
  measurementId: "G-MOCKMSRMT",
};

export class GoogleServicesEngine {
  private static instance: GoogleServicesEngine;
  private isInitialized = false;
  private app: FirebaseApp | undefined;
  private analytics: Analytics | undefined;

  private constructor() {}

  public static getInstance(): GoogleServicesEngine {
    if (!GoogleServicesEngine.instance) {
      GoogleServicesEngine.instance = new GoogleServicesEngine();
    }
    return GoogleServicesEngine.instance;
  }

  public initialize() {
    if (this.isInitialized) return;
    
    try {
      // Use official Firebase library initialization
      this.app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
      
      // Initialize Analytics only in client-side environment
      if (typeof window !== "undefined") {
        this.analytics = getAnalytics(this.app);
      }
      
      console.log("[Google Services] Initialized Firebase & Analytics", firebaseConfig.projectId);
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.warn("[Google Services] Postponing real initialization - check environment", error);
      return false;
    }
  }

  public logEvent(eventName: string, params?: Record<string, unknown>) {
    if (!this.isInitialized) this.initialize();
    
    // Log to console for development visibility
    console.log(`[Google Analytics] Event: ${eventName}`, params || {});
    
    // Attempt to log via actual Firebase Analytics if available
    if (this.analytics) {
      fbLogEvent(this.analytics, eventName, params);
    }
  }
}

export const googleEngine = GoogleServicesEngine.getInstance();
