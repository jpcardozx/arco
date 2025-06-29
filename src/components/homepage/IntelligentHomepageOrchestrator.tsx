'use client'

import { useState, useEffect, useRef, createContext, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { trackEvent } from '@/lib/analytics'

// Import homepage components
import { CompetitiveIntelligenceHero } from './CompetitiveIntelligenceHero'
import { MarketIntelligenceInsights } from './MarketIntelligenceInsights'
import { MarketLeaderMethodology } from './MarketLeaderMethodology'
import { PersonalizedRoadmap } from './PersonalizedRoadmap'

/**
 * INTELLIGENT HOMEPAGE ORCHESTRATOR - Adaptive Experience Manager
 * 
 * Purpose:
 * - Coordinate the presentation and behavior of all homepage components
 * - Track user engagement and adapt the experience accordingly
 * - Optimize resource loading and performance
 * - Provide progressive disclosure of content based on user interest
 * - Enable personalized experiences for returning users
 */

// Define the orchestration context
interface OrchestrationContextType {
  userProfile: UserProfile
  updateUserProfile: (updates: Partial<UserProfile>) => void
  activeSection: string
  setActiveSection: (section: string) => void
  userInteractions: UserInteraction[]
  recordInteraction: (interaction: UserInteraction) => void
  sectionProgress: Record<string, SectionProgress>
  hasDismissedSection: (sectionId: string) => boolean
  dismissSection: (sectionId: string) => void
  isReturningUser: boolean
  visitCount: number
  getRecommendedAction: () => string
}

interface UserProfile {
  industry?: string
  companySize?: string
  technicalFocus?: string[] 
  visitCount: number
  lastVisit?: Date
  primaryInterests: string[]
  conversionStage: 'awareness' | 'consideration' | 'decision' | 'converted'
  preferredContentTypes: string[]
  dismissedSections: string[]
  completedSections: string[]
}

interface UserInteraction {
  timestamp: Date
  sectionId: string
  actionType: string
  details?: Record<string, any>
  durationMs?: number
}

interface SectionProgress {
  viewed: boolean
  percentComplete: number
  dismissed: boolean
  totalTimeMs: number
}

// Create the orchestration context
const OrchestrationContext = createContext<OrchestrationContextType | null>(null)

// Context provider component
interface OrchestrationProviderProps {
  children: React.ReactNode
  initialUserProfile?: Partial<UserProfile>
}

export function OrchestrationProvider({ children, initialUserProfile }: OrchestrationProviderProps) {
  // Initialize from localStorage for returning users
  const [initialized, setInitialized] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    visitCount: 0,
    primaryInterests: [],
    conversionStage: 'awareness',
    preferredContentTypes: [],
    dismissedSections: [],
    completedSections: []
  })
  
  const [activeSection, setActiveSection] = useState<string>('competitive_hero')
  const [userInteractions, setUserInteractions] = useState<UserInteraction[]>([])
  const [sectionProgress, setSectionProgress] = useState<Record<string, SectionProgress>>({
    competitive_hero: { viewed: false, percentComplete: 0, dismissed: false, totalTimeMs: 0 },
    market_intelligence: { viewed: false, percentComplete: 0, dismissed: false, totalTimeMs: 0 },
    market_methodology: { viewed: false, percentComplete: 0, dismissed: false, totalTimeMs: 0 },
    personalized_roadmap: { viewed: false, percentComplete: 0, dismissed: false, totalTimeMs: 0 }
  })
  
  // Load saved profile from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized) {
      try {
        // Retrieve saved data
        const savedProfile = localStorage.getItem('arco_user_profile')
        const savedInteractions = localStorage.getItem('arco_user_interactions')
        const savedProgress = localStorage.getItem('arco_section_progress')
        
        let parsedProfile: UserProfile | null = null
        
        if (savedProfile) {
          parsedProfile = JSON.parse(savedProfile)
          
          // Update visit count
          if (parsedProfile) {
            parsedProfile.visitCount += 1
            parsedProfile.lastVisit = new Date()
          }
          
          setUserProfile(prevProfile => ({
            ...prevProfile,
            ...parsedProfile,
            // Ensure merging with any initial profile passed as prop
            ...initialUserProfile
          }))
        } else {
          // First visit
          setUserProfile(prevProfile => ({
            ...prevProfile,
            visitCount: 1,
            lastVisit: new Date(),
            ...initialUserProfile
          }))
        }
        
        if (savedInteractions) {
          setUserInteractions(JSON.parse(savedInteractions))
        }
        
        if (savedProgress) {
          setSectionProgress(JSON.parse(savedProgress))
        }
        
        // Track pageview with returning user status
        trackEvent({
          event: 'pageview',
          category: 'engagement',
          action: 'view_homepage',
          label: parsedProfile ? 'returning_user' : 'new_user',
          custom_parameters: {
            visit_count: parsedProfile ? parsedProfile.visitCount : 1,
            conversion_stage: parsedProfile ? parsedProfile.conversionStage : 'awareness'
          }
        })
        
        setInitialized(true)
      } catch (error) {
        console.error('Error initializing user profile:', error)
        // Fall back to defaults with initial profile
        setUserProfile(prevProfile => ({
          ...prevProfile,
          visitCount: 1,
          lastVisit: new Date(),
          ...initialUserProfile
        }))
        setInitialized(true)
      }
    }
  }, [initialized, initialUserProfile])
  
  // Save profile and interactions to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && initialized) {
      localStorage.setItem('arco_user_profile', JSON.stringify(userProfile))
      localStorage.setItem('arco_user_interactions', JSON.stringify(userInteractions))
      localStorage.setItem('arco_section_progress', JSON.stringify(sectionProgress))
    }
  }, [userProfile, userInteractions, sectionProgress, initialized])
  
  // Function to update user profile
  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prevProfile => ({
      ...prevProfile,
      ...updates
    }))
    
    // Track significant profile updates
    if (updates.industry || updates.companySize || updates.conversionStage) {
      trackEvent({
        event: 'profile_update',
        category: 'engagement',
        action: 'update_profile',
        custom_parameters: {
          ...updates
        }
      })
    }
  }
  
  // Function to record user interactions
  const recordInteraction = (interaction: UserInteraction) => {
    setUserInteractions(prev => [...prev, interaction])
    
    // Update section progress based on interaction
    if (interaction.sectionId) {
      setSectionProgress(prev => {
        const section = prev[interaction.sectionId] || { 
          viewed: false, 
          percentComplete: 0, 
          dismissed: false,
          totalTimeMs: 0
        }
        
        let updatedSection = { ...section }
        
        // Update section progress based on interaction type
        switch (interaction.actionType) {
          case 'view':
            updatedSection.viewed = true
            break
            
          case 'complete':
            updatedSection.percentComplete = 100
            // Add to completed sections in user profile
            updateUserProfile({
              completedSections: [...userProfile.completedSections, interaction.sectionId]
            })
            break
            
          case 'progress':
            if (interaction.details?.percent) {
              updatedSection.percentComplete = interaction.details.percent
            }
            break
            
          case 'time_spent':
            if (interaction.durationMs) {
              updatedSection.totalTimeMs += interaction.durationMs
            }
            break
        }
        
        // Infer interests based on significant engagement
        if (
          interaction.actionType === 'complete' || 
          updatedSection.percentComplete > 70 ||
          updatedSection.totalTimeMs > 60000 // 1 minute
        ) {
          // Extract interest area from section ID
          let interest = 'general'
          
          switch (interaction.sectionId) {
            case 'competitive_hero':
              interest = 'competitive_intelligence'
              break
            case 'market_intelligence':
              interest = 'market_insights'
              break
            case 'market_methodology':
              interest = 'methodology_implementation'
              break
            case 'personalized_roadmap':
              interest = 'implementation_planning'
              break
          }
          
          // Add to primary interests if not already present
          if (!userProfile.primaryInterests.includes(interest)) {
            updateUserProfile({
              primaryInterests: [...userProfile.primaryInterests, interest]
            })
          }
        }
        
        return {
          ...prev,
          [interaction.sectionId]: updatedSection
        }
      })
    }
    
    // Update conversion stage based on interaction patterns
    const evaluateConversionStage = () => {
      // For simplicity, progression is based on section completion
      const completedCount = Object.values(sectionProgress).filter(s => s.percentComplete >= 90).length
      
      let newStage = userProfile.conversionStage
      
      if (completedCount >= 3 || userInteractions.some(i => i.actionType === 'cta_click' && i.details?.intent === 'high')) {
        newStage = 'decision'
      } else if (completedCount >= 1 || userInteractions.some(i => i.actionType === 'cta_click')) {
        newStage = 'consideration'
      }
      
      if (newStage !== userProfile.conversionStage) {
        updateUserProfile({ conversionStage: newStage })
      }
    }
    
    // Evaluate if this interaction should update conversion stage
    if (['complete', 'cta_click', 'form_submit'].includes(interaction.actionType)) {
      evaluateConversionStage()
    }
  }
  
  // Helpers for section dismissal
  const hasDismissedSection = (sectionId: string) => {
    return userProfile.dismissedSections.includes(sectionId)
  }
  
  const dismissSection = (sectionId: string) => {
    setSectionProgress(prev => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], dismissed: true }
    }))
    
    updateUserProfile({
      dismissedSections: [...userProfile.dismissedSections, sectionId]
    })
    
    trackEvent({
      event: 'section_dismiss',
      category: 'engagement',
      action: 'dismiss_section',
      label: sectionId
    })
  }
  
  // Helper to get recommended next action based on user profile
  const getRecommendedAction = () => {
    const { conversionStage, primaryInterests } = userProfile
    
    // Default recommendations by stage
    if (conversionStage === 'awareness') {
      return 'explore_domain_analysis'
    } else if (conversionStage === 'consideration') {
      return 'calculate_roi'
    } else if (conversionStage === 'decision') {
      return 'schedule_demo'
    }
    
    // Interest-based fallbacks
    if (primaryInterests.includes('financial_impact')) {
      return 'calculate_roi'
    } else if (primaryInterests.includes('domain_intelligence')) {
      return 'explore_domain_analysis'
    } else if (primaryInterests.includes('technical_debt')) {
      return 'explore_value_proposition'
    }
    
    return 'explore_domain_analysis' // Default fallback
  }
  
  const contextValue: OrchestrationContextType = {
    userProfile,
    updateUserProfile,
    activeSection,
    setActiveSection,
    userInteractions,
    recordInteraction,
    sectionProgress,
    hasDismissedSection,
    dismissSection,
    isReturningUser: userProfile.visitCount > 1,
    visitCount: userProfile.visitCount,
    getRecommendedAction
  }
  
  return (
    <OrchestrationContext.Provider value={contextValue}>
      {children}
    </OrchestrationContext.Provider>
  )
}

