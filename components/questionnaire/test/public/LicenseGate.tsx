'use client';

import { useState } from 'react';
import { Lock, MessageCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useScopedI18n } from '@/locales/client';
import { activateLicenseCode, LicenseTier } from '@/lib/license';

// Country-code-normalized WhatsApp number (wa.me requires digits only,
// no leading zero) - Samir's contact number for license requests.
const WHATSAPP_NUMBER = '994552107111';
const SITE_URL = 'https://ai-test-az.vercel.app';

interface LicenseGateProps {
  onLicenseActivated: () => void;
}

const TIERS: { value: LicenseTier; labelKey: 'tier1M' | 'tier6M' | 'tier1Y' }[] = [
  { value: '1M', labelKey: 'tier1M' },
  { value: '6M', labelKey: 'tier6M' },
  { value: '1Y', labelKey: 'tier1Y' },
];

export function LicenseGate({ onLicenseActivated }: LicenseGateProps) {
  const t = useScopedI18n('component.license');
  const [selectedTier, setSelectedTier] = useState<LicenseTier>('1M');
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const tierLabel = t(TIERS.find((tier) => tier.value === selectedTier)!.labelKey);
  const whatsappMessage = t('whatsappMessage', { tier: tierLabel, url: SITE_URL });
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleActivate = () => {
    const result = activateLicenseCode(code);
    if (result.valid) {
      setError(false);
      onLicenseActivated();
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen md:p-4 p-2">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg md:p-8 p-6 border text-center">
        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
          <Lock className="w-6 h-6 text-amber-700" />
        </div>
        <h1 className="text-xl font-bold mb-2">{t('title')}</h1>
        <p className="text-sm text-gray-600 mb-6">{t('description')}</p>

        <div className="mb-6">
          <div className="text-xs font-medium text-gray-500 mb-2">{t('tierLabel')}</div>
          <div className="grid grid-cols-3 gap-2">
            {TIERS.map(({ value, labelKey }) => (
              <button
                key={value}
                type="button"
                onClick={() => setSelectedTier(value)}
                className={`py-2 rounded-md border text-sm font-medium transition-colors ${
                  selectedTier === value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t(labelKey)}
              </button>
            ))}
          </div>
        </div>

        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="block mb-6">
          <Button className="w-full bg-[#25D366] hover:bg-[#1ebe5a] text-white">
            <MessageCircle className="w-4 h-4 mr-2" />
            {t('whatsappButton')}
          </Button>
        </a>

        <div className="border-t pt-6 text-left">
          <label className="text-xs font-medium text-gray-500 mb-2 block">
            {t('codeInputLabel')}
          </label>
          <div className="flex gap-2">
            <Input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(false);
              }}
              placeholder={t('codePlaceholder')}
              className="uppercase"
            />
            <Button variant="outline" onClick={handleActivate}>
              <ShieldCheck className="w-4 h-4 mr-1.5" />
              {t('activateButton')}
            </Button>
          </div>
          {error && <p className="text-sm text-red-600 mt-2">{t('invalidCode')}</p>}
        </div>
      </div>
    </div>
  );
}
