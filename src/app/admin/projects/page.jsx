"use client";

import { useState, useEffect, useRef } from "react";
import { projectsApi } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  PhotoIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

export default function ProjectsManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "fullstack",
    technologies: "",
    features: "",
    live_url: "",
    github_url: "",
    duration: "",
    role: "",
    image_url: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectsApi.getAll();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category,
        technologies: project.technologies?.join(", ") || "",
        features: project.features?.join("\n") || "",
        live_url: project.live_url || "",
        github_url: project.github_url || "",
        duration: project.duration || "",
        role: project.role || "",
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        category: "fullstack",
        technologies: "",
        features: "",
        live_url: "",
        github_url: "",
        duration: "",
        role: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size must be less than 5MB");
      return;
    }

    setImageError(null);
    setSelectedImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadImage = async () => {
    if (!selectedImage) return null;

    setUploadingImage(true);
    setImageError(null);

    try {
      const supabase = createClient();
      const timestamp = Date.now();
      const fileExt = selectedImage.name.split(".").pop();
      const fileName = `${timestamp}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("projects-images")
        .upload(fileName, selectedImage, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("projects-images")
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      setImageError(error.message || "Failed to upload image");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmitWithImage = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image_url;

      // Upload new image if selected
      if (selectedImage) {
        const uploadedUrl = await handleUploadImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else if (imageError) {
          // If upload failed and there's an error, stop submission
          return;
        }
      }

      const projectData = {
        ...formData,
        image_url: imageUrl,
        technologies: formData.technologies
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
        features: formData.features.split("\n").filter((f) => f.trim()),
      };

      if (editingProject) {
        await projectsApi.update(editingProject.id, projectData);
      } else {
        await projectsApi.create(projectData);
      }

      await fetchProjects();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving project:", error.message);
      alert(`Failed to save project: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await projectsApi.delete(id);
        await fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  if (loading && projects.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Add, edit, or remove projects from your portfolio
          </p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          Add Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-48 bg-gradient-to-br from-primary-400 to-primary-600">
              {project.image_url && (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => handleOpenModal(project)}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                  <PencilIcon className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-red-500/50 transition-colors">
                  <TrashIcon className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                  {project.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitWithImage} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="fullstack">Full Stack</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Technologies (comma-separated) *
                </label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Features (one per line)
                </label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  rows="4"
                  placeholder="User authentication&#10;Real-time updates&#10;Responsive design"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Live URL
                  </label>
                  <input
                    type="url"
                    name="live_url"
                    value={formData.live_url}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    name="github_url"
                    value={formData.github_url}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Lead Developer"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Project Image
                </label>
                <div className="space-y-4">
                  {/* Image Preview */}
                  {(imagePreview || (editingProject && formData.image_url && !selectedImage)) && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={imagePreview || (editingProject ? formData.image_url : "")}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      {!imagePreview && editingProject && (
                        <span className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded">
                          Current Image
                        </span>
                      )}
                    </div>
                  )}

                  {/* File Input */}
                  <div className="flex items-center gap-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <PhotoIcon className="w-5 h-5" />
                      <span>{selectedImage ? "Change Image" : "Select Image"}</span>
                    </label>
                    {selectedImage && (
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedImage.name}
                      </span>
                    )}
                  </div>

                  {/* Upload Status */}
                  {uploadingImage && (
                    <div className="flex items-center gap-2 text-sm text-primary-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                      <span>Uploading image...</span>
                    </div>
                  )}

                  {/* Error Message */}
                  {imageError && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {imageError}
                    </p>
                  )}

                  {/* Helper Text */}
                  {!selectedImage && !imageError && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {editingProject && formData.image_url
                        ? "Upload a new image to replace the current one (optional)"
                        : "Recommended: JPG, PNG. Max size: 5MB"}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={uploadingImage}
                >
                  {uploadingImage ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Uploading...</span>
                    </span>
                  ) : (
                    editingProject ? "Update Project" : "Create Project"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                  disabled={uploadingImage}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
