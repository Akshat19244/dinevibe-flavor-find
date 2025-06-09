
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Maximize2, Play, RotateCcw } from 'lucide-react';

interface Preview3DProps {
  title: string;
  imageUrl: string;
  description?: string;
  onFullscreen?: () => void;
}

const Preview3D: React.FC<Preview3DProps> = ({
  title,
  imageUrl,
  description,
  onFullscreen
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-blue-600" />
          {title}
        </CardTitle>
        {description && (
          <p className="text-sm text-slate-600">{description}</p>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-video bg-slate-900">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onLoad={() => setIsLoading(false)}
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Play className="h-4 w-4 mr-1" />
                Start Tour
              </Button>
              <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset View
              </Button>
              {onFullscreen && (
                <Button size="sm" variant="secondary" onClick={onFullscreen} className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Preview3D;
