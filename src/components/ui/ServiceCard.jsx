"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";

export default function ServiceCard({ service, index, variant = "default" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-100, 100], [8, -8]),
    { stiffness: 150, damping: 25 }
  );
  
  const rotateY = useSpring(
    useTransform(x, [-100, 100], [-8, 8]),
    { stiffness: 150, damping: 25 }
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = service.icon;
  const isFeatured = variant === "featured";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d",
        transform: "perspective(1000px)"
      }}
      className="relative group/card"
    >
      {/* Animated Border Gradient */}
      <div className="absolute -inset-px bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-accent-500/20 rounded-3xl opacity-0 group-hover/card:opacity-100 blur-xl transition-opacity duration-700" />
      
      <div className={`
        relative h-full rounded-2xl transition-all duration-500
        ${isFeatured 
          ? "bg-gradient-to-br from-gray-900 via-gray-900 to-primary-950/30 dark:from-gray-950 dark:via-gray-950 dark:to-primary-950/40" 
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
        }
        ${isFeatured ? "border-primary-500/30 shadow-2xl" : "border-gray-200/50 dark:border-gray-800/50 shadow-lg"}
        border hover:shadow-2xl hover:shadow-primary-500/10
      `}>
        {/* Glass Morphism Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-white/5 rounded-2xl pointer-events-none" />
        
        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-xs font-bold text-white shadow-lg flex items-center gap-1.5 z-10">
            <Sparkles size={12} />
            <span>Featured Service</span>
          </div>
        )}

        <div className="relative p-6 md:p-8 flex flex-col h-full">
          {/* Icon Section */}
          <div className="mb-6">
            <div className={`
              relative inline-flex p-3.5 rounded-xl transition-all duration-500
              ${isFeatured
                ? "bg-gradient-to-br from-primary-500/20 to-secondary-500/20 group-hover/card:from-primary-500/30 group-hover/card:to-secondary-500/30"
                : "bg-primary-50 dark:bg-primary-950/50 group-hover/card:bg-primary-100 dark:group-hover/card:bg-primary-900/30"
              }
            `}>
              <Icon 
                size={32} 
                className={`
                  transition-all duration-500
                  ${isFeatured 
                    ? "text-primary-400 group-hover/card:text-primary-300" 
                    : "text-primary-600 dark:text-primary-400 group-hover/card:text-primary-500"
                  }
                `}
              />
              
              {/* Pulsing Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/30 to-secondary-500/30 blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 animate-pulse" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-grow space-y-4">
            <div>
              <h3 className={`
                text-xl font-bold tracking-tight mb-2 transition-colors duration-300
                ${isFeatured
                  ? "text-white group-hover/card:text-primary-300"
                  : "text-gray-900 dark:text-white group-hover/card:text-primary-600 dark:group-hover/card:text-primary-400"
                }
              `}>
                {service.title}
              </h3>
              
              <div className="h-0.5 w-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500 group-hover/card:w-20" />
            </div>

            <p className={`
              text-sm leading-relaxed
              ${isFeatured
                ? "text-gray-300"
                : "text-gray-600 dark:text-gray-400"
              }
            `}>
              {service.description}
            </p>

            {/* Features List */}
            <div className="pt-2 space-y-2.5">
              {service.features && service.features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`
                    flex items-center gap-2.5 text-sm transition-all duration-300
                    group/feature hover:translate-x-1
                    ${feature.highlighted 
                      ? "text-primary-600 dark:text-primary-400 font-medium" 
                      : "text-gray-600 dark:text-gray-400"
                    }
                  `}
                >
                  <div className={`
                    w-1.5 h-1.5 rounded-full transition-all duration-300
                    group-hover/feature:scale-125
                    ${feature.highlighted
                      ? "bg-gradient-to-r from-primary-500 to-secondary-500"
                      : "bg-primary-400"
                    }
                  `} />
                  <span className="flex-1">{typeof feature === 'string' ? feature : feature.label}</span>
                </div>
              ))}
            </div>

            {/* Metrics Section */}
            {service.metrics && service.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-3 pt-4 mt-2">
                {service.metrics.map((metric, idx) => (
                  <div 
                    key={idx}
                    className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {metric.value}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-800/50">
            <button 
              className={`
                w-full group/btn flex items-center justify-between px-4 py-2.5 rounded-lg
                transition-all duration-300 text-sm font-semibold uppercase tracking-wider
                ${isFeatured
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-gray-50 hover:bg-primary-50 dark:bg-gray-800/50 dark:hover:bg-primary-950/50 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                }
              `}
              aria-label={`Learn more about ${service.title}`}
            >
              <span>Discover Solution</span>
              <ChevronRight 
                size={16} 
                className="transition-transform duration-300 group-hover/btn:translate-x-1" 
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}