"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/stores/authStore";
import { useUser } from "@/hooks/useUser";
import { useTranslations } from "next-intl";
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TextEffect } from "../../../../components/motion-primitives/text-effect";
import { AnimatedGroup } from "../../../../components/motion-primitives/animated-group";
import { 
  User, 
  Crown, 
  Star, 
  Award, 
  Zap, 
  Heart,
  Settings,
  Bell,
  Shield,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Edit3,
  Camera
} from "lucide-react";

const ProfileCard = ({ user, isAuthenticated }: {
  user: any;
  isAuthenticated: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <motion.div
      layout
      className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="relative z-10">
        {/* Profile Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                {isAuthenticated ? user?.name?.charAt(0) || 'D' : '?'}
              </div>
              
              {isAuthenticated && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center transition-colors"
              >
                <Camera className="w-3 h-3" />
              </motion.button>
            </motion.div>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">
                  {isAuthenticated ? user?.name || 'Demo User' : 'Guest User'}
                </h3>
                {isAuthenticated && (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Crown className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {isAuthenticated ? 'Premium Member' : 'Welcome Guest'}
              </p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </motion.button>
        </div>
        
        {/* Stats */}
        <AnimatePresence mode="wait">
          {isAuthenticated ? (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-3 gap-4 mb-6"
            >
              <div className="text-center p-3 bg-background/50 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-bold text-lg">4.9</span>
                </div>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
              
              <div className="text-center p-3 bg-background/50 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Award className="w-4 h-4 text-blue-500" />
                  <span className="font-bold text-lg">12</span>
                </div>
                <p className="text-xs text-muted-foreground">Badges</p>
              </div>
              
              <div className="text-center p-3 bg-background/50 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="w-4 h-4 text-purple-500" />
                  <span className="font-bold text-lg">89</span>
                </div>
                <p className="text-xs text-muted-foreground">Points</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="guest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-8 border-2 border-dashed border-border/50 rounded-lg mb-6"
            >
              <User className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Sign in to unlock your profile</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Contact Info */}
        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{user?.email || 'demo@example.com'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Joined March 2024</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const ActionButtons = ({ isAuthenticated, onLogin, onLogout }: {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}) => {
  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {isAuthenticated ? (
          <motion.div
            key="authenticated"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-3"
          >
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-medium transition-colors"
              >
                <Bell className="w-4 h-4" />
                Alerts
              </motion.button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onLogout}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Sign Out
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="guest"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-3"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onLogin}
              className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Sign In to Continue
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-medium transition-colors border border-border/50"
            >
              Create Account
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SectionFive = () => {
  const t = useTranslations("SectionFive");
  const { user, isAuthenticated, login, logout } = useAuthStore();
  const { data: userData, isLoading } = useUser(user?.id || "demo-user");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleLogin = () => {
    login({
      id: "demo-user",
      name: "Demo User",
      email: "demo@example.com",
    });
  };

  return (
    <div ref={ref} className="min-h-screen mx-auto max-w-7xl px-4 py-24 relative">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            background: [
              "radial-gradient(ellipse 40% 50% at 80% 20%, rgba(var(--primary)/0.1), transparent)",
              "radial-gradient(ellipse 40% 50% at 20% 80%, rgba(var(--primary)/0.15), transparent)",
              "radial-gradient(ellipse 40% 50% at 60% 40%, rgba(var(--primary)/0.1), transparent)"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary)/0.03),transparent_50%)]" />
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Content Section */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-sm text-primary font-medium px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <User className="w-4 h-4" />
            User Experience
          </motion.div>
          
          <TextEffect
            per="word"
            preset="slide"
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            {isAuthenticated ? "Welcome back! Your profile awaits" : "Personalized experience tailored just for you"}
          </TextEffect>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            Discover a seamless user experience with personalized profiles, real-time updates, and intuitive controls designed to make every interaction meaningful.
          </motion.p>

          {/* Feature highlights */}
          <AnimatedGroup preset="slide" className="space-y-4">
            <motion.div className="flex items-center gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium">Secure & Private</h4>
                <p className="text-sm text-muted-foreground">Your data is protected with enterprise-grade security</p>
              </div>
            </motion.div>
            
            <motion.div className="flex items-center gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Heart className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium">Personalized</h4>
                <p className="text-sm text-muted-foreground">Tailored experience based on your preferences</p>
              </div>
            </motion.div>
            
            <motion.div className="flex items-center gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium">Lightning Fast</h4>
                <p className="text-sm text-muted-foreground">Instant updates and real-time synchronization</p>
              </div>
            </motion.div>
          </AnimatedGroup>
        </div>

        {/* Interactive Profile Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Profile Card */}
          <ProfileCard user={user} isAuthenticated={isAuthenticated} />
          
          {/* Action Buttons */}
          <ActionButtons 
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
            onLogout={logout}
          />
        </motion.div>
      </div>
    </div>
  );
};
