
import { supabase } from './client';

// Create a storage bucket if it doesn't exist
export const createStorageBucket = async (bucketName: string, isPublic: boolean = true) => {
  const { data, error } = await supabase
    .storage
    .createBucket(bucketName, {
      public: isPublic,
      fileSizeLimit: 10485760, // 10MB
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
    });
    
  if (error) throw error;
  
  return data;
};

// Upload file to a bucket
export const uploadFile = async (
  bucketName: string, 
  file: File, 
  path?: string
) => {
  const filePath = path 
    ? `${path}/${file.name}`
    : `${crypto.randomUUID()}-${file.name.replace(/\s+/g, '-')}`;
  
  const { data, error } = await supabase
    .storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });
    
  if (error) throw error;
  
  // Get public URL
  const { data: publicUrlData } = supabase
    .storage
    .from(bucketName)
    .getPublicUrl(filePath);
  
  return {
    path: data.path,
    publicUrl: publicUrlData.publicUrl
  };
};

// Delete file from a bucket
export const deleteFile = async (bucketName: string, path: string) => {
  const { error } = await supabase
    .storage
    .from(bucketName)
    .remove([path]);
    
  if (error) throw error;
  
  return true;
};

// Get all files from a bucket
export const listFiles = async (bucketName: string, path?: string) => {
  const { data, error } = await supabase
    .storage
    .from(bucketName)
    .list(path || '', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' }
    });
    
  if (error) throw error;
  
  return data;
};

// Get public URL for a file
export const getPublicUrl = (bucketName: string, path: string) => {
  const { data } = supabase
    .storage
    .from(bucketName)
    .getPublicUrl(path);
    
  return data.publicUrl;
};

// Upload multiple files and return their URLs
export const uploadMultipleFiles = async (
  bucketName: string, 
  files: File[], 
  path?: string
) => {
  const uploadPromises = files.map(file => uploadFile(bucketName, file, path));
  const results = await Promise.all(uploadPromises);
  
  return results.map(result => result.publicUrl);
};

// Check if a bucket exists
export const checkBucketExists = async (bucketName: string) => {
  try {
    const { data, error } = await supabase
      .storage
      .getBucket(bucketName);
      
    return !error && data;
  } catch (error) {
    return false;
  }
};

// Initialize the default buckets for the application
export const initializeStorageBuckets = async () => {
  const requiredBuckets = ['restaurant-images', 'menu-images', 'user-avatars'];
  
  for (const bucketName of requiredBuckets) {
    const exists = await checkBucketExists(bucketName);
    
    if (!exists) {
      await createStorageBucket(bucketName, true);
    }
  }
  
  return true;
};
