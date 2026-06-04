"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function AnimatedProjectCard({ project, onClick, index }) {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !cardRef.current) return;

    const ctx = canvas.getContext("2d");
    let time = 0;
    let animationId;

    // Wave data based on project technologies
    const waveCount = Math.min(project.technologies?.length || 6, 8);
    const waveData = Array.from({ length: waveCount }).map(() => ({
      value: Math.random() * 0.5 + 0.1,
      targetValue: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.02 + 0.005,
    }));

    function resizeCanvas() {
      if (canvas && cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    }

    function updateWaveData() {
      waveData.forEach((data) => {
        if (Math.random() < 0.01) data.targetValue = Math.random() * 0.7 + 0.1;
        const diff = data.targetValue - data.value;
        data.value += diff * data.speed;
      });
    }

    function draw() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get category color
      const colors = {
        frontend: { r: 59, g: 130, b: 246 }, // Blue
        backend: { r: 16, g: 185, b: 129 }, // Green
        fullstack: { r: 139, g: 92, b: 246 }, // Purple
      };
      const categoryColor = colors[project.category] || colors.fullstack;

      waveData.forEach((data, i) => {
        const freq = data.value * 5;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 2) {
          const nx = (x / canvas.width) * 2 - 1;
          const px = nx + i * 0.06 + freq * 0.02;
          const py =
            Math.sin(px * 8 + time) *
            Math.cos(px * 1.8) *
            freq *
            0.12 *
            ((i + 1) / waveData.length);
          const y = canvas.height / 2 + py * 25;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const intensity = Math.min(0.6, freq * 0.2);
        ctx.lineWidth = 1 + i * 0.2;
        ctx.strokeStyle = `rgba(${categoryColor.r}, ${categoryColor.g}, ${categoryColor.b}, ${0.3 + intensity})`;
        ctx.stroke();
      });
    }

    function animate() {
      time += 0.02;
      updateWaveData();
      draw();
      animationId = requestAnimationFrame(animate);
    }

    // Initial resize and setup
    resizeCanvas();

    // Use ResizeObserver to handle card size changes
    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    if (cardRef.current) {
      resizeObserver.observe(cardRef.current);
    }

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [project]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: (index || 0) * 0.05 }}
      whileHover={{ y: -5 }}
      className="relative cursor-pointer group"
      onClick={onClick}>
      {/* Canvas Background - Animated Waves */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full rounded-2xl"
        style={{ pointerEvents: "none" }}
      />

      {/* Card Content */}
      <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 group-hover:border-primary-500/50 transition-all duration-300">
        {/* Image Section (if available) */}
        {project.image_url && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-primary-600/90 backdrop-blur-sm rounded-lg text-[10px] uppercase font-bold tracking-wider text-white border border-white/20">
                {project.category}
              </span>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies?.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-md text-[10px] font-medium text-gray-300 border border-white/10">
                {tech}
              </span>
            ))}
            {project.technologies?.length > 3 && (
              <span className="px-2 py-1 bg-primary-500/20 rounded-md text-[10px] font-medium text-primary-300">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-1 text-primary-400 text-xs font-medium">
              <span>View Project</span>
              <ChevronRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
            {project.live_url && (
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-gray-400">Live</span>
              </div>
            )}
          </div>
        </div>

        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-primary-500/10 via-transparent to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}
