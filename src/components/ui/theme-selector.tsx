
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          Theme
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Choose Your DineVibe Theme</DialogTitle>
          <DialogDescription>
            Select a theme that matches your mood and enhances your experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {themes.map((themeOption) => (
            <Card 
              key={themeOption.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                theme === themeOption.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setTheme(themeOption.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{themeOption.name}</CardTitle>
                  {theme === themeOption.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
                <Badge variant="secondary" className="w-fit">
                  {themeOption.description}
                </Badge>
              </CardHeader>
              <CardContent>
                <div 
                  className={`h-20 rounded-lg bg-gradient-to-r ${themeOption.gradient} mb-3`}
                />
                <CardDescription className="text-sm">
                  {themeOption.psychology}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeSelector;
