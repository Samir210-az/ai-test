export default {
    severity: {
        normal: 'Норма',
        mild: 'Лёгкая',
        moderate: 'Умеренная',
        severe: 'Тяжёлая',
        minimal: 'Минимальная',
        extremely_severe: 'Крайне тяжёлая',
    },
    labels: {
        total_score: 'Общий балл',
        severity_level: 'Уровень тяжести',
        result_interpretation: 'Интерпретация результата',
        professional_advice: 'Профессиональная рекомендация',
        evaluation_result: 'Результат оценки',
        high_score_items: 'Пункты с высоким баллом',
        needs_attention: 'Требует внимания',
    },
    crisis: {
        emergency_alert: 'Экстренное предупреждение',
        suicide_risk: 'Риск суицида',
        hotline_contact: 'Пожалуйста, немедленно обратитесь на кризисную линию психологической помощи',
        immediate_actions: 'Требуются немедленные действия',
        professional_help: 'Немедленно обратитесь за профессиональной помощью',
    },
    disclaimers: {
        screening_tool: 'Это скрининговый инструмент',
        not_diagnostic: 'Результаты не являются диагнозом',
        consult_professional: 'Пожалуйста, проконсультируйтесь со специалистом',
    },
    advice: {
        maintain_good_state: 'Поддерживайте хорошее психическое состояние',
        self_management: 'Стратегии самоконтроля',
        professional_treatment: 'Рекомендуется профессиональное лечение',
        lifestyle_management: 'Управление образом жизни',
        social_support: 'Социальная поддержка',
    },
    fallback: {
        unknown: 'Неизвестно',
        resultAnomaly: 'Результат выглядит некорректным, пожалуйста, пройдите тест заново.',
    },
    answerList: {
        title: 'Подробности ответов',
        option: 'Вариант',
        unanswered: 'Без ответа'
    },
} as const;
