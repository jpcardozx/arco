'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, Settings, CreditCard, LogOut, LifeBuoy } from 'lucide-react'
import Link from 'next/link'
import { TierBadge } from './tier-badge'

interface UserMenuProps {
  user: {
    id: string
    email?: string
    full_name?: string
    avatar_url?: string
    tier: 'free' | 'paid' | 'admin'
  }
  onSignOut: () => void
}

export function UserMenu({ user, onSignOut }: UserMenuProps) {
  const initials = user.full_name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || user.email?.substring(0, 2).toUpperCase() || 'U'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar_url} alt={user.full_name || user.email} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none">{user.full_name || 'Usuário'}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            <TierBadge tier={user.tier} className="mt-2 w-fit" />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard/settings">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/settings?tab=preferences">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
          </Link>
          {user.tier === 'paid' && (
            <Link href="/dashboard/faturamento">
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Faturamento</span>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href="/dashboard/operacoes?tab=suporte">
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Suporte</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
