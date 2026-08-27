import { Questionnaire } from "@/types";

export const gad7: Questionnaire = {
    id: "gad7",
    title: "GAD-7 Ümumiləşmiş Narahatlıq Pozuntusu Şkalası",
    description: "Ümumiləşmiş narahatlıq pozuntusu simptomlarının şiddətinin qiymətləndirilməsi",
    tags: ["Narahatlıq", "Özünüqiymətləndirmə", "Skrininq"],
    time: "2-5 dəqiqə",
    details: {
        introduction: "Ümumiləşmiş Narahatlıq Pozuntusu 7-bəndlik Şkalası (GAD-7) narahatlıq pozuntularının skrininqi üçün sadə və effektiv vasitədir. Şkala 7 bənddən ibarətdir və son iki həftə ərzində şəxsdəki narahatlıq simptomlarının şiddətini sürətlə qiymətləndirməyə imkan verir. GAD-7 klinik və elmi-tədqiqat mühitində geniş istifadə olunur, yüksək etibarlılıq və validliyə malikdir.",
        questionCount: "7 sual",
        evaluationTime: "Adətən 2-5 dəqiqə",
        instructions: "Son 2 həftə ərzində aşağıdakı problemlərdən hər biri sizi nə qədər tez-tez narahat edib? Vəziyyətinizi ən yaxşı təsvir edən variantı seçin. Hər sualın dörd variantı var: Heç vaxt, Bəzi günlər, Günlərin yarısından çoxu, Demək olar ki, hər gün.",
        scoringMethod: [
            "Ümumi bal: bütün 7 bəndin cəmi, aralıq 0-21 bal",
            "Ballandırma: Heç vaxt=0, Bəzi günlər=1, Günlərin yarısından çoxu=2, Demək olar ki, hər gün=3",
            "Şiddət: 0-4 = minimal narahatlıq, 5-9 = yüngül narahatlıq, 10-14 = orta narahatlıq, 15-21 = ağır narahatlıq"
        ],
        dimensions: [
            { name: "Narahatlıq Səviyyəsi", description: "Müxtəlif şeylər haqqında həddindən artıq narahat olmanın tezliyi və intensivliyi" },
            { name: "Nəzarət Bacarığı", description: "Narahatlığı idarə etmək və ya dayandırmaq bacarığı" },
            { name: "Fiziki Simptomlar", description: "Narahatlıq, yorğunluq və digər fiziki əlamətlər" },
            { name: "Diqqət", description: "Diqqəti cəmləməkdə çətinlik" },
            { name: "Əsəbilik", description: "Asanlıqla əsəbləşmək və ya qıcıqlanmaq" },
            { name: "Əzələ Gərginliyi", description: "Əzələlərdə gərginlik, ağrı və ya sızıltı" },
            { name: "Yuxu Problemləri", description: "Yuxuya getməkdə, yuxunu davam etdirməkdə çətinlik və ya narahat yuxu" }
        ],
        notes: [
            "Bu şkala yetkinlərdə narahatlıq simptomlarının skrininqi üçün nəzərdə tutulub",
            "Ümumi bal ≥10 olduqda peşəkar qiymətləndirmə tövsiyə olunur",
            "Bu şkala yalnız skrininq məqsədi daşıyır və peşəkar diaqnozu əvəz edə bilməz"
        ],
        references: [
            {
                text: "Spitzer, R. L., Kroenke, K., Williams, J. B., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: the GAD-7. Archives of internal medicine, 166(10), 1092-1097.",
                url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/410326"
            }
        ]
    },
    questions: [
        { id: 1, content: "Əsəbi, narahat və ya gərgin hiss etmək" },
        { id: 2, content: "Narahatlığı dayandıra bilməmək və ya idarə edə bilməmək" },
        { id: 3, content: "Müxtəlif şeylər haqqında həddindən artıq narahat olmaq" },
        { id: 4, content: "Rahatlaşmaqda çətinlik" },
        { id: 5, content: "O qədər narahat olmaq ki, sakit oturmaq çətin olsun" },
        { id: 6, content: "Asanlıqla qıcıqlanmaq və ya əsəbiləşmək" },
        { id: 7, content: "Sanki dəhşətli bir şey baş verəcəkmiş kimi qorxu hiss etmək" }
    ],
    renderOptions: () => [
        { id: 1, content: "Heç vaxt", value: "0" },
        { id: 2, content: "Bəzi günlər", value: "1" },
        { id: 3, content: "Günlərin yarısından çoxu", value: "2" },
        { id: 4, content: "Demək olar ki, hər gün", value: "3" }
    ]
};
