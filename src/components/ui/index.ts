/**
 * UI Components Library
 * 
 * @module components/ui
 * @description Accessible components based on Radix UI + shadcn/ui
 * Integrated with ARCO design system tokens
 * 
 * @see {@link https://ui.shadcn.com/docs Shadcn UI Documentation}
 * @see {@link /src/design-system/tokens.ts ARCO Design Tokens}
 * 
 * @example
 * ```tsx
 * import { Button, Card, Badge } from '@/components/ui'
 * 
 * <Button variant="default" size="lg">Click me</Button>
 * <Card className="p-6">Content</Card>
 * <Badge variant="success">Active</Badge>
 * ```
 */

// Form Components
export { Input } from "./input";
export { Checkbox } from "./checkbox";
export { RadioGroup, RadioGroupItem } from "./radio-group";
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
export { Switch } from "./switch";

// Feedback Components
export { Alert, AlertDescription, AlertTitle } from "./alert";
export { Progress } from "./progress";
export { Avatar, AvatarFallback, AvatarImage } from "./avatar";

// Layout Components
export { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
export { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

// New: Animated components (consolidated from deleted files)
export { AnimatedBorder, GlowBorder } from "./animated-border";
