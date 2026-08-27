export default {
    severity: {
        normal: 'Normal',
        mild: 'Yüngül',
        moderate: 'Orta',
        severe: 'Ağır',
        minimal: 'Minimal',
        extremely_severe: 'Ekstremal Ağır',
    },
    labels: {
        total_score: 'Ümumi Bal',
        severity_level: 'Şiddət Səviyyəsi',
        result_interpretation: 'Nəticənin Şərhi',
        professional_advice: 'Peşəkar Tövsiyə',
        evaluation_result: 'Qiymətləndirmə Nəticəsi',
        high_score_items: 'Yüksək Bal Alan Bəndlər',
        needs_attention: 'Diqqət Tələb Edir',
    },
    crisis: {
        emergency_alert: 'Təcili Xəbərdarlıq',
        suicide_risk: 'İntihar Riski',
        hotline_contact: 'Zəhmət olmasa dərhal psixi sağlamlıq böhran xəttinə müraciət edin',
        immediate_actions: 'Dərhal Tədbir Görülməlidir',
        professional_help: 'Dərhal peşəkar kömək axtarın',
    },
    disclaimers: {
        screening_tool: 'Bu bir skrininq vasitəsidir',
        not_diagnostic: 'Nəticələr diaqnoz deyil',
        consult_professional: 'Zəhmət olmasa mütəxəssislə məsləhətləşin',
    },
    advice: {
        maintain_good_state: 'Yaxşı psixi vəziyyəti qoruyun',
        self_management: 'Özünüidarəetmə strategiyaları',
        professional_treatment: 'Peşəkar müalicə tövsiyə olunur',
        lifestyle_management: 'Həyat tərzinin idarə edilməsi',
        social_support: 'Sosial dəstək',
    },
    fallback: {
        unknown: 'Naməlum',
        resultAnomaly: 'Nəticə qeyri-adi görünür, zəhmət olmasa testi yenidən edin.',
    },
    answerList: {
        title: 'Cavabların Təfərrüatları',
        option: 'Variant',
        unanswered: 'Cavablandırılmayıb'
    },
} as const;
