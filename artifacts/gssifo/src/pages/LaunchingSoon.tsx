import { motion } from "framer-motion";
import { Mail, Facebook, Instagram, Linkedin, Twitter, ArrowRight, Sparkles } from "lucide-react";

export default function LaunchingSoon() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden font-sans text-slate-50">
      {/* Background gradients and effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-teal-600/20 blur-[120px]" />
        
        {/* Animated particles */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-blue-400"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-purple-400"
        />
        <motion.div 
          animate={{ x: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-teal-400"
        />
        <motion.div 
          animate={{ y: [0, -25, 0], x: [0, -15, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-1/3 right-1/4 w-4 h-4 rounded-full bg-indigo-400"
        />
      </div>

      <div className="z-10 w-full max-w-4xl px-4 py-8 flex flex-col items-center">
        {/* Header / Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">GSSIO Global Suite</span>
        </motion.div>

        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Preparing for launch
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-400"
          >
            Launching Soon
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-lg"
          >
            We're building something amazing. Our new digital experience will be available shortly. Stay tuned.
          </motion.p>

          {/* Progress Indicator */}
          <motion.div 
            initial={{ opacity: 0, width: "0%" }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 1, delay: 0.7 }}
            className="w-full max-w-sm mb-10"
          >
            <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
              <span>Development Progress</span>
              <span>85%</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "85%" }}
                transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            </div>
          </motion.div>

          {/* Newsletter Form UI */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="w-full max-w-md flex flex-col sm:flex-row gap-3 mb-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
            <button 
              type="button"
              className="px-6 py-3 rounded-xl bg-slate-100 text-slate-900 font-semibold flex items-center justify-center gap-2 hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Notify Me
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>
          
          <p className="text-xs text-slate-500">We'll email you once when we launch. No spam.</p>
        </motion.div>
        
        {/* Footer / Socials */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-4">
            {[
              { icon: Facebook, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Instagram, href: "#" },
              { icon: Linkedin, href: "#" }
            ].map((social, index) => (
              <a 
                key={index} 
                href={social.href} 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-200"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          
          <div className="flex flex-col items-center gap-2 text-sm text-slate-500">
            <a href="mailto:contact@gssio.com" className="flex items-center gap-2 hover:text-slate-300 transition-colors">
              <Mail className="w-4 h-4" />
              contact@gssio.com
            </a>
            <p>&copy; {new Date().getFullYear()} GSSIO Global Suite. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
