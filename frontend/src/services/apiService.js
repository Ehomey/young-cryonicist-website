import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

const apiService = {
  // Auth
  login: (credentials) => apiClient.post('/login', credentials),
  register: (userData) => apiClient.post('/register', userData),
  logout: () => apiClient.post('/logout'),
  checkStatus: () => apiClient.get('/status'),

  // Profile
  getProfile: () => apiClient.get('/profile'),

  // News
  getNews: () => apiClient.get('/news'),
  addNews: (postData) => apiClient.post('/news', postData),

  // Forum
  getForumPosts: () => apiClient.get('/forum'),
  addForumPost: (postData) => apiClient.post('/forum', postData),

  // Static Content
  getPageContent: (pageName) => apiClient.get(`/content/${pageName}`),
  updatePageContent: (pageName, content) => apiClient.post(`/content/${pageName}`, { content }),

  // Application
  submitApplication: (appData) => apiClient.post('/application', appData),
  getApplications: () => apiClient.get('/applications'),

  // Events
  getEvents: () => apiClient.get('/events'),
  addEvent: (eventData) => apiClient.post('/events', eventData),
  deleteEvent: (eventId) => apiClient.delete(`/events/${eventId}`),
};

export default apiService;