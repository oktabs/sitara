import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProgressPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
      } catch (err) {
        setError('Failed to fetch projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLatestProgress = (progress) => {
    if (!progress || progress.length === 0) return null;
    return progress[progress.length - 1];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading projects...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-32 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-black mb-8">Project Progress</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => {
            const latestProgress = getLatestProgress(project.progress);
            
            return (
              <div key={project._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-black line-clamp-2">
                      {project.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-black text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Basic Info */}
                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="font-medium text-black">Location:</span>
                      <div className="ml-2 text-black">
                        <div>{project.location.village}, {project.location.district}</div>
                        <div className="text-xs">
                          Lat: {project.location.coordinates.lat}, Lng: {project.location.coordinates.lng}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium text-black">Contractor:</span>
                      <div className="ml-2 text-black">
                        <div>{project.contractor.name}</div>
                        <div className="text-xs">{project.contractor.contact}</div>
                        <div className="text-xs">{project.contractor.address}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Budget Section */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-black mb-2">Budget Information</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-black">Total Budget:</span>
                        <span className="font-medium text-black">{formatCurrency(project.budget.totalBudget)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Fiscal Year:</span>
                        <span className="text-black">{project.budget.fiscalYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Funding Source:</span>
                        <span className="text-black">{project.budget.fundingSource}</span>
                      </div>
                    </div>
                    
                    {/* Budget Items */}
                    {project.budget.items && project.budget.items.length > 0 && (
                      <div className="mt-3">
                        <h5 className="text-xs font-medium text-black mb-2">Budget Items:</h5>
                        <div className="space-y-1">
                          {project.budget.items.slice(0, 3).map((item, index) => (
                            <div key={item._id} className="text-xs text-black">
                              {item.description}: {item.volume} {item.unit} × {formatCurrency(item.unitPrice)}
                            </div>
                          ))}
                          {project.budget.items.length > 3 && (
                            <div className="text-xs text-black">
                              +{project.budget.items.length - 3} more items
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Progress Section */}
                  {project.progress && project.progress.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-black mb-2">Progress History</h4>
                      {latestProgress && (
                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-black">Latest Progress</span>
                            <span className="text-sm font-bold text-blue-600">{latestProgress.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${latestProgress.percentage}%` }}
                            ></div>
                          </div>
                          {latestProgress.notes && (
                            <p className="text-xs text-black mt-2 line-clamp-2">
                              {latestProgress.notes}
                            </p>
                          )}
                          <p className="text-xs text-black mt-1">
                            Updated: {formatDate(latestProgress.date)}
                          </p>
                        </div>
                      )}
                      
                      {/* Progress History */}
                      <div className="text-xs text-black space-y-1">
                        <div>Total Progress Updates: {project.progress.length}</div>
                        {project.progress.length > 1 && (
                          <div>Previous: {project.progress[project.progress.length - 2]?.percentage}%</div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* News Section */}
                  {project.news && project.news.length > 0 && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-black mb-2">Latest News</h4>
                      <div className="space-y-2">
                        {project.news.slice(0, 2).map((newsItem) => (
                          <div key={newsItem._id} className="text-sm">
                            <h5 className="font-medium text-black line-clamp-1">{newsItem.title}</h5>
                            <p className="text-black text-xs line-clamp-2">{newsItem.content}</p>
                            <p className="text-black text-xs mt-1">
                              {formatDate(newsItem.createdAt)}
                            </p>
                          </div>
                        ))}
                        {project.news.length > 2 && (
                          <div className="text-xs text-black">
                            +{project.news.length - 2} more news items
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Timeline */}
                  <div className="border-t pt-4">
                    <div className="space-y-1 text-xs text-black">
                      <div className="flex justify-between">
                        <span>Start Date:</span>
                        <span>{formatDate(project.startDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>End Date:</span>
                        <span>{formatDate(project.endDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Created:</span>
                        <span>{formatDate(project.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Updated:</span>
                        <span>{formatDate(project.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project ID */}
                  <div className="mt-3 pt-2 border-t">
                    <div className="text-xs text-black">
                      ID: {project._id}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-black">No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