// Hook to use the orchestration context
export function useOrchestration() {
  const context = useContext(OrchestrationContext)
  if (!context) {
    throw new Error('useOrchestration must be used within an OrchestrationProvider')
  }
  return context
}

// Section visibility tracker component
interface SectionTrackerProps {
  sectionId: string
  children: React.ReactNode
  threshold?: number
}

export function SectionTracker({ sectionId, children, threshold = 0.3 }: SectionTrackerProps) {
  const { recordInteraction, setActiveSection } = useOrchestration()
  const [ref, inView] = useInView({ threshold })
  const viewTracked = useRef(false)
  const enteredViewAt = useRef<number | null>(null)
  
  useEffect(() => {
    if (inView) {
      setActiveSection(sectionId)
      
      if (!viewTracked.current) {
        recordInteraction({
          timestamp: new Date(),
          sectionId,
          actionType: 'view'
        })
        viewTracked.current = true
      }
      
      if (!enteredViewAt.current) {
        enteredViewAt.current = Date.now()
      }
    } else if (enteredViewAt.current) {
      // Track time spent when section leaves view
      const timeSpentMs = Date.now() - enteredViewAt.current
      recordInteraction({
        timestamp: new Date(),
        sectionId,
        actionType: 'time_spent',
        durationMs: timeSpentMs
      })
      enteredViewAt.current = null
    }
  }, [inView, recordInteraction, sectionId, setActiveSection])
  
  return <div ref={ref}>{children}</div>
}

