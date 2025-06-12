
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Image, FileText, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  acceptedTypes?: string[];
  maxFiles?: number;
  maxSizeMB?: number;
  label?: string;
  description?: string;
}

interface UploadedFile {
  file: File;
  id: string;
  preview?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesChange,
  acceptedTypes = ['image/*', '.pdf', '.doc', '.docx'],
  maxFiles = 5,
  maxSizeMB = 10,
  label = "Upload Files",
  description = "Drag and drop files here or click to browse"
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelection = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    const validFiles: File[] = [];

    Array.from(files).forEach((file) => {
      // Check file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds ${maxSizeMB}MB limit`,
          variant: "destructive",
        });
        return;
      }

      // Check file count
      if (uploadedFiles.length + newFiles.length >= maxFiles) {
        toast({
          title: "Too many files",
          description: `Maximum ${maxFiles} files allowed`,
          variant: "destructive",
        });
        return;
      }

      const uploadedFile: UploadedFile = {
        file,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadedFile.preview = e.target?.result as string;
          setUploadedFiles(prev => 
            prev.map(f => f.id === uploadedFile.id ? uploadedFile : f)
          );
        };
        reader.readAsDataURL(file);
      }

      newFiles.push(uploadedFile);
      validFiles.push(file);
    });

    if (newFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...newFiles]);
      onFilesChange([...uploadedFiles.map(f => f.file), ...validFiles]);
      
      toast({
        title: "Files uploaded",
        description: `${newFiles.length} file(s) uploaded successfully`,
      });
    }
  };

  const removeFile = (fileId: string) => {
    const updatedFiles = uploadedFiles.filter(f => f.id !== fileId);
    setUploadedFiles(updatedFiles);
    onFilesChange(updatedFiles.map(f => f.file));
    
    toast({
      title: "File removed",
      description: "File has been removed from upload list",
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelection(e.dataTransfer.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="h-6 w-6" />;
    }
    return <FileText className="h-6 w-6" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(',')}
        onChange={(e) => handleFileSelection(e.target.files)}
        className="hidden"
      />

      <Card
        className={`border-2 border-dashed transition-colors cursor-pointer ${
          isDragging 
            ? 'border-[#8B0000] bg-[#8B0000]/5' 
            : 'border-[#D4AF37] hover:border-[#8B0000]'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <CardContent className="p-8 text-center">
          <Upload className="h-12 w-12 mx-auto text-[#8B0000] mb-4" />
          <h3 className="text-lg font-semibold text-[#0C0C0C] mb-2">{label}</h3>
          <p className="text-[#2F2F2F] mb-4">{description}</p>
          <Button
            type="button"
            variant="outline"
            className="border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-[#FFF5E1]"
          >
            Choose Files
          </Button>
          <p className="text-xs text-[#2F2F2F] mt-2">
            Max {maxFiles} files, {maxSizeMB}MB each
          </p>
        </CardContent>
      </Card>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-[#0C0C0C]">Uploaded Files:</h4>
          {uploadedFiles.map((uploadedFile) => (
            <Card key={uploadedFile.id} className="p-3">
              <div className="flex items-center space-x-3">
                {uploadedFile.preview ? (
                  <img
                    src={uploadedFile.preview}
                    alt={uploadedFile.file.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-[#2F2F2F]/10 rounded flex items-center justify-center">
                    {getFileIcon(uploadedFile.file.type)}
                  </div>
                )}
                
                <div className="flex-1">
                  <p className="font-medium text-[#0C0C0C] text-sm">
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-xs text-[#2F2F2F]">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>
                </div>
                
                <CheckCircle className="h-5 w-5 text-green-500" />
                
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(uploadedFile.id);
                  }}
                  className="text-[#8B0000] hover:bg-[#8B0000]/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
