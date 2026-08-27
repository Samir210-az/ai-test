export default {
    factors: {
        somatization: 'Somatizasiya',
        obsessive: 'Obsessiv-Kompulsiv',
        interpersonal: 'Şəxslərarası Həssaslıq',
        depression: 'Depressiya',
        anxiety: 'Narahatlıq',
        hostility: 'Düşmənçilik',
        phobic: 'Fobik Narahatlıq',
        paranoid: 'Paranoid Fikirlər',
        psychotic: 'Psixotisizm',
        other: 'Digər',
    },
    labels: {
        overall_assessment: 'Ümumi Qiymətləndirmə',
        positive_item_count: 'Pozitiv Bəndlərin Sayı',
        positive_symptom_average: 'Pozitiv Simptom Ortalaması',
        factor_analysis: 'Faktor Təhlili',
    },
    clinical: {
        rating_criteria: 'Ballandırma Meyarları',
        judgment_criteria: 'Qiymətləndirmə Meyarları',
        rating_scale: '1 = Heç vaxt | 2 = Bir az | 3 = Orta dərəcədə | 4 = Kifayət qədər | 5 = Həddindən artıq',
        total_score_criteria: 'Ümumi bal ≥ 160 və ya pozitiv bənd sayı ≥ 43: mümkün psixoloji problemlərə işarə edir',
        factor_score_2: 'Faktor balı ≥ 2: bu faktor anormaldır və diqqət tələb edir',
        factor_score_3: 'Faktor balı ≥ 3: bu faktor ciddi anormaldır, peşəkar kömək tövsiyə olunur',
    },
    warnings: {
        severe_condition: 'Simptomlarınız ciddi vəziyyətə işarə edə bilər. Zəhmət olmasa dərhal peşəkar kömək axtarın.',
        unknown_level: 'Naməlum',
    },
    description: {
        total_score: 'Ümumi bal ümumi psixoloji narahatlıq səviyyəsini əks etdirir',
        positive_items: '"Heç vaxt" səviyyəsindən yuxarı qiymətləndirilən bəndlərin sayı',
        positive_average: 'Pozitiv bəndlərin orta balı',
    },
    interpretation: {
        normal: 'Psixoloji vəziyyətiniz normal aralıqdadır',
        mild: 'Yüngül psixoloji simptomlarınız ola bilər',
        moderate: 'Orta dərəcəli psixoloji simptomlarınız ola bilər',
        severe: 'Ağır psixoloji simptomlarınız ola bilər',
    },
} as const;