// The main orchestrator component
export function IntelligentHomepageOrchestrator() {
  const [isLoading, setIsLoading] = useState(true)
  const orchestratorRef = useRef(null)
  
  // Track orchestrator load time
  useEffect(() => {
    const loadingStart = performance.now()
    
    return () => {
      const loadTime = performance.now() - loadingStart
      trackEvent({
        event: 'performance',
        category: 'technical',
        action: 'orchestrator_load_time',
        custom_parameters: {
          load_time_ms: Math.round(loadTime)
        }
      })
    }
  }, [])
  
  // Initial content preloading and error handling
  useEffect(() => {
    // Add proper error handling for all types of errors
    const handleChunkError = (error: any) => {
      console.error('Error detected:', error);
      
      // Handle specific error types
      if (error && error.message) {
        // Handle chunk loading errors
        if (error.message.includes('ChunkLoadError')) {
          console.log('Attempting to recover from chunk load error...');
          // Clear cache and reload without full page refresh
          if (typeof window !== 'undefined' && window.caches) {
            window.caches.keys().then(cacheNames => {
              return Promise.all(
                cacheNames.map(cacheName => {
                  return window.caches.delete(cacheName);
                })
              );
            }).then(() => {
              window.location.reload();
            }).catch(() => {
              setIsLoading(false);
            });
            return;
          }
        }
        
        // Handle React reference errors
        if (error.message.includes('React is not defined')) {
          console.log('Detected React reference error, attempting recovery...');
          setIsLoading(false);
          return;
        }
      }
      
      // Default error handling - just stop loading
      setIsLoading(false);
    };

    window.addEventListener('error', handleChunkError);
    window.addEventListener('unhandledrejection', handleChunkError);

    // Simulate content preloading with actual resource checks
    const preloadResources = async () => {
      try {
        // Simulate checking critical resources
        await new Promise(resolve => setTimeout(resolve, 300)); 
        setIsLoading(false);
      } catch (error) {
        console.error('Resource preloading failed:', error);
        // Fallback to direct rendering if preloading fails
        setIsLoading(false);
      }
    };

    preloadResources();
    
    return () => {
      window.removeEventListener('error', handleChunkError);
      window.removeEventListener('unhandledrejection', handleChunkError);
    };
  }, [])
  
  const renderLoadingState = () => (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col justify-start">
      {/* Skeleton for Navigation */}
      <div className="w-full bg-white border-b border-slate-200 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="h-8 w-32 bg-slate-200 rounded animate-pulse"></div>
          <div className="flex space-x-4">
            <div className="h-8 w-20 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-8 w-20 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-8 w-20 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Hero Section Skeleton */}
      <div className="w-full bg-gradient-to-br from-slate-900 to-slate-800 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="h-12 w-3/4 bg-slate-700 rounded animate-pulse mb-6"></div>
            <div className="h-8 w-5/6 bg-slate-700 rounded animate-pulse mb-4"></div>
            <div className="h-8 w-4/6 bg-slate-700 rounded animate-pulse mb-8"></div>
            
            <div className="flex space-x-4 mb-12">
              <div className="h-12 w-40 bg-emerald-700 rounded animate-pulse"></div>
              <div className="h-12 w-40 bg-slate-600 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Skeleton */}
      <div className="container mx-auto px-6 py-16">
        <div className="mb-16">
          <div className="h-10 w-64 bg-slate-300 rounded animate-pulse mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="h-8 w-32 bg-slate-200 rounded animate-pulse mb-4"></div>
                <div className="h-4 w-full bg-slate-100 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-5/6 bg-slate-100 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-4/6 bg-slate-100 rounded animate-pulse mb-6"></div>
                <div className="h-10 w-32 bg-slate-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center items-center mt-12">
          <div className="flex items-center space-x-3">
            <div className="relative w-6 h-6">
              <div className="absolute top-0 left-0 w-full h-full border-2 border-slate-300 border-t-emerald-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-600 font-medium">Loading personalized content...</p>
          </div>
        </div>
      </div>
    </div>
  )
  
  return (
    <OrchestrationProvider>
      <div ref={orchestratorRef}>
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderLoadingState()}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <HomepageContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </OrchestrationProvider>
  )
}

