"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FaStar, FaCodeBranch, FaEye, FaExternalLinkAlt } from "react-icons/fa";

export default function GitHubRepos({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ stars: 0, forks: 0 });

  useEffect(() => {
    fetchRepos();
  }, [username]);

  const fetchRepos = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
      );
      const data = await response.json();

      if (response.ok) {
        setRepos(data);
        const totalStars = data.reduce(
          (acc, repo) => acc + repo.stargazers_count,
          0,
        );
        const totalForks = data.reduce(
          (acc, repo) => acc + repo.forks_count,
          0,
        );
        setStats({ stars: totalStars, forks: totalForks });
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to fetch repositories");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <div className="absolute inset-0 rounded-full bg-primary-600/20 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-block">
          <p className="text-red-600 dark:text-red-400">
            Failed to load GitHub repos: {error}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative">
      {/* Header with Stats */}
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            GitHub Projects
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400">
            My latest open-source contributions
          </motion.p>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl text-center">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              <span className="font-bold text-lg">{stats.stars}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                stars
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl text-center">
            <div className="flex items-center gap-2">
              <FaCodeBranch className="text-blue-500" />
              <span className="font-bold text-lg">{stats.forks}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                forks
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* GitHub Profile Button */}
      <motion.a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02, y: -2 }}
        className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl hover:shadow-xl transition-all">
        <SiGithub className="w-5 h-5" />
        <span>View GitHub Profile</span>
        <FaExternalLinkAlt className="w-3 h-3" />
      </motion.a>

      {/* Repositories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo, index) => (
          <RepoCard key={repo.id} repo={repo} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

// Premium Repository Card Component
function RepoCard({ repo, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring" }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="block relative group">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ padding: "2px" }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-bold text-lg truncate flex-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {repo.name}
            </h4>
            {repo.language && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs font-medium">
                {repo.language}
              </motion.span>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[56px]">
            {repo.description || "No description available"}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            {repo.stargazers_count > 0 && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-1">
                <FaStar className="w-3 h-3 text-yellow-500" />
                <span>{repo.stargazers_count}</span>
              </motion.div>
            )}
            {repo.forks_count > 0 && (
              <div className="flex items-center gap-1">
                <FaCodeBranch className="w-3 h-3" />
                <span>{repo.forks_count}</span>
              </div>
            )}
            {repo.watchers_count > 0 && (
              <div className="flex items-center gap-1">
                <FaEye className="w-3 h-3" />
                <span>{repo.watchers_count}</span>
              </div>
            )}
          </div>

          <div className="mt-3 text-xs text-gray-400">
            Updated {new Date(repo.updated_at).toLocaleDateString()}
          </div>
        </div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />
      </div>
    </motion.a>
  );
}
