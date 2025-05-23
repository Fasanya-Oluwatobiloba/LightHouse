import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);


// Enhanced auth persistence
pb.authStore.onChange((token, model) => {
  try {
    localStorage.setItem('pocketbase_auth', JSON.stringify({
      token, 
      model,
      timestamp: new Date().toISOString()
    }));
  } catch (e) {
    console.error('Failed to save auth to localStorage:', e);
  }
}, true);

// Load existing auth with validation
try {
  const storedAuth = localStorage.getItem('pocketbase_auth');
  if (storedAuth) {
    const { token, model } = JSON.parse(storedAuth);
    if (token && model) {
      pb.authStore.save(token, model);
      
      // Verify token is still valid
      pb.collection('users').authRefresh().catch(() => {
        pb.authStore.clear();
        localStorage.removeItem('pocketbase_auth');
      });
    }
  }
} catch (e) {
  console.error('Failed to load auth:', e);
  localStorage.removeItem('pocketbase_auth');
}

// Add request/response interceptors
pb.beforeSend = function (url, options) {
  return { url, options }; // Fixed format
};

pb.afterSend = function (response, data) {
  return data;
};

export default pb;