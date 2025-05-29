"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Clock,
  BookOpen,
  CheckCircle,
  Award,
  FileText,
  Video,
  Headphones,
  Download,
  Star,
  Users,
  Calendar,
  Layers,
} from "lucide-react"

// Comprehensive content data for all courses across all user views
const contentData = {
  // Setter View Content
  "1": {
    id: "1",
    title: "Prospecting Masterclass: Finding High-Value Leads",
    description:
      "Learn advanced techniques for identifying and connecting with high-value prospects. This comprehensive course covers modern prospecting strategies, tools, and methodologies.",
    type: "Course",
    duration: "4 hours",
    lessons: 8,
    author: {
      name: "Marcus Williams",
      avatar: "/placeholder-icon.png",
      bio: "Senior Sales Director with 15+ years of experience",
    },
    image: "/business-meeting-laptop.png",
    rating: 4.8,
    enrollments: 1247,
    lastUpdated: "May 15, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Introduction to Modern Prospecting", type: "video", duration: "15 min", completed: false },
      { id: 2, title: "Identifying Your Ideal Customer Profile", type: "video", duration: "25 min", completed: false },
      { id: 3, title: "Research Techniques and Tools", type: "interactive", duration: "30 min", completed: false },
      { id: 4, title: "Crafting Compelling Outreach Messages", type: "document", duration: "20 min", completed: false },
      { id: 5, title: "Multi-Channel Prospecting Strategy", type: "video", duration: "35 min", completed: false },
      { id: 6, title: "Tracking and Measuring Success", type: "interactive", duration: "25 min", completed: false },
      { id: 7, title: "Advanced Prospecting Techniques", type: "video", duration: "40 min", completed: false },
      { id: 8, title: "Final Assessment", type: "quiz", duration: "30 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the most important factor when defining an Ideal Customer Profile?",
          options: ["Company size", "Industry vertical", "Pain points and needs alignment", "Geographic location"],
          correct: 2,
          explanation:
            "Pain points and needs alignment is crucial because it ensures your solution directly addresses the prospect's challenges.",
        },
        {
          id: 2,
          question: "Which research tool is best for finding contact information?",
          options: ["LinkedIn Sales Navigator", "ZoomInfo", "Apollo", "All of the above"],
          correct: 3,
          explanation: "All these tools are valuable for different aspects of research and contact finding.",
        },
        {
          id: 3,
          question: "What's the recommended follow-up sequence length for cold outreach?",
          options: ["3-4 touchpoints", "5-7 touchpoints", "8-12 touchpoints", "15+ touchpoints"],
          correct: 2,
          explanation:
            "8-12 touchpoints across multiple channels typically yields the best results without being overly aggressive.",
        },
      ],
      passingScore: 80,
    },
  },
  "2": {
    id: "2",
    title: "Cold Outreach Templates That Convert",
    description: "Proven templates and frameworks for effective cold outreach",
    type: "Workshop",
    duration: "2 hours",
    lessons: 5,
    author: {
      name: "Jennifer Adams",
      avatar: "/placeholder-icon.png",
      bio: "Email Marketing Expert with 10+ years experience",
    },
    image: "/person-typing-email.png",
    rating: 4.6,
    enrollments: 892,
    lastUpdated: "May 10, 2024",
    hasCertification: false,
    modules: [
      { id: 1, title: "Email Template Fundamentals", type: "video", duration: "20 min", completed: false },
      { id: 2, title: "Subject Line Strategies", type: "interactive", duration: "25 min", completed: false },
      { id: 3, title: "Personalization Techniques", type: "document", duration: "15 min", completed: false },
      { id: 4, title: "Follow-up Sequences", type: "video", duration: "30 min", completed: false },
      { id: 5, title: "A/B Testing Your Templates", type: "interactive", duration: "30 min", completed: false },
    ],
  },
  "3": {
    id: "3",
    title: "Setter Certification Program",
    description: "Complete your certification as a qualified setter",
    type: "Certification",
    duration: "8 hours",
    lessons: 12,
    author: { name: "David Brown", avatar: "/placeholder-icon.png", bio: "Sales Training Director" },
    image: "/professional-certification-badge.png",
    rating: 4.9,
    enrollments: 567,
    lastUpdated: "May 20, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Setter Role Overview", type: "video", duration: "30 min", completed: false },
      { id: 2, title: "Lead Qualification Basics", type: "video", duration: "45 min", completed: false },
      { id: 3, title: "Discovery Questions Framework", type: "interactive", duration: "40 min", completed: false },
      { id: 4, title: "Objection Handling for Setters", type: "video", duration: "35 min", completed: false },
      { id: 5, title: "Appointment Setting Best Practices", type: "document", duration: "25 min", completed: false },
      { id: 6, title: "CRM Management", type: "interactive", duration: "30 min", completed: false },
      { id: 7, title: "Communication Skills", type: "video", duration: "40 min", completed: false },
      { id: 8, title: "Time Management", type: "interactive", duration: "35 min", completed: false },
      { id: 9, title: "Performance Metrics", type: "document", duration: "20 min", completed: false },
      { id: 10, title: "Advanced Techniques", type: "video", duration: "45 min", completed: false },
      { id: 11, title: "Practice Scenarios", type: "interactive", duration: "50 min", completed: false },
      { id: 12, title: "Certification Exam", type: "quiz", duration: "60 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the primary goal of a setter?",
          options: [
            "Close deals",
            "Generate leads",
            "Qualify prospects and set appointments",
            "Handle customer service",
          ],
          correct: 2,
          explanation: "The primary role of a setter is to qualify prospects and schedule appointments for closers.",
        },
        {
          id: 2,
          question: "Which qualification framework is most commonly used?",
          options: ["BANT", "MEDDIC", "SPIN", "NEAT"],
          correct: 0,
          explanation: "BANT (Budget, Authority, Need, Timeline) is the most widely used qualification framework.",
        },
        {
          id: 3,
          question: "How should you handle initial objections?",
          options: [
            "Argue with the prospect",
            "Acknowledge and ask questions",
            "Hang up immediately",
            "Transfer to a closer",
          ],
          correct: 1,
          explanation: "Acknowledging objections and asking clarifying questions helps understand the real concern.",
        },
        {
          id: 4,
          question: "What's the ideal length for a discovery call?",
          options: ["5-10 minutes", "15-20 minutes", "30-45 minutes", "60+ minutes"],
          correct: 1,
          explanation: "15-20 minutes is typically sufficient to qualify a prospect and set an appointment.",
        },
        {
          id: 5,
          question: "When should you schedule follow-up calls?",
          options: ["Never", "Only if they ask", "Always, with specific times", "Only for hot leads"],
          correct: 2,
          explanation: "Always schedule specific follow-up times to maintain momentum and show professionalism.",
        },
      ],
      passingScore: 80,
    },
  },
  "4": {
    id: "4",
    title: "The Art of Qualifying Leads",
    description: "Learn how to qualify leads effectively to maximize conversion rates",
    type: "Course",
    duration: "3 hours",
    lessons: 6,
    author: { name: "Robert Chen", avatar: "/placeholder-icon.png", bio: "Lead Generation Specialist" },
    image: "/sales-qualification-framework.png",
    rating: 4.7,
    enrollments: 1156,
    lastUpdated: "May 8, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Understanding Lead Quality", type: "video", duration: "25 min", completed: false },
      { id: 2, title: "BANT Framework Deep Dive", type: "interactive", duration: "35 min", completed: false },
      { id: 3, title: "Qualifying Questions Library", type: "document", duration: "20 min", completed: false },
      { id: 4, title: "Reading Buying Signals", type: "video", duration: "30 min", completed: false },
      { id: 5, title: "Disqualification Strategies", type: "interactive", duration: "25 min", completed: false },
      { id: 6, title: "Qualification Assessment", type: "quiz", duration: "25 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What does BANT stand for?",
          options: [
            "Budget, Authority, Need, Timeline",
            "Business, Analysis, Negotiation, Terms",
            "Buyer, Approach, Network, Trust",
            "Brand, Awareness, Nurture, Target",
          ],
          correct: 0,
          explanation: "BANT stands for Budget, Authority, Need, and Timeline - the four key qualification criteria.",
        },
        {
          id: 2,
          question: "When should you disqualify a lead?",
          options: [
            "Never",
            "After first objection",
            "When they don't meet qualification criteria",
            "Only if they're rude",
          ],
          correct: 2,
          explanation:
            "Disqualifying leads that don't meet your criteria saves time and resources for better prospects.",
        },
        {
          id: 3,
          question: "What's the best way to uncover budget?",
          options: [
            "Ask directly about money",
            "Use ranges and comparisons",
            "Assume they have budget",
            "Wait for them to mention it",
          ],
          correct: 1,
          explanation: "Using ranges and comparisons makes budget discussions more comfortable and effective.",
        },
      ],
      passingScore: 80,
    },
  },
  "5": {
    id: "5",
    title: "Objection Handling Fundamentals",
    description: "Learn how to handle common objections in the sales process",
    type: "Course",
    duration: "2 hours",
    lessons: 6,
    author: { name: "Lauren Ober", avatar: "/placeholder-icon.png", bio: "Sales Objection Expert" },
    image: "/objection-handling-masterclass.png",
    rating: 4.8,
    enrollments: 934,
    lastUpdated: "May 12, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Understanding Objections", type: "video", duration: "20 min", completed: false },
      { id: 2, title: "The HEARD Method", type: "interactive", duration: "25 min", completed: false },
      { id: 3, title: "Common Objections & Responses", type: "document", duration: "15 min", completed: false },
      { id: 4, title: "Price Objections", type: "video", duration: "25 min", completed: false },
      { id: 5, title: "Timing Objections", type: "interactive", duration: "20 min", completed: false },
      { id: 6, title: "Objection Handling Quiz", type: "quiz", duration: "15 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What does HEARD stand for?",
          options: [
            "Halt, Empathize, Ask, Respond, Deliver",
            "Handle, Evaluate, Answer, Resolve, Decide",
            "Help, Engage, Analyze, React, Determine",
            "Hold, Examine, Assess, Reply, Direct",
          ],
          correct: 0,
          explanation:
            "HEARD is a framework: Halt, Empathize, Ask, Respond, Deliver for handling objections effectively.",
        },
        {
          id: 2,
          question: "When a prospect says 'It's too expensive', what should you do first?",
          options: ["Lower the price", "Ask what they mean by expensive", "End the call", "Show more features"],
          correct: 1,
          explanation: "Understanding what 'expensive' means helps you address the real concern behind the objection.",
        },
      ],
      passingScore: 80,
    },
  },
  "6": {
    id: "6",
    title: "The Sales Development Podcast",
    description: "Weekly insights on prospecting, qualifying, and setting appointments",
    type: "Podcast",
    duration: "45 min",
    lessons: 1,
    author: { name: "Michael Smith", avatar: "/placeholder-icon.png", bio: "Sales Development Expert & Podcast Host" },
    image: "/placeholder-l39eg.png",
    rating: 4.5,
    enrollments: 2341,
    lastUpdated: "May 22, 2024",
    hasCertification: false,
    modules: [
      { id: 1, title: "Episode 47: Advanced Prospecting in 2024", type: "audio", duration: "45 min", completed: false },
    ],
  },

  // Closer View Content
  "16": {
    id: "16",
    title: "Advanced Negotiation Tactics",
    description: "Master the art of negotiation to close more deals",
    type: "Course",
    duration: "6 hours",
    lessons: 12,
    author: {
      name: "David Miller",
      avatar: "/placeholder-icon.png",
      bio: "Negotiation Expert with 20+ years experience",
    },
    image: "/placeholder.svg?height=400&width=600&query=business negotiation meeting",
    rating: 4.9,
    enrollments: 876,
    lastUpdated: "May 18, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Negotiation Fundamentals", type: "video", duration: "30 min", completed: false },
      { id: 2, title: "Preparation Strategies", type: "interactive", duration: "35 min", completed: false },
      { id: 3, title: "Opening Moves", type: "video", duration: "25 min", completed: false },
      { id: 4, title: "Concession Strategies", type: "interactive", duration: "40 min", completed: false },
      { id: 5, title: "Handling Difficult Negotiators", type: "video", duration: "35 min", completed: false },
      { id: 6, title: "Win-Win Solutions", type: "document", duration: "20 min", completed: false },
      { id: 7, title: "Closing the Negotiation", type: "video", duration: "30 min", completed: false },
      { id: 8, title: "Post-Negotiation Follow-up", type: "interactive", duration: "25 min", completed: false },
      { id: 9, title: "Cultural Considerations", type: "document", duration: "15 min", completed: false },
      { id: 10, title: "Advanced Techniques", type: "video", duration: "40 min", completed: false },
      { id: 11, title: "Practice Scenarios", type: "interactive", duration: "45 min", completed: false },
      { id: 12, title: "Negotiation Mastery Exam", type: "quiz", duration: "40 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the most important phase of negotiation?",
          options: ["Opening", "Preparation", "Closing", "Follow-up"],
          correct: 1,
          explanation: "Preparation is crucial as it sets the foundation for successful negotiation outcomes.",
        },
        {
          id: 2,
          question: "When should you make your first concession?",
          options: ["Immediately", "Never", "After receiving something in return", "At the end"],
          correct: 2,
          explanation: "Concessions should be reciprocal - always get something in return for what you give up.",
        },
        {
          id: 3,
          question: "What's the best approach to difficult negotiators?",
          options: [
            "Match their aggression",
            "Stay calm and professional",
            "Walk away immediately",
            "Give in to their demands",
          ],
          correct: 1,
          explanation:
            "Maintaining professionalism and composure often leads to better outcomes than escalating conflict.",
        },
        {
          id: 4,
          question: "How should you handle deadlocks?",
          options: [
            "Insist on your position",
            "Take a break and reframe",
            "Make major concessions",
            "End the negotiation",
          ],
          correct: 1,
          explanation: "Taking breaks and reframing the discussion can help find new solutions to overcome deadlocks.",
        },
      ],
      passingScore: 80,
    },
  },
  "17": {
    id: "17",
    title: "Objection Handling Masterclass",
    description: "Turn objections into opportunities with these proven techniques",
    type: "Workshop",
    duration: "4 hours",
    lessons: 8,
    author: { name: "Sarah Johnson", avatar: "/placeholder-icon.png", bio: "Sales Training Expert" },
    image: "/objection-handling-masterclass.png",
    rating: 4.8,
    enrollments: 1234,
    lastUpdated: "May 16, 2024",
    hasCertification: false,
    modules: [
      { id: 1, title: "Psychology of Objections", type: "video", duration: "30 min", completed: false },
      { id: 2, title: "The HEARD Framework", type: "interactive", duration: "35 min", completed: false },
      { id: 3, title: "Price Objections Mastery", type: "video", duration: "40 min", completed: false },
      { id: 4, title: "Authority Objections", type: "interactive", duration: "25 min", completed: false },
      { id: 5, title: "Timing Objections", type: "video", duration: "30 min", completed: false },
      { id: 6, title: "Competition Objections", type: "interactive", duration: "35 min", completed: false },
      { id: 7, title: "Trust Objections", type: "video", duration: "25 min", completed: false },
      { id: 8, title: "Role-Play Practice", type: "interactive", duration: "40 min", completed: false },
    ],
  },
  "18": {
    id: "18",
    title: "Closer Certification Program",
    description: "Complete your certification as a qualified closer",
    type: "Certification",
    duration: "10 hours",
    lessons: 15,
    author: { name: "Thomas Weber", avatar: "/placeholder-icon.png", bio: "Senior Sales Director" },
    image: "/professional-certification-badge.png",
    rating: 4.9,
    enrollments: 456,
    lastUpdated: "May 25, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Closer Mindset", type: "video", duration: "30 min", completed: false },
      { id: 2, title: "Sales Process Mastery", type: "interactive", duration: "45 min", completed: false },
      { id: 3, title: "Discovery Deep Dive", type: "video", duration: "40 min", completed: false },
      { id: 4, title: "Presentation Skills", type: "interactive", duration: "50 min", completed: false },
      { id: 5, title: "Handling Objections", type: "video", duration: "35 min", completed: false },
      { id: 6, title: "Closing Techniques", type: "interactive", duration: "45 min", completed: false },
      { id: 7, title: "Negotiation Skills", type: "video", duration: "40 min", completed: false },
      { id: 8, title: "Contract Management", type: "document", duration: "25 min", completed: false },
      { id: 9, title: "Customer Success Handoff", type: "interactive", duration: "30 min", completed: false },
      { id: 10, title: "Pipeline Management", type: "video", duration: "35 min", completed: false },
      { id: 11, title: "Performance Metrics", type: "document", duration: "20 min", completed: false },
      { id: 12, title: "Advanced Strategies", type: "video", duration: "45 min", completed: false },
      { id: 13, title: "Industry Specialization", type: "interactive", duration: "40 min", completed: false },
      { id: 14, title: "Practice Scenarios", type: "interactive", duration: "60 min", completed: false },
      { id: 15, title: "Certification Exam", type: "quiz", duration: "90 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the most important skill for a closer?",
          options: ["Product knowledge", "Listening", "Talking", "Pricing"],
          correct: 1,
          explanation: "Listening is crucial for understanding customer needs and tailoring your approach accordingly.",
        },
        {
          id: 2,
          question: "When should you present pricing?",
          options: ["Immediately", "After building value", "Never", "Only when asked"],
          correct: 1,
          explanation:
            "Presenting pricing after establishing value helps justify the investment and reduces price objections.",
        },
        {
          id: 3,
          question: "How do you handle a prospect who won't make a decision?",
          options: ["Pressure them", "Create urgency", "Walk away", "Lower the price"],
          correct: 1,
          explanation: "Creating legitimate urgency helps prospects overcome indecision and move forward.",
        },
        {
          id: 4,
          question: "What's the best way to handle competition?",
          options: ["Criticize competitors", "Ignore them", "Differentiate your value", "Match their price"],
          correct: 2,
          explanation: "Focus on your unique value proposition rather than attacking competitors.",
        },
        {
          id: 5,
          question: "When should you ask for the sale?",
          options: ["Once per call", "Multiple times", "Never directly", "Only at the end"],
          correct: 1,
          explanation: "Multiple closing attempts throughout the conversation increase your chances of success.",
        },
      ],
      passingScore: 80,
    },
  },

  // Additional content for all views...
  "7": {
    id: "7",
    title: "Social Selling on LinkedIn",
    description: "Leverage LinkedIn to find and connect with high-value prospects",
    type: "Course",
    duration: "3 hours",
    lessons: 7,
    author: { name: "Sarah Miller", avatar: "/placeholder-icon.png", bio: "LinkedIn Sales Expert" },
    image: "/placeholder-olzys.png",
    rating: 4.6,
    enrollments: 1567,
    lastUpdated: "May 14, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "LinkedIn Profile Optimization", type: "video", duration: "25 min", completed: false },
      { id: 2, title: "Advanced Search Techniques", type: "interactive", duration: "30 min", completed: false },
      { id: 3, title: "Connection Strategies", type: "video", duration: "20 min", completed: false },
      { id: 4, title: "Content Marketing for Sales", type: "interactive", duration: "35 min", completed: false },
      { id: 5, title: "InMail Best Practices", type: "document", duration: "15 min", completed: false },
      { id: 6, title: "Building Relationships", type: "video", duration: "30 min", completed: false },
      { id: 7, title: "LinkedIn Sales Assessment", type: "quiz", duration: "25 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What's the most important element of a LinkedIn profile for sales?",
          options: ["Profile photo", "Headline", "Summary", "Experience"],
          correct: 1,
          explanation:
            "Your headline is the first thing prospects see and should clearly communicate your value proposition.",
        },
        {
          id: 2,
          question: "How many connection requests should you send per day?",
          options: ["As many as possible", "10-15", "50-100", "5-10"],
          correct: 1,
          explanation:
            "10-15 personalized connection requests per day is optimal for avoiding LinkedIn restrictions while maintaining quality.",
        },
      ],
      passingScore: 80,
    },
  },
  "8": {
    id: "8",
    title: "The Perfect Discovery Call",
    description: "Master the art of discovery calls to uncover customer needs",
    type: "Workshop",
    duration: "2 hours",
    lessons: 5,
    author: { name: "Jennifer Lee", avatar: "/placeholder-icon.png", bio: "Discovery Call Specialist" },
    image: "/business-video-call.png",
    rating: 4.7,
    enrollments: 789,
    lastUpdated: "May 11, 2024",
    hasCertification: false,
    modules: [
      { id: 1, title: "Discovery Call Structure", type: "video", duration: "25 min", completed: false },
      { id: 2, title: "Powerful Questions Framework", type: "interactive", duration: "30 min", completed: false },
      { id: 3, title: "Active Listening Techniques", type: "video", duration: "20 min", completed: false },
      { id: 4, title: "Uncovering Pain Points", type: "interactive", duration: "25 min", completed: false },
      { id: 5, title: "Next Steps & Follow-up", type: "document", duration: "20 min", completed: false },
    ],
  },
  "9": {
    id: "9",
    title: "Email Outreach Optimization",
    description: "Improve your email open and response rates with these proven techniques",
    type: "Course",
    duration: "3 hours",
    lessons: 8,
    author: { name: "David Wilson", avatar: "/placeholder-icon.png", bio: "Email Marketing Expert" },
    image: "/email-marketing-dashboard.png",
    rating: 4.5,
    enrollments: 1123,
    lastUpdated: "May 9, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Email Fundamentals", type: "video", duration: "20 min", completed: false },
      { id: 2, title: "Subject Line Mastery", type: "interactive", duration: "25 min", completed: false },
      { id: 3, title: "Email Structure & Flow", type: "video", duration: "30 min", completed: false },
      { id: 4, title: "Personalization at Scale", type: "interactive", duration: "35 min", completed: false },
      { id: 5, title: "A/B Testing Strategies", type: "document", duration: "20 min", completed: false },
      { id: 6, title: "Follow-up Sequences", type: "video", duration: "25 min", completed: false },
      { id: 7, title: "Analytics & Optimization", type: "interactive", duration: "20 min", completed: false },
      { id: 8, title: "Email Mastery Quiz", type: "quiz", duration: "25 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What's the ideal length for a cold email?",
          options: ["1-2 sentences", "50-125 words", "200+ words", "As long as needed"],
          correct: 1,
          explanation:
            "50-125 words is optimal for cold emails - long enough to provide value but short enough to maintain attention.",
        },
        {
          id: 2,
          question: "When is the best time to send cold emails?",
          options: ["Monday morning", "Tuesday-Thursday 10am-2pm", "Friday afternoon", "Weekends"],
          correct: 1,
          explanation: "Tuesday through Thursday between 10am-2pm typically see the highest open and response rates.",
        },
      ],
      passingScore: 80,
    },
  },

  // Manager View Content
  "19": {
    id: "19",
    title: "Sales Team Leadership",
    description: "Learn how to lead and manage high-performing sales teams",
    type: "Course",
    duration: "6 hours",
    lessons: 10,
    author: {
      name: "Michael Thompson",
      avatar: "/placeholder-icon.png",
      bio: "VP of Sales with 15+ years of leadership experience",
    },
    image: "/placeholder.svg?height=400&width=600&query=sales team meeting",
    rating: 4.8,
    enrollments: 345,
    lastUpdated: "May 20, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Leadership Fundamentals", type: "video", duration: "35 min", completed: false },
      { id: 2, title: "Team Building Strategies", type: "interactive", duration: "40 min", completed: false },
      { id: 3, title: "Performance Management", type: "video", duration: "45 min", completed: false },
      { id: 4, title: "Coaching Techniques", type: "interactive", duration: "50 min", completed: false },
      { id: 5, title: "Motivation & Incentives", type: "video", duration: "30 min", completed: false },
      { id: 6, title: "Conflict Resolution", type: "interactive", duration: "35 min", completed: false },
      { id: 7, title: "Sales Process Optimization", type: "document", duration: "25 min", completed: false },
      { id: 8, title: "Data-Driven Decisions", type: "video", duration: "40 min", completed: false },
      { id: 9, title: "Change Management", type: "interactive", duration: "30 min", completed: false },
      { id: 10, title: "Leadership Assessment", type: "quiz", duration: "40 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What's the most important quality of a sales leader?",
          options: ["Technical skills", "Emotional intelligence", "Product knowledge", "Closing ability"],
          correct: 1,
          explanation:
            "Emotional intelligence is crucial for understanding, motivating, and developing team members effectively.",
        },
        {
          id: 2,
          question: "How often should you conduct one-on-ones with team members?",
          options: ["Monthly", "Weekly", "Quarterly", "As needed"],
          correct: 1,
          explanation:
            "Weekly one-on-ones provide consistent coaching opportunities and help address issues before they become problems.",
        },
        {
          id: 3,
          question: "What's the best way to handle underperformance?",
          options: ["Immediate termination", "Ignore it", "Create improvement plan", "Public criticism"],
          correct: 2,
          explanation:
            "Creating a structured improvement plan with clear goals and support gives team members the best chance to succeed.",
        },
      ],
      passingScore: 80,
    },
  },

  // Add more content as needed for comprehensive coverage...
  "10": {
    id: "10",
    title: "Setter Fundamentals",
    description: "Learn the basics of being an effective setter",
    type: "Course",
    duration: "5 hours",
    lessons: 10,
    author: {
      name: "Jennifer Adams",
      avatar: "/placeholder-icon.png",
      bio: "Sales Training Expert with 12+ years experience",
    },
    image: "/business-meeting-handshake.png",
    rating: 4.7,
    enrollments: 892,
    lastUpdated: "May 5, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Introduction to Setting", type: "video", duration: "30 min", completed: false },
      { id: 2, title: "Lead Qualification Basics", type: "video", duration: "35 min", completed: false },
      { id: 3, title: "Discovery Questions", type: "interactive", duration: "40 min", completed: false },
      { id: 4, title: "Appointment Setting", type: "video", duration: "30 min", completed: false },
      { id: 5, title: "CRM Management", type: "interactive", duration: "25 min", completed: false },
      { id: 6, title: "Communication Skills", type: "video", duration: "35 min", completed: false },
      { id: 7, title: "Time Management", type: "document", duration: "20 min", completed: false },
      { id: 8, title: "Performance Metrics", type: "interactive", duration: "25 min", completed: false },
      { id: 9, title: "Best Practices", type: "video", duration: "30 min", completed: false },
      { id: 10, title: "Final Assessment", type: "quiz", duration: "30 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the primary goal of a setter?",
          options: [
            "Close deals",
            "Generate leads",
            "Qualify prospects and set appointments",
            "Handle customer service",
          ],
          correct: 2,
          explanation: "The primary role of a setter is to qualify prospects and schedule appointments for closers.",
        },
        {
          id: 2,
          question: "Which qualification framework is most commonly used?",
          options: ["BANT", "MEDDIC", "SPIN", "NEAT"],
          correct: 0,
          explanation: "BANT (Budget, Authority, Need, Timeline) is the most widely used qualification framework.",
        },
      ],
      passingScore: 80,
    },
  },
  "11": {
    id: "11",
    title: "Email Templates Workshop",
    description: "Proven email templates that get responses from prospects",
    type: "Workshop",
    duration: "1 hour",
    lessons: 5,
    author: {
      name: "Robert Chen",
      avatar: "/placeholder-icon.png",
      bio: "Email Marketing Specialist",
    },
    image: "/placeholder-igcfq.png",
    rating: 4.5,
    enrollments: 567,
    lastUpdated: "April 28, 2024",
    hasCertification: false,
    modules: [
      { id: 1, title: "Email Template Basics", type: "video", duration: "12 min", completed: false },
      { id: 2, title: "Subject Line Strategies", type: "interactive", duration: "15 min", completed: false },
      { id: 3, title: "Personalization Techniques", type: "document", duration: "10 min", completed: false },
      { id: 4, title: "Follow-up Sequences", type: "video", duration: "18 min", completed: false },
      { id: 5, title: "Template Library", type: "document", duration: "5 min", completed: false },
    ],
  },
  "12": {
    id: "12",
    title: "Prospecting Tools Masterclass",
    description: "Learn how to use the latest tools to find and connect with prospects",
    type: "Course",
    duration: "4 hours",
    lessons: 8,
    author: {
      name: "Michael Thompson",
      avatar: "/placeholder-icon.png",
      bio: "Sales Technology Expert",
    },
    image: "/sales-tools-dashboard.png",
    rating: 4.6,
    enrollments: 734,
    lastUpdated: "May 1, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Tool Overview", type: "video", duration: "30 min", completed: false },
      { id: 2, title: "LinkedIn Sales Navigator", type: "interactive", duration: "35 min", completed: false },
      { id: 3, title: "ZoomInfo Mastery", type: "video", duration: "30 min", completed: false },
      { id: 4, title: "Apollo Setup", type: "interactive", duration: "25 min", completed: false },
      { id: 5, title: "Outreach Automation", type: "video", duration: "40 min", completed: false },
      { id: 6, title: "Data Management", type: "document", duration: "20 min", completed: false },
      { id: 7, title: "Integration Strategies", type: "interactive", duration: "30 min", completed: false },
      { id: 8, title: "Tools Assessment", type: "quiz", duration: "30 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the most important feature of LinkedIn Sales Navigator?",
          options: ["Advanced search filters", "InMail credits", "Lead recommendations", "All of the above"],
          correct: 3,
          explanation: "All features work together to make Sales Navigator a powerful prospecting tool.",
        },
      ],
      passingScore: 80,
    },
  },
  "13": {
    id: "13",
    title: "Advanced Prospecting Techniques",
    description: "Find more high-quality leads with these advanced prospecting methods",
    type: "Course",
    duration: "4 hours",
    lessons: 10,
    author: {
      name: "Michael Thompson",
      avatar: "/placeholder-icon.png",
      bio: "Advanced Prospecting Specialist",
    },
    image: "/sales-prospecting-dashboard.png",
    rating: 4.8,
    enrollments: 456,
    lastUpdated: "May 15, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Advanced Research Techniques", type: "video", duration: "25 min", completed: false },
      { id: 2, title: "Social Selling Mastery", type: "interactive", duration: "30 min", completed: false },
      { id: 3, title: "Trigger Event Prospecting", type: "video", duration: "25 min", completed: false },
      { id: 4, title: "Referral Strategies", type: "interactive", duration: "30 min", completed: false },
      { id: 5, title: "Account-Based Prospecting", type: "video", duration: "35 min", completed: false },
      { id: 6, title: "Multi-Channel Approach", type: "document", duration: "20 min", completed: false },
      { id: 7, title: "Prospecting Automation", type: "interactive", duration: "25 min", completed: false },
      { id: 8, title: "Quality vs Quantity", type: "video", duration: "20 min", completed: false },
      { id: 9, title: "Advanced Techniques Practice", type: "interactive", duration: "30 min", completed: false },
      { id: 10, title: "Prospecting Mastery Exam", type: "quiz", duration: "40 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is trigger event prospecting?",
          options: [
            "Random outreach timing",
            "Prospecting based on company changes or events",
            "Automated prospecting",
            "Cold calling only",
          ],
          correct: 1,
          explanation:
            "Trigger event prospecting involves reaching out when companies experience changes that create opportunities.",
        },
      ],
      passingScore: 80,
    },
  },
  "14": {
    id: "14",
    title: "The Psychology of Prospecting",
    description: "Understand the psychological principles that drive effective prospecting",
    type: "Workshop",
    duration: "3 hours",
    lessons: 6,
    author: {
      name: "Dr. Emily Chen",
      avatar: "/placeholder-icon.png",
      bio: "Sales Psychology Expert & Researcher",
    },
    image: "/psychology-of-sales.png",
    rating: 4.9,
    enrollments: 234,
    lastUpdated: "May 8, 2024",
    hasCertification: false,
    modules: [
      { id: 1, title: "Psychology Fundamentals", type: "video", duration: "30 min", completed: false },
      { id: 2, title: "Buyer Psychology", type: "interactive", duration: "35 min", completed: false },
      { id: 3, title: "Influence Principles", type: "video", duration: "25 min", completed: false },
      { id: 4, title: "Cognitive Biases", type: "interactive", duration: "30 min", completed: false },
      { id: 5, title: "Emotional Intelligence", type: "video", duration: "25 min", completed: false },
      { id: 6, title: "Practical Applications", type: "interactive", duration: "35 min", completed: false },
    ],
  },
  "15": {
    id: "15",
    title: "The Complete Guide to Sales Automation",
    description: "Automate repetitive tasks and focus on what matters most - selling",
    type: "Pathway",
    duration: "6 hours",
    lessons: 15,
    author: {
      name: "James Wilson",
      avatar: "/placeholder-icon.png",
      bio: "Sales Automation Expert",
    },
    image: "/placeholder.svg?height=400&width=600&query=sales automation workflow",
    rating: 4.7,
    enrollments: 345,
    lastUpdated: "May 12, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Automation Overview", type: "video", duration: "20 min", completed: false },
      { id: 2, title: "CRM Automation", type: "interactive", duration: "25 min", completed: false },
      { id: 3, title: "Email Sequences", type: "video", duration: "30 min", completed: false },
      { id: 4, title: "Social Media Automation", type: "interactive", duration: "25 min", completed: false },
      { id: 5, title: "Lead Scoring", type: "video", duration: "25 min", completed: false },
      { id: 6, title: "Workflow Design", type: "document", duration: "20 min", completed: false },
      { id: 7, title: "Integration Setup", type: "interactive", duration: "30 min", completed: false },
      { id: 8, title: "Performance Tracking", type: "video", duration: "25 min", completed: false },
      { id: 9, title: "Optimization Strategies", type: "interactive", duration: "25 min", completed: false },
      { id: 10, title: "Advanced Automation", type: "video", duration: "30 min", completed: false },
      { id: 11, title: "Troubleshooting", type: "document", duration: "15 min", completed: false },
      { id: 12, title: "Best Practices", type: "interactive", duration: "25 min", completed: false },
      { id: 13, title: "Case Studies", type: "video", duration: "30 min", completed: false },
      { id: 14, title: "Implementation Plan", type: "document", duration: "20 min", completed: false },
      { id: 15, title: "Automation Certification", type: "quiz", duration: "45 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the primary benefit of sales automation?",
          options: [
            "Eliminating human interaction",
            "Reducing costs only",
            "Freeing up time for high-value activities",
            "Replacing salespeople",
          ],
          correct: 2,
          explanation:
            "Sales automation should free up time for salespeople to focus on relationship building and closing deals.",
        },
      ],
      passingScore: 80,
    },
  },

  // Closer View Content
  "22": {
    id: "22",
    title: "Enterprise Deal Management",
    description: "Navigate complex enterprise deals from qualification to close",
    type: "Pathway",
    duration: "8 hours",
    lessons: 16,
    author: {
      name: "Sarah Miller",
      avatar: "/placeholder-icon.png",
      bio: "Enterprise Sales Director",
    },
    image: "/placeholder.svg?height=400&width=600&query=enterprise business meeting",
    rating: 4.8,
    enrollments: 234,
    lastUpdated: "May 18, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Enterprise Sales Overview", type: "video", duration: "30 min", completed: false },
      { id: 2, title: "Stakeholder Mapping", type: "interactive", duration: "35 min", completed: false },
      { id: 3, title: "Complex Qualification", type: "video", duration: "30 min", completed: false },
      { id: 4, title: "Multi-Threading", type: "interactive", duration: "25 min", completed: false },
      { id: 5, title: "Executive Engagement", type: "video", duration: "35 min", completed: false },
      { id: 6, title: "Proposal Strategy", type: "document", duration: "25 min", completed: false },
      { id: 7, title: "Negotiation Tactics", type: "interactive", duration: "40 min", completed: false },
      { id: 8, title: "Contract Management", type: "video", duration: "30 min", completed: false },
      { id: 9, title: "Risk Mitigation", type: "interactive", duration: "25 min", completed: false },
      { id: 10, title: "Deal Reviews", type: "video", duration: "25 min", completed: false },
      { id: 11, title: "Competitive Strategies", type: "document", duration: "20 min", completed: false },
      { id: 12, title: "Implementation Planning", type: "interactive", duration: "30 min", completed: false },
      { id: 13, title: "Customer Success Handoff", type: "video", duration: "25 min", completed: false },
      { id: 14, title: "Deal Post-Mortem", type: "interactive", duration: "25 min", completed: false },
      { id: 15, title: "Advanced Strategies", type: "video", duration: "35 min", completed: false },
      { id: 16, title: "Enterprise Certification", type: "quiz", duration: "60 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is multi-threading in enterprise sales?",
          options: [
            "Using multiple sales tools",
            "Engaging multiple stakeholders",
            "Running parallel processes",
            "Multiple follow-ups",
          ],
          correct: 1,
          explanation:
            "Multi-threading involves building relationships with multiple stakeholders within the target organization.",
        },
      ],
      passingScore: 80,
    },
  },
  "23": {
    id: "23",
    title: "Pricing Strategies That Win",
    description: "Learn how to position your pricing to maximize deal value",
    type: "Workshop",
    duration: "3 hours",
    lessons: 7,
    author: {
      name: "Jennifer Lee",
      avatar: "/placeholder-icon.png",
      bio: "Pricing Strategy Expert",
    },
    image: "/placeholder.svg?height=400&width=600&query=pricing strategy chart",
    rating: 4.6,
    enrollments: 456,
    lastUpdated: "May 14, 2024",
    hasCertification: false,
    modules: [
      { id: 1, title: "Pricing Psychology", type: "video", duration: "25 min", completed: false },
      { id: 2, title: "Value-Based Pricing", type: "interactive", duration: "30 min", completed: false },
      { id: 3, title: "Competitive Pricing", type: "video", duration: "25 min", completed: false },
      { id: 4, title: "Discount Strategies", type: "interactive", duration: "25 min", completed: false },
      { id: 5, title: "Package Positioning", type: "video", duration: "30 min", completed: false },
      { id: 6, title: "Objection Handling", type: "interactive", duration: "20 min", completed: false },
      { id: 7, title: "Pricing Negotiation", type: "video", duration: "25 min", completed: false },
    ],
  },
  "24": {
    id: "24",
    title: "Competitive Positioning",
    description: "Position your solution effectively against competitors",
    type: "Course",
    duration: "4 hours",
    lessons: 9,
    author: {
      name: "David Wilson",
      avatar: "/placeholder-icon.png",
      bio: "Competitive Intelligence Expert",
    },
    image: "/placeholder.svg?height=400&width=600&query=competitive analysis chart",
    rating: 4.7,
    enrollments: 567,
    lastUpdated: "May 16, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Competitive Landscape", type: "video", duration: "30 min", completed: false },
      { id: 2, title: "SWOT Analysis", type: "interactive", duration: "25 min", completed: false },
      { id: 3, title: "Differentiation Strategies", type: "video", duration: "30 min", completed: false },
      { id: 4, title: "Battle Cards Creation", type: "interactive", duration: "25 min", completed: false },
      { id: 5, title: "Competitive Messaging", type: "video", duration: "25 min", completed: false },
      { id: 6, title: "Objection Responses", type: "document", duration: "20 min", completed: false },
      { id: 7, title: "Win/Loss Analysis", type: "interactive", duration: "25 min", completed: false },
      { id: 8, title: "Market Positioning", type: "video", duration: "30 min", completed: false },
      { id: 9, title: "Competitive Assessment", type: "quiz", duration: "30 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the most effective way to handle competitive objections?",
          options: [
            "Criticize the competitor",
            "Ignore the objection",
            "Focus on your unique value",
            "Lower your price",
          ],
          correct: 2,
          explanation: "Focus on your unique value proposition rather than attacking competitors.",
        },
      ],
      passingScore: 80,
    },
  },
  "25": {
    id: "25",
    title: "Closer Fundamentals",
    description: "Master the basics of being an effective closer",
    type: "Course",
    duration: "5 hours",
    lessons: 10,
    author: {
      name: "Jennifer Adams",
      avatar: "/placeholder-icon.png",
      bio: "Senior Sales Trainer",
    },
    image: "/placeholder.svg?height=400&width=600&query=business contract signing",
    rating: 4.8,
    enrollments: 789,
    lastUpdated: "April 30, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Closer Mindset", type: "video", duration: "30 min", completed: false },
      { id: 2, title: "Sales Process Mastery", type: "interactive", duration: "35 min", completed: false },
      { id: 3, title: "Discovery Techniques", type: "video", duration: "30 min", completed: false },
      { id: 4, title: "Presentation Skills", type: "interactive", duration: "35 min", completed: false },
      { id: 5, title: "Objection Handling", type: "video", duration: "30 min", completed: false },
      { id: 6, title: "Closing Techniques", type: "interactive", duration: "35 min", completed: false },
      { id: 7, title: "Negotiation Basics", type: "video", duration: "30 min", completed: false },
      { id: 8, title: "Follow-up Strategies", type: "document", duration: "20 min", completed: false },
      { id: 9, title: "Performance Tracking", type: "interactive", duration: "25 min", completed: false },
      { id: 10, title: "Fundamentals Assessment", type: "quiz", duration: "30 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the most important skill for a closer?",
          options: ["Product knowledge", "Listening", "Talking", "Pricing"],
          correct: 1,
          explanation: "Listening is crucial for understanding customer needs and tailoring your approach accordingly.",
        },
      ],
      passingScore: 80,
    },
  },
  "26": {
    id: "26",
    title: "Demo Excellence",
    description: "Deliver compelling product demonstrations that convert",
    type: "Workshop",
    duration: "3 hours",
    lessons: 6,
    author: {
      name: "Robert Chen",
      avatar: "/placeholder-icon.png",
      bio: "Demo Specialist & Sales Engineer",
    },
    image: "/placeholder.svg?height=400&width=600&query=product demonstration meeting",
    rating: 4.7,
    enrollments: 456,
    lastUpdated: "May 3, 2024",
    hasCertification: false,
    modules: [
      { id: 1, title: "Demo Preparation", type: "video", duration: "30 min", completed: false },
      { id: 2, title: "Storytelling Techniques", type: "interactive", duration: "35 min", completed: false },
      { id: 3, title: "Feature-Benefit Mapping", type: "video", duration: "25 min", completed: false },
      { id: 4, title: "Handling Interruptions", type: "interactive", duration: "25 min", completed: false },
      { id: 5, title: "Technical Objections", type: "video", duration: "30 min", completed: false },
      { id: 6, title: "Demo Follow-up", type: "document", duration: "15 min", completed: false },
    ],
  },
  "27": {
    id: "27",
    title: "Proposal Writing Masterclass",
    description: "Create winning proposals that address client needs",
    type: "Course",
    duration: "4 hours",
    lessons: 8,
    author: {
      name: "Michael Thompson",
      avatar: "/placeholder-icon.png",
      bio: "Proposal Writing Expert",
    },
    image: "/placeholder.svg?height=400&width=600&query=business proposal document",
    rating: 4.6,
    enrollments: 345,
    lastUpdated: "May 6, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Proposal Structure", type: "video", duration: "30 min", completed: false },
      { id: 2, title: "Executive Summary", type: "interactive", duration: "25 min", completed: false },
      { id: 3, title: "Needs Analysis", type: "video", duration: "30 min", completed: false },
      { id: 4, title: "Solution Presentation", type: "interactive", duration: "35 min", completed: false },
      { id: 5, title: "Pricing Strategy", type: "video", duration: "25 min", completed: false },
      { id: 6, title: "Implementation Timeline", type: "document", duration: "20 min", completed: false },
      { id: 7, title: "Risk Mitigation", type: "interactive", duration: "25 min", completed: false },
      { id: 8, title: "Proposal Assessment", type: "quiz", duration: "30 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the most important section of a proposal?",
          options: ["Executive Summary", "Pricing", "Technical Specs", "Company Background"],
          correct: 0,
          explanation: "The Executive Summary is often the only section decision-makers read in detail.",
        },
      ],
      passingScore: 80,
    },
  },

  // Bookmarked content for closer view
  "28": {
    id: "28",
    title: "Advanced Sales Psychology",
    description: "Deep dive into the psychological aspects of selling",
    type: "Course",
    duration: "3 hours",
    lessons: 6,
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "/placeholder-icon.png",
      bio: "Sales Psychology Researcher",
    },
    image: "/placeholder.svg?height=400&width=600&query=psychology brain sales",
    rating: 4.9,
    enrollments: 234,
    lastUpdated: "May 20, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Buyer Psychology", type: "video", duration: "30 min", completed: false },
      { id: 2, title: "Decision Making Process", type: "interactive", duration: "35 min", completed: false },
      { id: 3, title: "Influence Techniques", type: "video", duration: "25 min", completed: false },
      { id: 4, title: "Emotional Triggers", type: "interactive", duration: "30 min", completed: false },
      { id: 5, title: "Cognitive Biases", type: "video", duration: "25 min", completed: false },
      { id: 6, title: "Psychology Assessment", type: "quiz", duration: "35 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the most powerful psychological trigger in sales?",
          options: ["Fear of loss", "Desire for gain", "Social proof", "Authority"],
          correct: 0,
          explanation: "Fear of loss is typically more motivating than the desire for equivalent gain.",
        },
      ],
      passingScore: 80,
    },
  },
  "29": {
    id: "29",
    title: "Executive Selling Strategies",
    description: "Learn how to sell to C-level executives effectively",
    type: "Workshop",
    duration: "2 hours",
    lessons: 4,
    author: {
      name: "Marcus Williams",
      avatar: "/placeholder-icon.png",
      bio: "Executive Sales Specialist",
    },
    image: "/placeholder.svg?height=400&width=600&query=executive boardroom meeting",
    rating: 4.8,
    enrollments: 156,
    lastUpdated: "May 22, 2024",
    hasCertification: false,
    modules: [
      { id: 1, title: "Executive Mindset", type: "video", duration: "30 min", completed: false },
      { id: 2, title: "Business Case Development", type: "interactive", duration: "35 min", completed: false },
      { id: 3, title: "Executive Communication", type: "video", duration: "25 min", completed: false },
      { id: 4, title: "Strategic Positioning", type: "interactive", duration: "30 min", completed: false },
    ],
  },
  "30": {
    id: "30",
    title: "Sales Leadership Certification",
    description: "Develop leadership skills for sales management roles",
    type: "Certification",
    duration: "5 hours",
    lessons: 10,
    author: {
      name: "Jennifer Blake",
      avatar: "/placeholder-icon.png",
      bio: "Sales Leadership Expert",
    },
    image: "/placeholder.svg?height=400&width=600&query=leadership team meeting",
    rating: 4.7,
    enrollments: 89,
    lastUpdated: "May 25, 2024",
    hasCertification: true,
    modules: [
      { id: 1, title: "Leadership Fundamentals", type: "video", duration: "30 min", completed: false },
      { id: 2, title: "Team Building", type: "interactive", duration: "35 min", completed: false },
      { id: 3, title: "Performance Management", type: "video", duration: "30 min", completed: false },
      { id: 4, title: "Coaching Techniques", type: "interactive", duration: "35 min", completed: false },
      { id: 5, title: "Motivation Strategies", type: "video", duration: "25 min", completed: false },
      { id: 6, title: "Conflict Resolution", type: "interactive", duration: "30 min", completed: false },
      { id: 7, title: "Strategic Planning", type: "video", duration: "30 min", completed: false },
      { id: 8, title: "Change Management", type: "document", duration: "20 min", completed: false },
      { id: 9, title: "Leadership Practice", type: "interactive", duration: "35 min", completed: false },
      { id: 10, title: "Leadership Certification Exam", type: "quiz", duration: "50 min", completed: false },
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the most important quality of a sales leader?",
          options: ["Technical skills", "Emotional intelligence", "Product knowledge", "Closing ability"],
          correct: 1,
          explanation:
            "Emotional intelligence is crucial for understanding, motivating, and developing team members effectively.",
        },
      ],
      passingScore: 80,
    },
  },
}

