"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/stores/authStore";
import { Lock, Shield, User, UserCheck, Eye, EyeOff, Mail, Key, CheckCircle, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TextEffect } from "../../../../components/motion-primitives/text-effect";
import { AnimatedGroup } from "../../../../components/motion-primitives/animated-group";

const SecurityFeature = ({ icon: Icon, title, description, isActive }: {
  icon: any;
  title: string;
  description: string;
  isActive: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 ${
        isActive ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
      }`}
    >
      <motion.div
        animate={{ 
          scale: isActive ? 1.1 : 1,
          rotate: isActive ? 360 : 0
        }}
        transition={{ duration: 0.5 }}
        className={`p-2 rounded-full ${
          isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
        }`}
      >
        <Icon className="w-4 h-4" />
      </motion.div>
      <div>
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

const AuthDemo = ({ isAuthenticated, onToggleAuth }: {
  isAuthenticated: boolean;
  onToggleAuth: () => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password123");

  return (
    <motion.div
      layout
      className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50"
    >
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Sign In Demo</h3>
              <p className="text-sm text-muted-foreground">Try our secure authentication</p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border/50 bg-background/50 focus:border-primary/50 focus:outline-none transition-colors"
                  placeholder="Email address"
                />
              </div>
              
              <div className="relative">
                <Key className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2 rounded-lg border border-border/50 bg-background/50 focus:border-primary/50 focus:outline-none transition-colors"
                  placeholder="Password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onToggleAuth}
                className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Sign In
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </motion.div>
            
            <div>
              <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
                Welcome back!
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                You're successfully authenticated
              </p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onToggleAuth}
                className="px-6 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors"
              >
                Sign Out
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const SectionThree = () => {
  const t = useTranslations("SectionThree");
  const { user, isAuthenticated, login, logout } = useAuthStore();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [demoAuth, setDemoAuth] = useState(false);

  const securityFeatures = [
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description: "Your data is protected with industry-standard encryption",
      isActive: demoAuth
    },
    {
      icon: Lock,
      title: "Secure Sessions",
      description: "Advanced session management with automatic timeout",
      isActive: demoAuth
    },
    {
      icon: UserCheck,
      title: "Multi-Factor Auth",
      description: "Additional security layers for enhanced protection",
      isActive: demoAuth
    }
  ];

  const handleToggleAuth = () => {
    setDemoAuth(!demoAuth);
    if (!demoAuth) {
      // Simulate login
      login({ id: "demo", name: "Demo User", email: "demo@example.com" });
    } else {
      // Simulate logout
      logout();
    }
  };

  return (
    <div ref={ref} className="min-h-screen mx-auto max-w-7xl px-4 py-24 relative">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            background: [
              "radial-gradient(ellipse 60% 40% at 30% 20%, rgba(var(--primary)/0.1), transparent)",
              "radial-gradient(ellipse 60% 40% at 70% 80%, rgba(var(--primary)/0.15), transparent)",
              "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(var(--primary)/0.1), transparent)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-[conic-gradient(from_45deg,rgba(var(--primary)/0.02),transparent,rgba(var(--primary)/0.02))]" />
      </div>

      <Card className="p-8 lg:p-12 backdrop-blur-sm bg-background/50 border-primary/10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Content Section */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-sm text-primary font-medium px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <Shield className="w-4 h-4" />
            Enterprise Security
          </motion.div>
          
          <TextEffect
            per="word"
            preset="slide"
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            {demoAuth ? "Welcome back, you're secure!" : "Bank-level security for your peace of mind"}
          </TextEffect>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            Experience robust authentication with advanced security features designed to protect your data and ensure seamless user experience.
          </motion.p>

          <AnimatedGroup preset="slide" className="space-y-4">
            {securityFeatures.map((feature, index) => (
              <SecurityFeature
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                isActive={feature.isActive}
              />
            ))}
          </AnimatedGroup>
        </div>

        {/* Interactive Demo Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {/* Floating elements */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full blur-sm"
          />
          <motion.div
            animate={{
              y: [10, -10, 10],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute -bottom-4 -right-4 w-12 h-12 bg-secondary/20 rounded-full blur-sm"
          />
          
          <AuthDemo isAuthenticated={demoAuth} onToggleAuth={handleToggleAuth} />
        </motion.div>
        </div>
      </Card>
    </div>
  );
};