// The actual homepage content
function HomepageContent() {
  const { 
    userProfile, 
    activeSection,
    sectionProgress,
    isReturningUser,
    getRecommendedAction
  } = useOrchestration()
  
  // Personalization based on user profile
  const getPersonalizedWelcome = () => {
    if (!isReturningUser) return null
    
    let welcomeMessage = `Welcome back${userProfile.industry ? `, ${userProfile.industry} professional` : ''}!`
    let actionMessage = ''
    
    const recommendedAction = getRecommendedAction()
    
    switch (recommendedAction) {
      case 'explore_domain_analysis':
        actionMessage = 'Try analyzing your domain to see technical insights.'
        break
      case 'calculate_roi':
        actionMessage = 'Calculate your potential ROI from technical improvements.'
        break
      case 'schedule_demo':
        actionMessage = 'Ready for a personalized demo of our enterprise solution?'
        break
      case 'explore_value_proposition':
        actionMessage = 'Explore how we address critical technical debt patterns.'
        break
    }
    
    return (
      <motion.div 
        className="bg-slate-800 text-white py-3 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <span className="font-semibold">{welcomeMessage}</span>
            {actionMessage && (
              <span className="ml-2 text-slate-300">{actionMessage}</span>
            )}
          </div>
          <button className="text-sm underline text-slate-300 hover:text-white transition-colors">
            Personalize my experience
          </button>
        </div>
      </motion.div>
    )
  }
  
  // Progress indicator component
  const ProgressIndicator = () => {
    const sections = [
      { id: 'competitive_hero', label: 'Competitive Analysis' },
      { id: 'market_intelligence', label: 'Market Insights' },
      { id: 'market_methodology', label: 'Methodology' },
      { id: 'personalized_roadmap', label: 'Your Roadmap' }
    ]
    
    return (
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block">
        <div className="bg-white/80 backdrop-blur-sm rounded-full py-4 px-2 shadow-lg border border-slate-200">
          <div className="flex flex-col items-center space-y-4">
            {sections.map(section => (
              <div 
                key={section.id} 
                className={`relative flex flex-col items-center ${
                  activeSection === section.id ? 'scale-110 transition-transform' : ''
                }`}
              >
                <div 
                  className={`w-3 h-3 rounded-full ${
                    activeSection === section.id 
                      ? 'bg-emerald-600' 
                      : sectionProgress[section.id]?.viewed 
                        ? 'bg-slate-400' 
                        : 'bg-slate-200'
                  }`}
                />
                {activeSection === section.id && (
                  <div className="absolute -right-20 whitespace-nowrap">
                    <span className="text-xs font-medium bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                      {section.label}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <>
      {getPersonalizedWelcome()}
      <ProgressIndicator />
      
      <SectionTracker sectionId="competitive_hero">
        <CompetitiveIntelligenceHero />
      </SectionTracker>
      
      <SectionTracker sectionId="market_intelligence">
        <MarketIntelligenceInsights />
      </SectionTracker>
      
      <SectionTracker sectionId="market_methodology">
        <MarketLeaderMethodology />
      </SectionTracker>
      
      <SectionTracker sectionId="personalized_roadmap">
        <PersonalizedRoadmap />
      </SectionTracker>
    </>
  )
}

// Create the main homepage component that integrates with Next.js
export default function AdaptiveHomepage() {
  return <IntelligentHomepageOrchestrator />
}