export default function ContentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const contentId = params.id as string

  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({})
  const [currentModule, setCurrentModule] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [showCertificate, setShowCertificate] = useState(false)
  const [completedModules, setCompletedModules] = useState<{ [key: number]: boolean }>({})
  const [referringTab, setReferringTab] = useState<string | null>(null)

  const content = contentData[contentId]

  useEffect(() => {
    // Check if there's a referring tab in the URL search params
    const urlParams = new URLSearchParams(window.location.search)
    const tab = urlParams.get("tab")
    if (tab) {
      setReferringTab(tab)
    }
  }, [])

  useEffect(() => {
    if (!content) {
      router.push(referringTab ? `/enablement-hub?tab=${referringTab}` : "/enablement-hub")
      return
    }

    // Calculate overall progress
    const completed = Object.keys(completedModules).length
    const totalModules = content.modules.length
    setProgress((completed / totalModules) * 100)
  }, [content, router, completedModules, referringTab])

  const handleBackNavigation = () => {
    if (referringTab) {
      // Navigate back to the enablement hub with the specific tab
      router.push(`/enablement-hub?tab=${referringTab}`)
    } else {
      // Fallback to regular back navigation
      router.back()
    }
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Content Not Found</h2>
          <p className="text-gray-600 mb-4">The content you're looking for doesn't exist.</p>
          <Button onClick={() => router.push(referringTab ? `/enablement-hub?tab=${referringTab}` : "/enablement-hub")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Enablement Hub
          </Button>
        </div>
      </div>
    )
  }

  const currentModuleData = content.modules[currentModule]

  const handleModuleComplete = () => {
    setCompletedModules((prev) => ({
      ...prev,
      [currentModule]: true,
    }))

    // Move to next module if available
    if (currentModule < content.modules.length - 1) {
      setCurrentModule(currentModule + 1)
    }

    // Check if this was the final quiz and if certification should be shown
    if (currentModuleData.type === "quiz" && content.hasCertification && currentModule === content.modules.length - 1) {
      setShowCertificate(true)
    }
  }

  const handleQuizSubmit = () => {
    if (!content.quiz) return

    let correct = 0
    content.quiz.questions.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) {
        correct++
      }
    })

    const score = (correct / content.quiz.questions.length) * 100
    setQuizScore(score)
    setQuizSubmitted(true)

    if (score >= content.quiz.passingScore) {
      handleModuleComplete()
    }
  }

  const renderModuleContent = () => {
    const module = currentModuleData

    switch (module.type) {
      case "video":
        return (
          <div className="space-y-4">
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <Video className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg font-medium">{module.title}</p>
                <p className="text-sm opacity-75">Video content would play here</p>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <Button variant="ghost" size="icon" className="text-white">
                    <SkipBack className="h-6 w-6" />
                  </Button>
                  <Button size="icon" className="h-12 w-12" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white">
                    <SkipForward className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">About this video</h4>
              <p className="text-sm text-gray-600">
                This video covers {module.title.toLowerCase()} and provides practical insights you can apply
                immediately.
              </p>
            </div>
          </div>
        )

      case "audio":
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-8 text-center text-white">
              <Headphones className="h-16 w-16 mx-auto mb-4" />
              <p className="text-lg font-medium">{module.title}</p>
              <p className="text-sm opacity-75">Audio content would play here</p>
              <div className="flex items-center justify-center gap-4 mt-6">
                <Button variant="ghost" size="icon" className="text-white">
                  <SkipBack className="h-6 w-6" />
                </Button>
                <Button
                  size="icon"
                  className="h-12 w-12 bg-white text-purple-500 hover:bg-gray-100"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
                <Button variant="ghost" size="icon" className="text-white">
                  <SkipForward className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        )

      case "document":
        return (
          <div className="space-y-4">
            <div className="border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <h4 className="font-medium">{module.title}</h4>
                  <p className="text-sm text-gray-600">Reading material and resources</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
              <div className="prose max-w-none">
                <p>
                  This comprehensive guide covers {module.title.toLowerCase()} with detailed explanations, examples, and
                  actionable strategies you can implement immediately.
                </p>
                <h4>Key Topics Covered:</h4>
                <ul>
                  <li>Fundamental concepts and principles</li>
                  <li>Best practices and proven strategies</li>
                  <li>Real-world examples and case studies</li>
                  <li>Implementation guidelines</li>
                  <li>Common pitfalls to avoid</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case "interactive":
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Layers className="h-8 w-8 text-green-500" />
                  <div>
                    <CardTitle>{module.title}</CardTitle>
                    <CardDescription>Interactive learning module</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Interactive Exercise</h4>
                    <p className="text-blue-800 text-sm">
                      This interactive module includes hands-on exercises, simulations, and practical activities to
                      reinforce your learning of {module.title.toLowerCase()}.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-2">Activity 1</h5>
                      <p className="text-sm text-gray-600">Practical exercise with real-world scenarios</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-2">Activity 2</h5>
                      <p className="text-sm text-gray-600">Interactive simulation and role-play</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "quiz":
        if (!content.quiz) {
          return <div>Quiz content not available</div>
        }

        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Assessment</h3>
              <p className="text-gray-600">Complete this quiz to test your knowledge</p>
              <p className="text-sm text-gray-500 mt-2">Passing score: {content.quiz.passingScore}%</p>
            </div>

            {!quizSubmitted ? (
              <div className="space-y-6">
                {content.quiz.questions.map((question, qIndex) => (
                  <Card key={qIndex}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Question {qIndex + 1}: {question.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {question.options.map((option, oIndex) => (
                          <label
                            key={oIndex}
                            className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border hover:bg-gray-50"
                          >
                            <input
                              type="radio"
                              name={`question-${qIndex}`}
                              value={oIndex}
                              onChange={() => setQuizAnswers({ ...quizAnswers, [qIndex]: oIndex })}
                              className="text-primary"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="text-center">
                  <Button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length !== content.quiz.questions.length}
                    className="px-8"
                  >
                    Submit Quiz
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <Card className={quizScore >= content.quiz.passingScore ? "border-green-500" : "border-red-500"}>
                  <CardHeader className="text-center">
                    <div
                      className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                        quizScore >= content.quiz.passingScore ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {quizScore >= content.quiz.passingScore ? (
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      ) : (
                        <span className="text-2xl font-bold text-red-600">✗</span>
                      )}
                    </div>
                    <CardTitle className={quizScore >= content.quiz.passingScore ? "text-green-600" : "text-red-600"}>
                      {quizScore >= content.quiz.passingScore ? "Congratulations!" : "Quiz Failed"}
                    </CardTitle>
                    <CardDescription>
                      Your score: {quizScore.toFixed(0)}%
                      {quizScore >= content.quiz.passingScore
                        ? " - You passed!"
                        : ` - You need ${content.quiz.passingScore}% to pass`}
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Show answers with explanations */}
                <div className="space-y-4">
                  <h4 className="font-medium">Review Your Answers:</h4>
                  {content.quiz.questions.map((question, qIndex) => (
                    <Card key={qIndex}>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Question {qIndex + 1}: {question.question}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {question.options.map((option, oIndex) => (
                            <div
                              key={oIndex}
                              className={`p-3 rounded-lg border ${
                                oIndex === question.correct
                                  ? "bg-green-50 border-green-200"
                                  : quizAnswers[qIndex] === oIndex && oIndex !== question.correct
                                    ? "bg-red-50 border-red-200"
                                    : "bg-gray-50 border-gray-200"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{option}</span>
                                {oIndex === question.correct && <CheckCircle className="h-5 w-5 text-green-600" />}
                                {quizAnswers[qIndex] === oIndex && oIndex !== question.correct && (
                                  <span className="text-red-600 font-bold">✗</span>
                                )}
                              </div>
                            </div>
                          ))}
                          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {quizScore < content.quiz.passingScore && (
                  <div className="text-center">
                    <Button
                      onClick={() => {
                        setQuizSubmitted(false)
                        setQuizAnswers({})
                        setQuizScore(0)
                      }}
                      variant="outline"
                    >
                      Retake Quiz
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )

      default:
        return <div>Content type not supported</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleBackNavigation}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold">{content.title}</h1>
                <p className="text-sm text-gray-600">
                  Module {currentModule + 1} of {content.modules.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{progress.toFixed(0)}% Complete</p>
                <Progress value={progress} className="w-32 h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {currentModuleData.type === "video" && <Video className="h-5 w-5" />}
                      {currentModuleData.type === "audio" && <Headphones className="h-5 w-5" />}
                      {currentModuleData.type === "document" && <FileText className="h-5 w-5" />}
                      {currentModuleData.type === "interactive" && <Layers className="h-5 w-5" />}
                      {currentModuleData.type === "quiz" && <Award className="h-5 w-5" />}
                      {currentModuleData.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {currentModuleData.duration}
                      </span>
                      {completedModules[currentModule] && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>{renderModuleContent()}</CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentModule(Math.max(0, currentModule - 1))}
                  disabled={currentModule === 0}
                >
                  Previous Module
                </Button>
                <div className="flex gap-2">
                  {!completedModules[currentModule] && currentModuleData.type !== "quiz" && (
                    <Button onClick={handleModuleComplete}>Mark as Complete</Button>
                  )}
                  <Button
                    onClick={() => setCurrentModule(Math.min(content.modules.length - 1, currentModule + 1))}
                    disabled={currentModule === content.modules.length - 1}
                  >
                    Next Module
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info */}
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={content.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{content.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{content.author.name}</p>
                    <p className="text-sm text-gray-600">{content.author.bio}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{content.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-gray-400" />
                    <span>{content.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{content.rating}/5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{content.enrollments}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Updated {content.lastUpdated}</span>
                </div>
                {content.hasCertification && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Award className="h-4 w-4" />
                    <span>Certification Available</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Module List */}
            <Card>
              <CardHeader>
                <CardTitle>Course Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {content.modules.map((module, index) => (
                    <div
                      key={module.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        index === currentModule
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setCurrentModule(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                              completedModules[index]
                                ? "bg-green-100 text-green-600"
                                : index === currentModule
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {completedModules[index] ? <CheckCircle className="h-4 w-4" /> : index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{module.title}</p>
                            <p className="text-xs text-gray-600">{module.duration}</p>
                          </div>
                        </div>
                        {module.type === "video" && <Video className="h-4 w-4 text-gray-400" />}
                        {module.type === "audio" && <Headphones className="h-4 w-4 text-gray-400" />}
                        {module.type === "document" && <FileText className="h-4 w-4 text-gray-400" />}
                        {module.type === "interactive" && <Layers className="h-4 w-4 text-gray-400" />}
                        {module.type === "quiz" && <Award className="h-4 w-4 text-gray-400" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-10 w-10 text-yellow-600" />
              </div>
              <CardTitle className="text-2xl">Congratulations!</CardTitle>
              <CardDescription>
                You have successfully completed the course and earned your certification
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="border-2 border-yellow-400 rounded-lg p-8 bg-gradient-to-br from-yellow-50 to-orange-50">
                <h3 className="text-xl font-bold mb-2">Certificate of Completion</h3>
                <p className="text-lg mb-4">{content.title}</p>
                <p className="text-gray-600 mb-4">Awarded to: John Doe</p>
                <p className="text-sm text-gray-500">Completed on: {new Date().toLocaleDateString()}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setShowCertificate(false)}>
                Close
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

function ContentCard({
  content,
  isManager = false,
  onContentClick,
}: {
  content: any
  isManager?: boolean
  onContentClick?: (id: string) => void
}) {
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={() => onContentClick && onContentClick(content.id)}
    >
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={content.image || "/placeholder.svg"}
          alt={content.title}
          className="rounded-md aspect-video object-cover mb-4"
        />
        <div className="flex items-center justify-between">
          <Badge style={{ backgroundColor: getBadgeColor(content.type) }} className="uppercase">
            {content.type}
          </Badge>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{content.rating}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        Updated {content.lastUpdated} | {content.duration}
      </CardFooter>
    </Card>
  )
}

function getBadgeColor(type: string) {
  switch (type) {
    case "Pathway":
      return "#f472b6" // pink
    case "Workshop":
      return "#fb923c" // orange
    case "Course":
      return "#3b82f6" // blue
    case "Podcast":
      return "#a855f7" // purple
    case "Certification":
      return "#10b981" // green
    case "Asset":
      return "#6b7280" // gray
    default:
      return "#6b7280" // gray
  }
}
