
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Maximize, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface Preview3DProps {
  title: string;
  imageUrl: string;
  description?: string;
  onFullscreen?: () => void;
}

const Preview3D: React.FC<Preview3DProps> = ({ 
  title, 
  imageUrl, 
  description = "Interactive 3D preview available",
  onFullscreen 
}) => {
  const [isRotating, setIsRotating] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleReset = () => {
    setRotation({ x: 0, y: 0 });
    setScale(1);
  };

  const toggleAutoRotate = () => {
    setIsRotating(!isRotating);
  };

  return (
    <Card className="bg-slate-800 border-slate-700 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-400" />
            {title}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomOut}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomIn}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleReset}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            {onFullscreen && (
              <Button
                size="sm"
                variant="outline"
                onClick={onFullscreen}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          ref={containerRef}
          className="relative h-64 bg-gradient-to-br from-slate-900 to-slate-700 cursor-grab active:cursor-grabbing overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* 3D Scene Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className={`transition-transform duration-200 ${isRotating ? 'animate-spin' : ''}`}
              style={{
                transform: `scale(${scale}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Mock 3D Object - Restaurant Interior */}
              <div className="relative w-48 h-32">
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-full h-full object-cover rounded-lg shadow-2xl border-2 border-blue-400/30"
                  draggable={false}
                />
                {/* 3D Effect Layers */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur-sm -z-10"></div>
              </div>
            </div>
          </div>

          {/* Interactive Hotspots */}
          <div className="absolute top-4 left-4">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse cursor-pointer" title="Dining Area"></div>
          </div>
          <div className="absolute bottom-6 right-8">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse cursor-pointer" title="Kitchen View"></div>
          </div>

          {/* Controls Overlay */}
          <div className="absolute bottom-2 left-2 text-xs text-slate-400">
            Drag to rotate • Scroll to zoom
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleAutoRotate}
            className="absolute bottom-2 right-2 text-slate-400 hover:text-white"
          >
            {isRotating ? 'Stop' : 'Auto'} Rotate
          </Button>
        </div>
        
        <div className="p-4 bg-slate-900/50">
          <p className="text-sm text-slate-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Preview3D;
