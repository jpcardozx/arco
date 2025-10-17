/**
 * APPLICATION SCHEDULE PAGE
 * Tech leads e recruiters podem agendar entrevistas técnicas
 */
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PortfolioCard, PortfolioBadge } from '@/components/ui/portfolio-card';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

interface Application {
  id: string;
  company_name: string;
  role_title: string;
  status: 'pending' | 'reviewing' | 'scheduled';
  created_at: string;
}

interface InterviewType {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  icon: React.ElementType;
  recommended?: boolean;
}

const interviewTypes: InterviewType[] = [
  {
    id: 'technical-deep-dive',
    title: 'Technical Deep Dive',
    description: 'In-depth technical discussion covering architecture, system design, and coding patterns',
    duration: 90,
    icon: Code2,
    recommended: true
  },
  {
    id: 'portfolio-review',
    title: 'Portfolio Review',
    description: 'Walk through specific projects, technical decisions, and implementation details',
    duration: 60,
    icon: Briefcase
  },
  {
    id: 'culture-fit',
    title: 'Culture & Team Fit',
    description: 'Discussion about work style, communication, and team collaboration',
    duration: 45,
    icon: Users
  },
  {
    id: 'quick-intro',
    title: 'Quick Introduction',
    description: 'Brief introductory call to discuss role requirements and expectations',
    duration: 30,
    icon: MessageSquare
  }
];

import { Code2, Briefcase, Users } from 'lucide-react';

export default function ApplicationSchedulePage() {
  const params = useParams();
  const router = useRouter();
  const applicationId = typeof params?.id === 'string' ? params.id : '';

  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState<Application | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('technical-deep-dive');

  useEffect(() => {
    loadApplication();
  }, [applicationId]);

  const loadApplication = async () => {
    try {
      setLoading(true);
      // TODO: Implementar fetch real do Supabase
      // const { data, error } = await supabase
      //   .from('applications')
      //   .select('*')
      //   .eq('id', applicationId)
      //   .single();

      // Mock data para desenvolvimento
      await new Promise(resolve => setTimeout(resolve, 1000));
      setApplication({
        id: typeof applicationId === 'string' ? applicationId : '',
        company_name: 'TechCorp Inc.',
        role_title: 'Senior Full-Stack Developer',
        status: 'reviewing',
        created_at: new Date().toISOString()
      });
    } catch (err) {
      setError('Failed to load application details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = () => {
    const selectedInterview = interviewTypes.find(t => t.id === selectedType);
    if (!selectedInterview) return;

    // Redirect para /agendamentos com query params
    const searchParams = new URLSearchParams({
      source: 'application',
      applicationId: typeof applicationId === 'string' ? applicationId : '',
      type: selectedType,
      duration: selectedInterview.duration.toString()
    });

    router.push(`/agendamentos?${searchParams.toString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-teal-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <PortfolioCard variant="glassmorphic" className="max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Application Not Found</h2>
          <p className="text-slate-400 mb-6">
            {error || 'The application ID is invalid or has expired.'}
          </p>
          <Button asChild variant="outline">
            <Link href="/jpcardozx">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>
        </PortfolioCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 max-w-5xl">
          <div className="flex items-center justify-between">
            <Link 
              href="/jpcardozx"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
            <PortfolioBadge variant="status">
              Application #{applicationId.slice(0, 8)}
            </PortfolioBadge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        {/* Application Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <PortfolioCard variant="gradient" className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Schedule Technical Interview
                </h1>
                <p className="text-lg text-slate-400">
                  {application.company_name} • {application.role_title}
                </p>
              </div>
              <PortfolioBadge variant="status">
                {application.status}
              </PortfolioBadge>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Applied {new Date(application.created_at).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                Application received
              </div>
            </div>
          </PortfolioCard>
        </motion.div>

        {/* Interview Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Select Interview Format
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {interviewTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className="text-left"
              >
                <PortfolioCard
                  variant={selectedType === type.id ? "interactive" : "glassmorphic"}
                  hover="lift"
                  className={`h-full transition-all ${
                    selectedType === type.id ? 'ring-2 ring-teal-500/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                      {React.createElement(type.icon, { className: "w-6 h-6 text-teal-400" })}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-white">
                          {type.title}
                        </h3>
                        {type.recommended && (
                          <PortfolioBadge variant="primary" className="text-xs">
                            Recommended
                          </PortfolioBadge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        <Clock className="w-4 h-4" />
                        {type.duration} minutes
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">
                    {type.description}
                  </p>
                </PortfolioCard>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Schedule CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <PortfolioCard variant="gradient" className="p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-3">
              Ready to Schedule?
            </h3>
            <p className="text-slate-400 mb-6">
              You'll be redirected to the booking system where you can select a convenient time slot.
            </p>
            <Button
              size="lg"
              onClick={handleSchedule}
              className="bg-gradient-to-r from-teal-600 to-orange-500 hover:from-teal-500 hover:to-orange-400 text-white"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Choose Time Slot
            </Button>
          </PortfolioCard>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center text-sm text-slate-500"
        >
          <p>
            After booking, you'll receive a calendar invite with video call link.
            <br />
            Need to reschedule? Contact{' '}
            <a href="mailto:jp@arco.digital" className="text-teal-400 hover:text-teal-300">
              jp@arco.digital
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
