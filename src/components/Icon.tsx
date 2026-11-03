import {
  ArrowLeft, ArrowRight, ArrowUpRight, Brush, Check, ChevronDown, CodeXml,
  Copy, Dice5, Download, Droplet, FileText, Globe, GraduationCap, Briefcase, Gamepad2, Gauge, Headphones, Info, Layers, Layers2,
  LayoutGrid, Link, Lock, Mail, Maximize2, MessageSquare, Music2, Pause, Play,
  RefreshCw, Route, SlidersHorizontal, Sparkles, Swords, TreePine, Trophy,
  Watch, X,
} from "lucide-react";

const icons = {
  play: Play,
  pause: Pause,
  expand: Maximize2,
  "arrow-up-right": ArrowUpRight,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  close: X,
  info: Info,
  code: CodeXml,
  grid: LayoutGrid,
  sparkles: Sparkles,
  route: Route,
  check: Check,
  "chevron-down": ChevronDown,
  mail: Mail,
  copy: Copy,
  layers: Layers,
  sliders: SlidersHorizontal,
  lock: Lock,
  refresh: RefreshCw,
  music: Music2,
  speed: Gauge,
  cards: Layers2,
  sword: Swords,
  dice: Dice5,
  watch: Watch,
  message: MessageSquare,
  headphones: Headphones,
  droplet: Droplet,
  tree: TreePine,
  brush: Brush,
  link: Link,
  trophy: Trophy,
  gamepad: Gamepad2,
  download: Download,
  file: FileText,
  globe: Globe,
  education: GraduationCap,
  briefcase: Briefcase,
};

export type IconName = keyof typeof icons;

export default function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const LucideIcon = icons[name];
  return (
    <LucideIcon
      className={`icon ${className}`}
      aria-hidden="true"
      focusable="false"
      strokeWidth={1.8}
      fill={name === "play" ? "currentColor" : "none"}
    />
  );
}
