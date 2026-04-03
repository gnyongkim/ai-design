import { Link } from "react-router-dom";
import { MapPin, Users, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface ChannelCardProps {
  id: number;
  title: string;
  location: string;
  pace: string;
  distance: string;
  currentMembers: number;
  maxMembers: number;
  isLive?: boolean;
  bgUrl: string;
}

export function ChannelCard({ id, title, location, pace, distance, currentMembers, maxMembers, isLive = false, bgUrl }: ChannelCardProps) {
  return (
    <Link to={`/social/${id}`} className="group relative flex h-60 w-full cursor-pointer flex-col justify-end overflow-hidden rounded-[24px] bg-black shadow-sm transition-all duration-300 active:scale-[0.97] hover:shadow-xl hover:-translate-y-1 mt-1">
      {/* 백그라운드 실제 이미지 */}
      <img
        src={bgUrl}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-100"
      />

      {/* 깊이감을 위한 멀티플 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent opacity-50" />

      {/* 프리미엄 이너 링 (유리 가장자리 반사 효과) */}
      <div className="absolute inset-0 z-20 rounded-[24px] border border-white/20 mix-blend-overlay pointer-events-none" />

      {/* Content Area */}
      <div className="relative z-10 flex w-full flex-col gap-4 p-5">

        {/* Top Area: Live Badge (우측 상단 고정 플로팅) */}
        <div className="absolute top-4 right-4 flex items-center">
          {isLive && (
            <Badge variant="secondary" className="h-8 gap-2 rounded-full bg-black/40 border-white/10 px-3.5 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)] text-white hover:bg-black/40">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-80" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
              </span>
              <span className="text-xs font-black tracking-widest drop-shadow-md">LIVE</span>
            </Badge>
          )}
        </div>

        {/* Text Info */}
        <div className="flex flex-col gap-1.5 mt-auto">
          <div className="flex items-center gap-1.5 text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <MapPin size={16} className="stroke-[2.5px]" />
            <span className="text-sm font-bold tracking-tight text-white/90">{location}</span>
          </div>
          <h3 className="text-2xl font-black leading-tight tracking-tight text-white line-clamp-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {title}
          </h3>
        </div>

        {/* Meta / Metrics (Glassmorphism Pills) */}
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="secondary" className="h-auto gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-md border-white/5 hover:bg-white/10">
            <Users size={16} className="stroke-[2.5px] text-white/70" />
            <span className="text-sm font-bold text-white/70 tracking-tight"><span className="text-white">{currentMembers}</span> / {maxMembers}</span>
          </Badge>

          <Badge variant="secondary" className="h-auto gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-md border-white/5 hover:bg-white/10">
            <Timer size={16} className="stroke-[2.5px] text-white/70" />
            <span className="text-sm font-bold text-white tracking-tighter">{pace} <span className="text-xs font-semibold text-white/60 pl-0.5">/km</span></span>
          </Badge>

          <Badge className="ml-auto h-auto rounded-xl px-4 py-2 text-sm font-black shadow-[0_2px_10px_var(--color-primary)]">
            {distance}
          </Badge>
        </div>
      </div>
    </Link>
  );
}
