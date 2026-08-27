export default {
    title: 'ISI Yuxusuzluq Qiymətləndirmə Nəticəsi',
    severity: {
        no_insomnia: 'Klinik Əhəmiyyətli Yuxusuzluq Yoxdur',
        subthreshold: 'Subklinik Yuxusuzluq',
        moderate: 'Orta Yuxusuzluq',
        severe: 'Ağır Yuxusuzluq',
    },
    labels: {
        total_score: 'Ümumi Bal',
        high_score_items: 'Yüksək Bal Alan Bəndlər',
        insomnia_level: 'Yuxusuzluq Səviyyəsi',
        result_interpretation: 'Nəticənin Şərhi',
        scoring_criteria: 'ISI Ballandırma Meyarları',
        unknown: 'Naməlum',
    },
    scoring: {
        range_0_7: '• 0-7 bal: klinik əhəmiyyətli yuxusuzluq yoxdur',
        range_8_14: '• 8-14 bal: subklinik yuxusuzluq',
        range_15_21: '• 15-21 bal: orta yuxusuzluq',
        range_22_28: '• 22-28 bal: ağır yuxusuzluq',
    },
    advice: {
        sleep_specialist_message: 'Peşəkar yuxu müalicəsi üçün yuxu mütəxəssisi ilə məsləhətləşmə tövsiyə olunur.',
    },
} as const;
