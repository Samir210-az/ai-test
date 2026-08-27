export default {
    questionnaire: {
        page: {
            title: 'Детали анкеты',
            introduction: 'Введение',
            questionCount: 'Количество вопросов',
            evaluationTime: 'Время прохождения',
            instructions: 'Инструкции по тестированию',
            scoringMethod: 'Метод подсчёта баллов',
            dimensions: 'Описание измерений',
            notes: 'Примечания',
            references: 'Источники',
            startSurvey: 'Начать оценку',
        },
        survey: {
            depressionOption1: 'Никогда или редко',
            depressionOption2: 'Небольшую часть времени',
            depressionOption3: 'Значительную часть времени',
            depressionOption4: 'Большую часть времени или постоянно',
            defaultOption1: 'Отсутствует',
            defaultOption2: 'Очень лёгкая',
            defaultOption3: 'Умеренная',
            defaultOption4: 'Относительно тяжёлая',
            defaultOption5: 'Тяжёлая',
        },
        result: {
            resultNotFoundTitle: 'Результат не найден',
            resultNotFoundDesc: 'Не удалось получить результат вашей оценки. Пожалуйста, пройдите оценку заново.',
            retryTest: 'Пройти оценку заново',
        },
    },
} as const;
